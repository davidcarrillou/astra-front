"use client"

import { useEffect, useState, useCallback } from "react"
import "./productos.css"
import Filtro from "@/components/filtro"
import {CardItem} from "@/components/CardItem"
import { supabase } from "@/supabaseClient"
import type { itemCatalogo, EstadoFiltros } from "@/types"


export function Productos() {

  const [busqueda, setBusqueda] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [datosProductos, setDatosProductos] = useState<itemCatalogo[]>([])
  const [productosFiltrados, setProductosFiltrados] = useState<itemCatalogo[]>([])
  const [errorCarga, setErrorCarga] = useState<string | null>(null)

  const [filtrosActuales, setFiltrosActuales] = useState<EstadoFiltros>({
    marcas: [],
    rangosPrecio: [],
    precioMinimo: "",
    precioMaximo: "",
    destacados: [],
    colores: [],
    almacenamiento: [],
    ram: [],
    accesibilidad: [],
    ordenarPor: "relevancia",
  })

  const productosPorPagina = 12

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase.from("vista_catalogo").select("*")
        console.log(data)

        if (!error && data && data.length > 0) {
          setDatosProductos(data)
        } else {
          // console.log("Using fallback product data - Supabase table not found")
          setErrorCarga("No cargó ni a palos.")
        }
      } catch (error) {
        console.error("Error al cargar productos:", error)
        // setErrorCarga("No se pudo cargar la información de productos.")
        return
      }
    }

    fetchProductos()
  }, []) //se elimina supabase del array, no afecta en nada y solo sobrecarga de fallbacks

  const aplicarFiltros = useCallback((productos: itemCatalogo[], filtros: EstadoFiltros, terminoBusqueda: string) => {
    let filtrados = productos.filter((producto) =>
      (producto.nombre_producto ?? "").toLowerCase().includes(terminoBusqueda.toLowerCase()),
    )

    if (filtros.marcas.length > 0) {
      filtrados = filtrados.filter((producto) => producto.modelo !== null && filtros.marcas.includes(producto.modelo))
    }

    if (filtros.rangosPrecio.length > 0) {
      filtrados = filtrados.filter((producto) =>
        filtros.rangosPrecio.some((rango) => {
          const precio = producto.precio ?? 0
          switch (rango) {
            case "MENOS DE $1,499":
              return precio < 1499
            case "$1,500 A $5,499":
              return precio >= 1500 && precio <= 5499
            case "$5,500 A $10,499":
              return precio >= 5500 && precio <= 10499
            case "$10,500 A $16,499":
              return precio >= 10500 && precio <= 16499
            case "MÁS DE $16,500":
              return precio > 16500
            default:
              return true
          }
        }),
      )
    }

    if (filtros.precioMinimo) {
      filtrados = filtrados.filter((producto) => (producto.precio ?? 0) >= Number.parseFloat(filtros.precioMinimo))
    }

    if (filtros.precioMaximo) {
      filtrados = filtrados.filter((producto) => (producto.precio ?? 0) <= Number.parseFloat(filtros.precioMaximo))
    }

    if (filtros.destacados.length > 0) {
      filtrados = filtrados.filter((producto) => {
        if (filtros.destacados.includes("NUEVOS") && producto.estado === "Nuevo") return true
        if (filtros.destacados.includes("EN PROMOCIÓN") && producto.descuento !== null) return true
        if (filtros.destacados.includes("REACONDICIONADOS") && producto.estado === "Reacondicionado") return true
        return false
      })
    }

    if (filtros.colores.length > 0) {
      filtrados = filtrados.filter((producto) => producto.color !== null && filtros.colores.includes(producto.color))
    }

    if (filtros.almacenamiento.length > 0) {
      filtrados = filtrados.filter((producto) => filtros.almacenamiento.includes(producto.memoria))
    }

    if (filtros.ram.length > 0) {
      filtrados = filtrados.filter((producto) => filtros.ram.includes(producto.ram ?? ""))
    }

    switch (filtros.ordenarPor) {
      case "precio-menor":
        filtrados.sort((a, b) => (a.precio ?? 0) - (b.precio ?? 0))
        break
      case "precio-mayor":
        filtrados.sort((a, b) => (b.precio ?? 0) - (a.precio ?? 0))
        break
      case "mas-nuevo":
        filtrados.sort((a, b) => (b.estado === "Nuevo" ? 1 : 0) - (a.estado === "Nuevo" ? 1 : 0))
        break
      default:
        break
    }

    return filtrados
  }, [])

  useEffect(() => {
    const filtrados = aplicarFiltros(datosProductos, filtrosActuales, busqueda)
    setProductosFiltrados(filtrados)
    setPaginaActual(1)
  }, [datosProductos, filtrosActuales, busqueda, aplicarFiltros])

  const manejarCambioFiltros = useCallback((filtros: EstadoFiltros) => {
    setFiltrosActuales(filtros)
  }, [])

  const indiceUltimo = paginaActual * productosPorPagina
  const indicePrimero = indiceUltimo - productosPorPagina
  const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo)
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)

  return (
    <section className="products-container">
      <div className="filter-sidebar">
        <Filtro alCambiarFiltros={manejarCambioFiltros} conteoProductos={productosFiltrados.length} />
      </div>
      
      <div className="products-content">
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>

          {errorCarga ? (
            <div className="error-message">
              <h1>{errorCarga}</h1>
            </div>
          ) : (
            <div className="products-grid">
              {productosActuales.map((producto) => (
                <CardItem key={producto.id_catalogo} item={producto} />
              ))}
            </div>
          )}

        {totalPaginas > 1 && (
          <div className="pagination">
            <button
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
              className="pagination-button"
            >
              ←
            </button>

            {[...Array(totalPaginas)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPaginaActual(i + 1)}
                className={`pagination-button ${paginaActual === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual(paginaActual + 1)}
              className="pagination-button"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
