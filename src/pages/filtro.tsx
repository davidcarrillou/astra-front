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
    precio: false,
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
    { id: "1", nombre: "MENOS DE $1,499", cantidad: 156 },
    { id: "2", nombre: "$1,500 A $5,499", cantidad: 423 },
    { id: "3", nombre: "$5,500 A $10,499", cantidad: 387 },
    { id: "4", nombre: "$10,500 A $16,499", cantidad: 298 },
    { id: "5", nombre: "MÁS DE $16,500", cantidad: 84 },
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

  const manejarCambioFiltro = (tipo: keyof EstadoFiltros, valor: any) => {
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
      <div className="opciones-lista">
        {opcionesAMostrar.map((opcion) => {
          const valoresActuales = filtros[tipo] as string[]
          const arraySeguro = Array.isArray(valoresActuales) ? valoresActuales : []

          return (
            <div key={opcion.id} className="opcion-item">
              <input
                type="checkbox"
                id={`${tipo}-${opcion.id}`}
                className="opcion-checkbox"
                checked={arraySeguro.includes(opcion.nombre)}
                onChange={() => manejarSeleccionMultiple(tipo, opcion.nombre)}
              />
              <label htmlFor={`${tipo}-${opcion.id}`} className="opcion-label">
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
        <div className="colores-grid">
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
    <div className="filtro-container">
      {/* Vista de página */}
      <div className="vista-pagina">
        <span>Ver página:</span>
        <div className="icono-grid">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <rect x="0" y="0" width="3" height="3" />
            <rect x="4.5" y="0" width="3" height="3" />
            <rect x="9" y="0" width="3" height="3" />
            <rect x="0" y="4.5" width="3" height="3" />
            <rect x="4.5" y="4.5" width="3" height="3" />
            <rect x="9" y="4.5" width="3" height="3" />
            <rect x="0" y="9" width="3" height="3" />
            <rect x="4.5" y="9" width="3" height="3" />
            <rect x="9" y="9" width="3" height="3" />
          </svg>
        </div>
      </div>

      {/* Ordenar por */}
      <div className="ordenar-seccion">
        <label className="ordenar-label">Ordenar por:</label>
        <select
          className="ordenar-select"
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
      <div className="productos-info">
        <div className="productos-titulo">Productos:</div>
        <div className="productos-categoria">Teléfonos y Smartphones ({conteoProductos})</div>
      </div>

      {/* Título de filtros */}
      <div className="filtros-titulo">Filtrar por:</div>

      {/* Filtro por Marca */}
      <div className="filtro-seccion">
        <div className="filtro-header" onClick={() => alternarSeccion("marca")}>
          <span className="filtro-nombre">Marca</span>
          <div className="filtro-toggle">{seccionesExpandidas.marca ? "−" : "+"}</div>
        </div>
        <div className={`filtro-contenido ${!seccionesExpandidas.marca ? "oculto" : ""}`}>
          {renderizarOpciones([], "marcas")}
        </div>
      </div>

      {/* Filtro por Precio */}
      <div className="filtro-seccion">
        <div className="filtro-header" onClick={() => alternarSeccion("precio")}>
          <span className="filtro-nombre">Precio</span>
          <div className="filtro-toggle">{seccionesExpandidas.precio ? "−" : "+"}</div>
        </div>
        <div className={`filtro-contenido ${!seccionesExpandidas.precio ? "oculto" : ""}`}>
          {renderizarOpciones(rangosPrecios, "rangosPrecio")}
          <div className="precio-inputs">
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
      <div className="filtro-seccion">
        <div className="filtro-header" onClick={() => alternarSeccion("destacados")}>
          <span className="filtro-nombre">Destacados</span>
          <div className="filtro-toggle">{seccionesExpandidas.destacados ? "−" : "+"}</div>
        </div>
        <div className={`filtro-contenido ${!seccionesExpandidas.destacados ? "oculto" : ""}`}>
          {renderizarOpciones(
            [
              { id: "nuevos", nombre: "NUEVOS" },
              { id: "promocion", nombre: "EN PROMOCIÓN"},
              { id: "reacondicionados", nombre: "REACONDICIONADOS"},
            ],
            "destacados",
          )}
        </div>
      </div>

      {/* Filtro por Color */}
      <div className="filtro-seccion">
        <div className="filtro-header" onClick={() => alternarSeccion("color")}>
          <span className="filtro-nombre">Color</span>
          <div className="filtro-toggle">{seccionesExpandidas.color ? "−" : "+"}</div>
        </div>
        <div className={`filtro-contenido ${!seccionesExpandidas.color ? "oculto" : ""}`}>{renderizarColores()}</div>
      </div>

      {/* Filtro por Memoria */}
      <div className="filtro-seccion">
        <div className="filtro-header" onClick={() => alternarSeccion("memoria")}>
          <span className="filtro-nombre">Memoria</span>
          <div className="filtro-toggle">{seccionesExpandidas.memoria ? "−" : "+"}</div>
        </div>
        <div className={`filtro-contenido ${!seccionesExpandidas.memoria ? "oculto" : ""}`}>
          {renderizarOpciones(opcionesMemoria, "almacenamiento")}
        </div>
      </div>

      {/* Filtro por Accesibilidad */}
      <div className="filtro-seccion">
        <div className="filtro-header" onClick={() => alternarSeccion("accesibilidad")}>
          <span className="filtro-nombre">Accesibilidad</span>
          <div className="filtro-toggle">{seccionesExpandidas.accesibilidad ? "−" : "+"}</div>
        </div>
        <div className={`filtro-contenido ${!seccionesExpandidas.accesibilidad ? "oculto" : ""}`}>
          {renderizarOpciones(opcionesAccesibilidad, "accesibilidad")}
        </div>
      </div>
    </div>
  )
}
