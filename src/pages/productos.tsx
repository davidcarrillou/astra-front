"use client"

import { useEffect, useState, useCallback } from "react"
import "./productos.css"
import { Filtro } from "./filtro"

interface DatosProducto {
  id: number
  titulo: string
  precio: number
  marca: string
  color: string
  memoria: string
  ram: string
  destacado: boolean
  nuevo: boolean
  activo: boolean
}

interface EstadoFiltros {
  marcas: string[]
  rangosPrecio: string[]
  precioMinimo: string
  precioMaximo: string
  destacados: string[]
  colores: string[]
  almacenamiento: string[]
  ram: string[]
  accesibilidad: string[]
  ordenarPor: string
}

const productosMock: DatosProducto[] = [
  {
    id: 1,
    titulo: "iPhone 15 Pro",
    precio: 25000,
    marca: "APPLE",
    color: "#000000",
    memoria: "256 GB",
    ram: "8 GB",
    destacado: true,
    nuevo: true,
    activo: true,
  },
  {
    id: 2,
    titulo: "Samsung Galaxy S24",
    precio: 18000,
    marca: "SAMSUNG",
    color: "#3B82F6",
    memoria: "128 GB",
    ram: "12 GB",
    destacado: false,
    nuevo: false,
    activo: true,
  },
  // Agregar más productos mock según sea necesario
]

export function Productos() {
  const [busqueda, setBusqueda] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [datosProductos, setDatosProductos] = useState<DatosProducto[]>(productosMock)
  const [productosFiltrados, setProductosFiltrados] = useState<DatosProducto[]>(productosMock)
  const [cargando, setCargando] = useState(false)
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

  const productosPorPagina = 10

  const aplicarFiltros = useCallback((productos: DatosProducto[], filtros: EstadoFiltros, terminoBusqueda: string) => {
    let filtrados = productos.filter((producto) =>
      producto.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()),
    )

    // Filtro de marca
    if (filtros.marcas.length > 0) {
      filtrados = filtrados.filter((producto) => filtros.marcas.includes(producto.marca))
    }

    // Filtro de rango de precio
    if (filtros.rangosPrecio.length > 0) {
      filtrados = filtrados.filter((producto) => {
        return filtros.rangosPrecio.some((rango) => {
          switch (rango) {
            case "MENOS DE $1,499":
              return producto.precio < 1499
            case "$1,500 A $5,499":
              return producto.precio >= 1500 && producto.precio <= 5499
            case "$5,500 A $10,499":
              return producto.precio >= 5500 && producto.precio <= 10499
            case "$10,500 A $16,499":
              return producto.precio >= 10500 && producto.precio <= 16499
            case "MÁS DE $16,500":
              return producto.precio > 16500
            default:
              return true
          }
        })
      })
    }

    // Filtro de precio mínimo/máximo
    if (filtros.precioMinimo) {
      filtrados = filtrados.filter((producto) => producto.precio >= Number.parseFloat(filtros.precioMinimo))
    }
    if (filtros.precioMaximo) {
      filtrados = filtrados.filter((producto) => producto.precio <= Number.parseFloat(filtros.precioMaximo))
    }

    // Filtro de destacados
    if (filtros.destacados.length > 0) {
      filtrados = filtrados.filter((producto) => {
        if (filtros.destacados.includes("NUEVOS") && producto.nuevo) return true
        if (filtros.destacados.includes("EN PROMOCIÓN") && producto.destacado) return true
        return false
      })
    }

    // Filtro de color
    if (filtros.colores.length > 0) {
      filtrados = filtrados.filter((producto) => filtros.colores.includes(producto.color))
    }

    // Filtro de almacenamiento
    if (filtros.almacenamiento.length > 0) {
      filtrados = filtrados.filter((producto) => filtros.almacenamiento.includes(producto.memoria))
    }

    // Ordenar productos
    switch (filtros.ordenarPor) {
      case "precio-menor":
        filtrados.sort((a, b) => a.precio - b.precio)
        break
      case "precio-mayor":
        filtrados.sort((a, b) => b.precio - a.precio)
        break
      case "mas-nuevo":
        filtrados.sort((a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0))
        break
      default:
        // Relevancia - mantener orden original
        break
    }

    return filtrados
  }, [])

  useEffect(() => {
    const filtrados = aplicarFiltros(datosProductos, filtrosActuales, busqueda)
    setProductosFiltrados(filtrados)
    setPaginaActual(1) // Resetear a primera página cuando cambien los filtros
  }, [datosProductos, filtrosActuales, busqueda, aplicarFiltros])

  const manejarCambioFiltros = useCallback((filtros: EstadoFiltros) => {
    setFiltrosActuales(filtros)
  }, [])

  // Lógica de paginación
  const indiceUltimo = paginaActual * productosPorPagina
  const indicePrimero = indiceUltimo - productosPorPagina
  const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo)
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)

  return (
    <div className="products-container">
      {/* Barra lateral de filtros */}
      <div className="filter-sidebar">
        <Filtro alCambiarFiltros={manejarCambioFiltros} conteoProductos={productosFiltrados.length} />
      </div>

      {/* Contenido de productos */}
      <div className="products-content">
        {/* Barra de búsqueda */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Cuadrícula de productos */}
        <div className="products-grid">
          {productosActuales.map((producto) => (
            <div key={producto.id} className="product-card">
              <h3 className="product-title">{producto.titulo}</h3>
              <p className="product-brand">{producto.marca}</p>
              <p className="product-price">${producto.precio.toLocaleString()}</p>
              <div className="product-specs">
                <span>{producto.memoria}</span>
                <span>•</span>
                <span>{producto.ram} RAM</span>
              </div>
              {(producto.nuevo || producto.destacado) && (
                <div className="product-badges">
                  {producto.nuevo && <span className="badge-new">Nuevo</span>}
                  {producto.destacado && <span className="badge-featured">Promoción</span>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="pagination">
            <button
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
              className={`pagination-button ${paginaActual === 1 ? "" : ""}`}
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
              className={`pagination-button ${paginaActual === totalPaginas ? "" : ""}`}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
