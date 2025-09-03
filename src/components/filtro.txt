"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/supabaseClient"
import type { EstadoFiltros } from "@/types"
import "./filtro.css"

interface OpcionFiltro {
  id: string
  nombre: string
  seleccionado?: boolean
}

interface ColorOpcion extends OpcionFiltro {
  codigoHex: string
}

interface SeccionExpandida {
  [key: string]: boolean
}

interface FiltroMejoradoProps {
  alCambiarFiltros?: (filtros: EstadoFiltros) => void
  conteoProductos?: number
}

export { FiltroMejorado }
export default function FiltroMejorado({ alCambiarFiltros, conteoProductos = 1348 }: FiltroMejoradoProps) {
  const marcasFallback: OpcionFiltro[] = [
    { id: "1", nombre: "Samsung" },
    { id: "2", nombre: "Apple" },
    { id: "3", nombre: "Xiaomi" },
    { id: "4", nombre: "Huawei"},
    { id: "5", nombre: "OnePlus" },
    { id: "6", nombre: "Google" },
    { id: "7", nombre: "Sony" },
    { id: "8", nombre: "Motorola" },
  ]

  const coloresFallback: ColorOpcion[] = [
    { id: "1", nombre: "Negro", codigoHex: "#000000" },
    { id: "2", nombre: "Azul", codigoHex: "#0066CC" },
    { id: "3", nombre: "Verde", codigoHex: "#00AA44" },
    { id: "4", nombre: "Gris Oscuro", codigoHex: "#444444" },
    { id: "5", nombre: "Gris Claro", codigoHex: "#CCCCCC" },
    { id: "6", nombre: "Blanco", codigoHex: "#FFFFFF" },
  ]

  const [marcasDisponibles, setMarcasDisponibles] = useState<OpcionFiltro[]>(marcasFallback)
  const [coloresDisponibles, setColoresDisponibles] = useState<ColorOpcion[]>(coloresFallback)
  const [cargandoDatos, setCargandoDatos] = useState(false)
  const [errorCarga, setErrorCarga] = useState<string | null>(null)

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

  const [seccionesExpandidas, setSeccionesExpandidas] = useState<SeccionExpandida>({
    marca: false,
    precio: true,
    destacados: false,
    color: true,
    memoria: false,
    accesibilidad: false,
  })

  useEffect(() => {
    cargarDatosDinamicos()
  }, [])

  const cargarDatosDinamicos = async () => {
    try {
      setCargandoDatos(true)
      setErrorCarga(null)

      const { data: marcas, error: errorMarcas } = await supabase
        .from("marcas")
        .select("*")
        .order("cantidad", { ascending: false })

      const { data: colores, error: errorColores } = await supabase
        .from("colores")
        .select("*")
        .order("cantidad", { ascending: false })

      // If Supabase data is available, use it; otherwise keep fallback data
      if (!errorMarcas && marcas && marcas.length > 0) {
        setMarcasDisponibles(
          marcas.map((marca) => ({
            id: marca.id.toString(),
            nombre: marca.nombre,
            cantidad: marca.cantidad,
          })),
        )
      }

      if (!errorColores && colores && colores.length > 0) {
        setColoresDisponibles(
          colores.map((color) => ({
            id: color.id.toString(),
            nombre: color.nombre,
            cantidad: color.cantidad,
            codigoHex: color.codigo_hex,
          })),
        )
      }

      // Don't show error if tables don't exist, just use fallback data
      if (errorMarcas || errorColores) {
        console.log("Using fallback data - Supabase tables not found")
      }
    } catch (error) {
      console.log("Using fallback data - Supabase connection issue:", error)
      // Keep using fallback data, don't show error to user
    } finally {
      setCargandoDatos(false)
    }
  }

  // Datos estáticos para opciones que no cambian frecuentemente
  const rangosPrecios = [
    { id: "1", nombre: "Menos de $1,499", cantidad: 156 },
    { id: "2", nombre: "$1,500 a $5,499", cantidad: 423 },
    { id: "3", nombre: "$5,500 a $10,499", cantidad: 387 },
    { id: "4", nombre: "$10,500 a $16,499", cantidad: 298 },
    { id: "5", nombre: "Más de $16,500", cantidad: 84 },
  ]

  const opcionesMemoria = [
    { id: "64gb", nombre: "64GB", cantidad: 89 },
    { id: "128gb", nombre: "128GB", cantidad: 234 },
    { id: "256gb", nombre: "256GB", cantidad: 456 },
    { id: "512gb", nombre: "512GB", cantidad: 298 },
    { id: "1tb", nombre: "1TB", cantidad: 156 },
  ]

  const opcionesAccesibilidad = [
    { id: "voiceover", nombre: "VoiceOver", cantidad: 234 },
    { id: "zoom", nombre: "Zoom", cantidad: 189 },
    { id: "talkback", nombre: "TalkBack", cantidad: 156 },
    { id: "magnificacion", nombre: "Magnificación", cantidad: 123 },
  ]

  // Función para alternar expansión de secciones
  const alternarSeccion = (seccion: string) => {
    setSeccionesExpandidas((prev) => ({
      ...prev,
      [seccion]: !prev[seccion],
    }))
  }

  const manejarCambioFiltro = (tipo: keyof EstadoFiltros, valor: unknown) => {
    const nuevosFiltros = { ...filtros, [tipo]: valor }
    setFiltros(nuevosFiltros)
    alCambiarFiltros?.(nuevosFiltros)
  }

  const manejarSeleccionMultiple = (tipo: keyof EstadoFiltros, valor: string) => {
    const valoresActuales = filtros[tipo] as string[]
    const arraySeguro = Array.isArray(valoresActuales) ? valoresActuales : []
    const nuevosValores = arraySeguro.includes(valor) ? arraySeguro.filter((v) => v !== valor) : [...arraySeguro, valor]

    manejarCambioFiltro(tipo, nuevosValores)
  }

  const renderizarOpciones = (opciones: OpcionFiltro[], tipo: keyof EstadoFiltros) => {
    const opcionesAMostrar = tipo === "marcas" ? marcasDisponibles : opciones

    return (
      <div className="filter__items">
        {opcionesAMostrar.map((opcion) => {
          const valoresActuales = filtros[tipo] as string[]
          const arraySeguro = Array.isArray(valoresActuales) ? valoresActuales : []

          return (
            <div key={opcion.id} className="option-item">
              <input
                type="checkbox"
                id={`${tipo}-${opcion.id}`}
                // className="opcion-checkbox"
                checked={arraySeguro.includes(opcion.nombre)}
                onChange={() => manejarSeleccionMultiple(tipo, opcion.nombre)}
              />
              <label htmlFor={`${tipo}-${opcion.id}`} /* className="opcion-label" */>
                {opcion.nombre}
              </label>
            </div>
          )
        })}
      </div>
    )
  }

  const renderizarColores = () => {
    return (
      <>
        <div className="colors__grid">
          {coloresDisponibles.map((color) => {
            const coloresActuales = Array.isArray(filtros.colores) ? filtros.colores : []

            return (
              <div
                key={color.id}
                className={`color-muestra ${coloresActuales.includes(color.nombre) ? "seleccionado" : ""}`}
                style={{ backgroundColor: color.codigoHex }}
                title={`${color.nombre}`}
                onClick={() => manejarSeleccionMultiple("colores", color.nombre)}
              />
            )
          })}
        </div>
        <a href="#" className="mostrar-mas">
          Mostrar más
        </a>
      </>
    )
  }

  return (
    <div className="filter-container">
      {/* Vista de página */}
      <div className="view__articles">
        <div data-rendered-view="grid-big">
          <span>Ver página:</span>
          <div data-rendered-view>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.7368 17.7368C16.7368 17.1846 17.1846 16.7368 17.7368 16.7368H21C21.5523 16.7368 22 17.1846 22 17.7368V21C22 21.5523 21.5523 22 21 22H17.7368C17.1846 22 16.7368 21.5523 16.7368 21V17.7368Z" fill="currentColor"/>
              <path d="M9.36842 17.7368C9.36842 17.1846 9.81613 16.7368 10.3684 16.7368H13.6316C14.1839 16.7368 14.6316 17.1846 14.6316 17.7368V21C14.6316 21.5523 14.1839 22 13.6316 22H10.3684C9.81613 22 9.36842 21.5523 9.36842 21V17.7368Z" fill="currentColor"/>
              <path d="M2 17.7368C2 17.1846 2.44772 16.7368 3 16.7368H6.26316C6.81545 16.7368 7.26316 17.1846 7.26316 17.7368V21C7.26316 21.5523 6.81545 22 6.26316 22H3C2.44771 22 2 21.5523 2 21V17.7368Z" fill="currentColor"/>
              <path d="M16.7368 10.3684C16.7368 9.81613 17.1846 9.36842 17.7368 9.36842H21C21.5523 9.36842 22 9.81613 22 10.3684V13.6316C22 14.1839 21.5523 14.6316 21 14.6316H17.7368C17.1846 14.6316 16.7368 14.1839 16.7368 13.6316V10.3684Z" fill="currentColor"/>
              <path d="M9.36842 10.3684C9.36842 9.81613 9.81613 9.36842 10.3684 9.36842H13.6316C14.1839 9.36842 14.6316 9.81613 14.6316 10.3684V13.6316C14.6316 14.1839 14.1839 14.6316 13.6316 14.6316H10.3684C9.81613 14.6316 9.36842 14.1839 9.36842 13.6316V10.3684Z" fill="currentColor"/>
              <path d="M2 10.3684C2 9.81613 2.44772 9.36842 3 9.36842H6.26316C6.81545 9.36842 7.26316 9.81613 7.26316 10.3684V13.6316C7.26316 14.1839 6.81545 14.6316 6.26316 14.6316H3C2.44771 14.6316 2 14.1839 2 13.6316V10.3684Z" fill="currentColor"/>
              <path d="M16.7368 3C16.7368 2.44771 17.1846 2 17.7368 2H21C21.5523 2 22 2.44772 22 3V6.26316C22 6.81545 21.5523 7.26316 21 7.26316H17.7368C17.1846 7.26316 16.7368 6.81545 16.7368 6.26316V3Z" fill="currentColor"/>
              <path d="M2 3C2 2.44771 2.44772 2 3 2H13.6316C14.1839 2 14.6316 2.44772 14.6316 3V6.26316C14.6316 6.81545 14.1839 7.26316 13.6316 7.26316H3C2.44771 7.26316 2 6.81545 2 6.26316V3Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Ordenar por */}
      <div className="select__order-filter">
        <label htmlFor="order_by">Ordenar por:</label>
        <select
          id="order_by"
          value={filtros.ordenarPor}
          onChange={(e) => manejarCambioFiltro("ordenarPor", e.target.value)}
        >
          <option value="relevancia">Relevancia</option>
          <option value="precio-menor">Precio: menor a mayor</option>
          <option value="precio-mayor">Precio: mayor a menor</option>
          <option value="mas-nuevo">Más nuevo</option>
          <option value="mejor-valorado">Mejor valorado</option>
        </select>
      </div>

      {/* Información de productos */}
      <div className="products__info">
        <p className=":label">Productos:</p>
        <div className="products__total-items"><span>Teléfonos y Smartphones ({conteoProductos})</span></div>
      </div>

      <div className="filters__section">
        {/* Título de filtros */}
        <div className="filter__title"><p className=":label">Filtrar por:</p></div>
        {/* Filtro por Marca */}
        <div className="filter__section">
          <div className="filter__header" onClick={() => alternarSeccion("marca")}>
            <span>Marca</span>
            <div data-expand={seccionesExpandidas.marca}>{seccionesExpandidas.marca ? "−" : "+"}</div>
          </div>
          <div className={`filter__content ${!seccionesExpandidas.marca ? "oculto" : ""}`}>
            {renderizarOpciones([], "marcas")}
          </div>
        </div>
        {/* Filtro por Precio */}
        <div className="filter__section">
          <div className="filter__header" onClick={() => alternarSeccion("precio")}>
            <span>Precio</span>
            <div data-expand={seccionesExpandidas.precio}>{seccionesExpandidas.precio ? "−" : "+"}</div>
          </div>
          <div className={`filter__content ${!seccionesExpandidas.precio ? "oculto" : ""}`}>
            {renderizarOpciones(rangosPrecios, "rangosPrecio")}
            <div className="range__price-inputs">
              <input
                type="number"
                placeholder="Min"
                className="precio-input"
                value={filtros.precioMinimo}
                onChange={(e) => manejarCambioFiltro("precioMinimo", e.target.value)}
              />
              <span className="precio-separador">-</span>
              <input
                type="number"
                placeholder="Max"
                className="precio-input"
                value={filtros.precioMaximo}
                onChange={(e) => manejarCambioFiltro("precioMaximo", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Filtro por Destacados */}
        <div className="filter__section">
          <div className="filter__header" onClick={() => alternarSeccion("destacados")}>
            <span>Destacados</span>
            <div data-expand={seccionesExpandidas.destacados}>{seccionesExpandidas.destacados ? "−" : "+"}</div>
          </div>
          <div className={`filter__content ${!seccionesExpandidas.destacados ? "oculto" : ""}`}>
            {renderizarOpciones(
              [
                { id: "nuevos", nombre: "Nuevos" },
                { id: "promocion", nombre: "En Promoción"},
                { id: "reacondicionados", nombre: "Reacondicionados"},
              ],
              "destacados",
            )}
          </div>
        </div>
        {/* Filtro por Color */}
        <div className="filter__section">
          <div className="filter__header" onClick={() => alternarSeccion("color")}>
            <span>Color</span>
            <div data-expand={seccionesExpandidas.color}>{seccionesExpandidas.color ? "−" : "+"}</div>
          </div>
          <div className={`filter__content ${!seccionesExpandidas.color ? "oculto" : ""}`}>{renderizarColores()}</div>
        </div>
        {/* Filtro por Memoria */}
        <div className="filter__section">
          <div className="filter__header" onClick={() => alternarSeccion("memoria")}>
            <span>Memoria</span>
            <div data-expand={seccionesExpandidas.memoria}>{seccionesExpandidas.memoria ? "−" : "+"}</div>
          </div>
          <div className={`filter__content ${!seccionesExpandidas.memoria ? "oculto" : ""}`}>
            {renderizarOpciones(opcionesMemoria, "almacenamiento")}
          </div>
        </div>
        {/* Filtro por Accesibilidad */}
        <div className="filter__section">
          <div className="filter__header" onClick={() => alternarSeccion("accesibilidad")}>
            <span>Accesibilidad</span>
            <div data-expand={seccionesExpandidas.accesibilidad}>{seccionesExpandidas.accesibilidad ? "−" : "+"}</div>
          </div>
          <div className={`filter__content ${!seccionesExpandidas.accesibilidad ? "oculto" : ""}`}>
            {renderizarOpciones(opcionesAccesibilidad, "accesibilidad")}
          </div>
        </div>
      </div>
    </div>
  )
}
