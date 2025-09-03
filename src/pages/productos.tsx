"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/supabaseClient"
import NotData from "@/components/NotData"
import Filtro from "@/components/filtro"
import { CardItem } from "@/components/CardItem"
import type { EstadoFiltros, itemCatalogo } from "@/types"

export default function Productos() {
  const [paginaActual, setPaginaActual] = useState(1)
  const [datosProductos, setDatosProductos] = useState<itemCatalogo[]>([])
  const [productosFiltrados, setProductosFiltrados] = useState<itemCatalogo[]>([])
  const [filtros, setFiltros] = useState<EstadoFiltros>({
    marcas: [],
    rangosPrecio: [],
    precioMinimo: "",
    precioMaximo: "",
    destacados: [],
    colores: [],
    almacenamiento: [],
    ram: [],
    accesibilidad: [],
    caracteristicas: [],
    ordenarPor: "relevancia",
    categorias: [],
    tags: []
  })
  const [busqueda, setBusqueda] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(true)

  //const productosPorPagina = 12

  // 🔄 Scroll al top al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [paginaActual])

  // 🔹 Cargar productos al inicio
  useEffect(() => {
    const cargarProductos = async () => {
      setCargando(true)
      setError(null)

      const { data, error } = await supabase.from("vista_catalogo").select("*")

      if (error) {
        console.error("Error al cargar productos:", error)
        setError("Error al cargar productos. Intenta nuevamente.")
        setCargando(false)
        return
      }

      setDatosProductos(data ?? [])
      setCargando(false)
    }

    cargarProductos()
  }, [])

  // 🔹 Reaplicar filtros cada vez que cambien
  useEffect(() => {
    const aplicarFiltros = () => {
      setCargando(true)
      let filtrados = [...datosProductos]

      if (filtros.marcas.length > 0) {
        filtrados = filtrados.filter((p) => filtros.marcas.includes(p.marca))
      }

      if (filtros.colores.length > 0) {
        filtrados = filtrados.filter((p) => filtros.colores.includes(p.color))
      }

      if (filtros.categorias.length > 0) {
        filtrados = filtrados.filter((p) => filtros.categorias.includes(p.categoria))
      }

      if (filtros.tags.length > 0) {
        filtrados = filtrados.filter((p) => p.tags.some((t) => filtros.tags.includes(t)))
      }

      if (filtros.destacados.length > 0) {
        filtrados = filtrados.filter((p) => p.tags.some((t) => filtros.destacados.includes(t)))
      }

      if (filtros.caracteristicas.length > 0) {
        filtrados = filtrados.filter((p) => p.tags.some((t) => filtros.caracteristicas.includes(t)))
      }

      if (filtros.accesibilidad.includes("disponible")) {
        filtrados = filtrados.filter((p) => p.cantidad_disponible > 0)
      }

      if (filtros.almacenamiento.length > 0) {
        filtrados = filtrados.filter((p) => filtros.almacenamiento.includes(p.memoria))
      }

      if (filtros.ram.length > 0) {
        filtrados = filtrados.filter((p) => filtros.ram.includes(p.ram))
      }

      if (filtros.precioMinimo) {
        filtrados = filtrados.filter((p) => p.precio_final >= Number(filtros.precioMinimo))
      }

      if (filtros.precioMaximo) {
        filtrados = filtrados.filter((p) => p.precio_final <= Number(filtros.precioMaximo))
      }

      if (busqueda.trim() !== "") {
        filtrados = filtrados.filter((p) =>
          p.nombre_producto.toLowerCase().includes(busqueda.toLowerCase())
        )
      }

      switch (filtros.ordenarPor) {
        case "precio-menor":
          filtrados.sort((a, b) => a.precio_final - b.precio_final)
          break
        case "precio-mayor":
          filtrados.sort((a, b) => b.precio_final - a.precio_final)
          break
        case "disponibilidad":
          filtrados.sort((a, b) => b.cantidad_disponible - a.cantidad_disponible)
          break
        default:
          break
      }

      setProductosFiltrados(filtrados)
      setPaginaActual(1) // 🔁 Reinicia paginación
      setCargando(false)
    }

    aplicarFiltros()
  }, [datosProductos, filtros, busqueda])

  return (
    <section className="products-container">
      <div className="filter-sidebar">
        <Filtro
          onCambiarFiltros={setFiltros}
          conteoProductos={productosFiltrados.length}
        />
      </div>

      <div className="products-content">
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="busqueda-input"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <NotData
          productos={productosFiltrados}
          cargando={cargando}
          error={error}
          mensajeError="Ocurrió un error al cargar los productos."
          mensajeNoResultados="No se encontraron productos con los filtros seleccionados."
          renderProductos={(productos) => (
            <div className="products-grid">
              {productos.map((producto) => (
                <CardItem key={producto.id_catalogo} item={producto} />
              ))}
            </div>
          )}
        />

        
      </div>
    </section>
  )
}