"use client"

import type React from "react"
import { useState, useEffect } from "react"
import "./filtro.css"

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

interface PropiedadesFiltroMovil {
  alCambiarFiltros: (filtros: EstadoFiltros) => void
  conteoProductos: number
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

const marcas = [
  "SAMSUNG",
  "APPLE",
  "XIAOMI",
  "MOTOROLA",
  "HONOR",
  "ZTE",
  "HUAWEI",
  "OPPO",
  "VIVO",
  "GOOGLE",
  "REALME",
  "ACER",
  "NUBIA",
  "SENWA",
  "TCL",
  "NOKI",
  "TECNOMOBIL",
  "WIK",
  "IMOBI",
  "ALCATE",
  "KODA",
  "DOPPI",
  "ONEPLU",
]

const rangosPrecio = [
  { etiqueta: "MENOS DE $1,499", cantidad: 139 },
  { etiqueta: "$1,500 A $5,499", cantidad: 463 },
  { etiqueta: "$5,500 A $10,499", cantidad: 231 },
  { etiqueta: "$10,500 A $16,499", cantidad: 136 },
  { etiqueta: "MÁS DE $16,500", cantidad: 380 },
]

const opcionesDestacados = [
  { etiqueta: "NUEVOS", cantidad: 39 },
  { etiqueta: "EN PROMOCIÓN", cantidad: 833 },
]

const colores = [
  { nombre: "Negro", valor: "#000000" },
  { nombre: "Azul", valor: "#3B82F6" },
  { nombre: "Verde", valor: "#10B981" },
  { nombre: "Gris Oscuro", valor: "#374151" },
  { nombre: "Gris Claro", valor: "#D1D5DB" },
  { nombre: "Blanco", valor: "#FFFFFF" },
]

const opcionesAlmacenamiento = [
  "256 GB",
  "128 GB",
  "512 GB",
  "64 GB",
  "32 GB",
  "1 TB",
  "0 NA",
  "32 MB",
  "512 MB",
  "128 MB",
  "16 GB",
  "8 GB",
]

const opcionesRam = ["1 GB", "2 GB", "3 GB", "4 GB", "5 GB", "6 GB", "8 GB", "12 GB", "16 GB"]

interface PropiedadesSeccionFiltro {
  titulo: string
  estaExpandida: boolean
  alAlternar: () => void
  children: React.ReactNode
}

function SeccionFiltro({ titulo, estaExpandida, alAlternar, children }: PropiedadesSeccionFiltro) {
  return (
    <div className="filter-section">
      <button onClick={alAlternar} className="filter-section-button">
        <span>{titulo}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {estaExpandida ? (
            <path d="M5 12h14" />
          ) : (
            <>
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </>
          )}
        </svg>
      </button>
      {estaExpandida && <div className="filter-section-content">{children}</div>}
    </div>
  )
}

export function Filtro({ alCambiarFiltros, conteoProductos }: PropiedadesFiltroMovil) {
  const [seccionesExpandidas, setSeccionesExpandidas] = useState<Record<string, boolean>>({
    color: true,
  })

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
    ordenarPor: "relevancia",
  })

  useEffect(() => {
    alCambiarFiltros(filtros)
  }, [filtros, alCambiarFiltros])

  const alternarSeccion = (seccion: string) => {
    setSeccionesExpandidas((anterior) => ({
      ...anterior,
      [seccion]: !anterior[seccion],
    }))
  }

  const manejarCambioMarca = (marca: string, seleccionado: boolean) => {
    setFiltros((anterior) => ({
      ...anterior,
      marcas: seleccionado ? [...anterior.marcas, marca] : anterior.marcas.filter((m) => m !== marca),
    }))
  }

  const manejarCambioRangoPrecio = (rango: string, seleccionado: boolean) => {
    setFiltros((anterior) => ({
      ...anterior,
      rangosPrecio: seleccionado ? [...anterior.rangosPrecio, rango] : anterior.rangosPrecio.filter((r) => r !== rango),
    }))
  }

  const manejarCambioDestacado = (caracteristica: string, seleccionado: boolean) => {
    setFiltros((anterior) => ({
      ...anterior,
      destacados: seleccionado
        ? [...anterior.destacados, caracteristica]
        : anterior.destacados.filter((c) => c !== caracteristica),
    }))
  }

  const alternarColor = (valorColor: string) => {
    setFiltros((anterior) => ({
      ...anterior,
      colores: anterior.colores.includes(valorColor)
        ? anterior.colores.filter((c) => c !== valorColor)
        : [...anterior.colores, valorColor],
    }))
  }

  const manejarCambioAlmacenamiento = (almacenamiento: string, seleccionado: boolean) => {
    setFiltros((anterior) => ({
      ...anterior,
      almacenamiento: seleccionado
        ? [...anterior.almacenamiento, almacenamiento]
        : anterior.almacenamiento.filter((a) => a !== almacenamiento),
    }))
  }

  const manejarCambioAccesibilidad = (caracteristica: string, seleccionado: boolean) => {
    setFiltros((anterior) => ({
      ...anterior,
      accesibilidad: seleccionado
        ? [...anterior.accesibilidad, caracteristica]
        : anterior.accesibilidad.filter((a) => a !== caracteristica),
    }))
  }

  const aplicarFiltroPrecio = () => {
    setFiltros((anterior) => ({
      ...anterior,
      precioMinimo: anterior.precioMinimo,
      precioMaximo: anterior.precioMaximo,
    }))
  }

  return (
    <div className="mobile-filter">
      {/* Header Section */}
      <div className="filter-header">
        <div className="view-page-section">
          <span className="view-page-label">Ver página:</span>
          <button className="grid-button">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          </button>
        </div>

        <div className="sort-section">
          <label className="sort-label">Ordenar por:</label>
          <div className="sort-select-wrapper">
            <select
              value={filtros.ordenarPor}
              onChange={(e) => setFiltros((anterior) => ({ ...anterior, ordenarPor: e.target.value }))}
              className="sort-select"
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-menor">Precio: Menor a Mayor</option>
              <option value="precio-mayor">Precio: Mayor a Menor</option>
              <option value="mas-nuevo">Más Nuevo</option>
            </select>
            <svg
              className="sort-select-arrow"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="products-summary">
          <h3 className="products-title">Productos:</h3>
          <p className="products-count">Teléfonos y Smartphones ({conteoProductos})</p>
        </div>
      </div>

      {/* Filter Sections */}
      <div>
        <div className="filter-sections-header">
          <h3 className="filter-sections-title">Filtrar por:</h3>
        </div>

        {/* Marca */}
        <SeccionFiltro
          titulo="Marca"
          estaExpandida={seccionesExpandidas.marca || false}
          alAlternar={() => alternarSeccion("marca")}
        >
          <div className="filter-options-scrollable">
            {marcas.map((marca) => (
              <label key={marca} className="filter-option">
                <input
                  type="checkbox"
                  checked={filtros.marcas.includes(marca)}
                  onChange={(e) => manejarCambioMarca(marca, e.target.checked)}
                  className="filter-checkbox"
                />
                <span>{marca}</span>
              </label>
            ))}
          </div>
        </SeccionFiltro>

        {/* Precio */}
        <SeccionFiltro
          titulo="Precio"
          estaExpandida={seccionesExpandidas.precio || false}
          alAlternar={() => alternarSeccion("precio")}
        >
          <div>
            <div className="filter-options-scrollable">
              {rangosPrecio.map((rango) => (
                <label key={rango.etiqueta} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filtros.rangosPrecio.includes(rango.etiqueta)}
                    onChange={(e) => manejarCambioRangoPrecio(rango.etiqueta, e.target.checked)}
                    className="filter-checkbox"
                  />
                  <span>{rango.etiqueta}</span>
                  <span className="filter-option-count">({rango.cantidad})</span>
                </label>
              ))}
            </div>
            <div className="price-inputs-section">
              <div className="price-input-group">
                <label className="price-input-label">Mín.</label>
                <input
                  type="number"
                  placeholder="$0.00"
                  value={filtros.precioMinimo}
                  onChange={(e) => setFiltros((anterior) => ({ ...anterior, precioMinimo: e.target.value }))}
                  className="price-input"
                />
              </div>
              <div className="price-input-group">
                <label className="price-input-label">Máx.</label>
                <input
                  type="number"
                  placeholder="$0.00"
                  value={filtros.precioMaximo}
                  onChange={(e) => setFiltros((anterior) => ({ ...anterior, precioMaximo: e.target.value }))}
                  className="price-input"
                />
              </div>
              <button onClick={aplicarFiltroPrecio} className="price-apply-button">
                Aplicar
              </button>
            </div>
          </div>
        </SeccionFiltro>

        {/* Destacados */}
        <SeccionFiltro
          titulo="Destacados"
          estaExpandida={seccionesExpandidas.destacados || false}
          alAlternar={() => alternarSeccion("destacados")}
        >
          <div>
            {opcionesDestacados.map((opcion) => (
              <label key={opcion.etiqueta} className="filter-option">
                <input
                  type="checkbox"
                  checked={filtros.destacados.includes(opcion.etiqueta)}
                  onChange={(e) => manejarCambioDestacado(opcion.etiqueta, e.target.checked)}
                  className="filter-checkbox"
                />
                <span>{opcion.etiqueta}</span>
                <span className="filter-option-count">({opcion.cantidad})</span>
              </label>
            ))}
          </div>
        </SeccionFiltro>

        {/* Color */}
        <SeccionFiltro
          titulo="Color"
          estaExpandida={seccionesExpandidas.color || false}
          alAlternar={() => alternarSeccion("color")}
        >
          <div>
            <div className="color-swatches">
              {colores.map((color) => (
                <button
                  key={color.valor}
                  onClick={() => alternarColor(color.valor)}
                  className={`color-swatch ${
                    filtros.colores.includes(color.valor)
                      ? "selected"
                      : color.valor === "#FFFFFF"
                        ? "white-unselected"
                        : "unselected"
                  }`}
                  style={{ backgroundColor: color.valor }}
                  title={color.nombre}
                />
              ))}
            </div>
            <button className="show-more-button">Mostrar más</button>
          </div>
        </SeccionFiltro>

        {/* Memoria */}
        <SeccionFiltro
          titulo="Memoria"
          estaExpandida={seccionesExpandidas.memoria || false}
          alAlternar={() => alternarSeccion("memoria")}
        >
          <div className="filter-options-scrollable">
            {opcionesAlmacenamiento.map((almacenamiento) => (
              <label key={almacenamiento} className="filter-option">
                <input
                  type="checkbox"
                  checked={filtros.almacenamiento.includes(almacenamiento)}
                  onChange={(e) => manejarCambioAlmacenamiento(almacenamiento, e.target.checked)}
                  className="filter-checkbox"
                />
                <span>{almacenamiento}</span>
              </label>
            ))}
          </div>
        </SeccionFiltro>

        {/* Accesibilidad */}
        <SeccionFiltro
          titulo="Accesibilidad"
          estaExpandida={seccionesExpandidas.accesibilidad || false}
          alAlternar={() => alternarSeccion("accesibilidad")}
        >
          <div>
            {["Pantalla táctil", "Reconocimiento facial", "Lector de huellas"].map((caracteristica) => (
              <label key={caracteristica} className="filter-option">
                <input
                  type="checkbox"
                  checked={filtros.accesibilidad.includes(caracteristica)}
                  onChange={(e) => manejarCambioAccesibilidad(caracteristica, e.target.checked)}
                  className="filter-checkbox"
                />
                <span>{caracteristica}</span>
              </label>
            ))}
          </div>
        </SeccionFiltro>
      </div>
    </div>
  )
}
