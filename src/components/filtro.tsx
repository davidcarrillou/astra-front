import { useEffect, useState } from "react"
import "./filtro.css"
import type { EstadoFiltros } from "@/types"
import { supabase } from "@/supabaseClient"

interface FiltroProps {
  onCambiarFiltros: (filtros: EstadoFiltros) => void
  conteoProductos: number
}

interface ColorCatalogo {
  id_color: number
  nombre: string
  valor: string
}

export default function Filtro({ onCambiarFiltros, conteoProductos }: FiltroProps) {
  const [catalogos, setCatalogos] = useState({
    marcas: [] as string[],
    colores: [] as ColorCatalogo[],
    categorias: [] as string[],
    tags: [] as string[]
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
    caracteristicas: [],
    ordenarPor: "relevancia",
    categorias: [],
    tags: []
  })

  const opcionesMemoria = [
    { nombre: "64GB" },
    { nombre: "128GB" },
    { nombre: "256GB" },
    { nombre: "512GB" },
    { nombre: "1TB" },
  ]
  const [seccionesAbiertas, setSeccionesAbiertas] = useState<Record<string, boolean>>({})

  const toggleFiltro = (campo: keyof EstadoFiltros, valor: string) => {
    const actual = filtros[campo]
    const nuevo = Array.isArray(actual)
      ? actual.includes(valor)
        ? actual.filter((v) => v !== valor)
        : [...actual, valor]
      : []
    setFiltros({ ...filtros, [campo]: nuevo })
  }

  const manejarSeleccionMultiple = (campo: keyof EstadoFiltros, valor: string) => {
    toggleFiltro(campo, valor)
  }

  const toggleSeccion = (clave: string) => {
    setSeccionesAbiertas((prev) => ({
      ...prev,
      [clave]: !prev[clave]
    }))
  }

  const limpiarFiltros = () => {
    setFiltros({
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
  }

  useEffect(() => {
    const cargarCatalogos = async () => {
      const [marcasRes, coloresRes, categoriasRes, tagsRes] = await Promise.all([
        supabase.from("marca").select("nombre"),
        supabase.from("color").select("id_color, nombre, valor"),
        supabase.from("categoria").select("nombre"),
        supabase.from("tag").select("nombre").order("nombre", { ascending: true })
      ])

      setCatalogos({
        marcas: marcasRes.data?.map((m) => m.nombre) ?? [],
        colores: coloresRes.data ?? [],
        categorias: categoriasRes.data?.map((cat) => cat.nombre).filter(Boolean) ?? [],
        tags: tagsRes.data?.map((t) => t.nombre) ?? []
      })
    }

    cargarCatalogos()
  }, [])

  useEffect(() => {
    onCambiarFiltros(filtros)
  }, [filtros])

  useEffect(() => {
  console.log("Catálogos actualizados:", catalogos);
}, [catalogos]);

  const renderOpciones = (campo: keyof EstadoFiltros, opciones: string[]) => (
    <div className={`filtro__content ${seccionesAbiertas[campo] ? "abierto" : "cerrado"}`}>
      {opciones.map((opcion) => (
        <label key={opcion} className="option-item">
          <input
            type="checkbox"
            checked={filtros[campo]?.includes(opcion)}
            onChange={() => toggleFiltro(campo, opcion)}
          />
          <span className="opcion-label">{opcion}</span>
        </label>
      ))}
    </div>
  )

  const renderizarColores = () => {
    const coloresActuales = Array.isArray(filtros.colores) ? filtros.colores : []

    return (
      <div className={`filtro__content ${seccionesAbiertas["colores"] ? "abierto" : "cerrado"}`}>
        <div className="colors__grid">
          {catalogos.colores.map((color) => (
            <div
              key={color.id_color}
              className={`color-muestra ${coloresActuales.includes(color.nombre) ? "seleccionado" : ""}`}
              style={{ backgroundColor: color.valor }}
              title={color.nombre}
              onClick={() => manejarSeleccionMultiple("colores", color.nombre)}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <aside className="filtro-panel">
      <div className="filtro__header">
        <h2>Filtrar productos</h2>
        <button className="btn-limpiar" onClick={limpiarFiltros}>Limpiar filtros</button>
      </div>
      <p>{conteoProductos} resultados</p>

      {/* Marcas */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("marcas")}>
          <h3>Marca</h3>
          <span>{seccionesAbiertas["marcas"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("marcas", catalogos.marcas)}
      </section>

      {/* Rangos de precio */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("rangosPrecio")}>
          <h3>Rangos de precio</h3>
          <span>{seccionesAbiertas["rangosPrecio"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("rangosPrecio", [
          "MENOS DE $1,499",
          "$1,500 A $5,499",
          "$5,500 A $10,499",
          "$10,500 A $16,499",
          "MÁS DE $16,500"
        ])}
        <div className="range__price-inputs">
              <input
                type="number"
                placeholder="Min"
                className="precio-input"
                value={filtros.precioMinimo}
                onChange={(e) => toggleFiltro("precioMinimo", e.target.value)}
              />
              <span className="precio-separador">-</span>
              <input
                type="number"
                placeholder="Max"
                className="precio-input"
                value={filtros.precioMaximo}
                onChange={(e) => toggleFiltro("precioMaximo", e.target.value)}
              />
            </div>
      </section>

      {/* Memoria */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("almacenamiento")}>
          <h3>Memoria</h3>
          <span>{seccionesAbiertas["almacenamiento"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("almacenamiento", opcionesMemoria.map((memoria) => memoria.nombre))}
      </section>

      {/* Colores */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("colores")}>
          <h3>Color</h3>
          <span>{seccionesAbiertas["colores"] ? "−" : "+"}</span>
        </div>
        {renderizarColores()}
      </section>

      {/* Características */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("caracteristicas")}>
          <h3>Características</h3>
          <span>{seccionesAbiertas["caracteristicas"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("caracteristicas", catalogos.tags)}
      </section>

      {/* Disponibilidad */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("accesibilidad")}>
          <h3>Disponibilidad</h3>
          <span>{seccionesAbiertas["accesibilidad"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("accesibilidad", ["disponible"])}
      </section>

      {/* Ordenar */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("ordenarPor")}>
          <h3>Ordenar por</h3>
          <span>{seccionesAbiertas["ordenarPor"] ? "−" : "+"}</span>
        </div>
        <div className={`filtro__content ${seccionesAbiertas["ordenarPor"] ? "abierto" : "cerrado"}`}>
          <select
            value={filtros.ordenarPor}
            onChange={(e) => setFiltros({ ...filtros, ordenarPor: e.target.value })}
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-menor">Precio menor</option>
            <option value="precio-mayor">Precio mayor</option>
            <option value="disponibilidad">Disponibilidad</option>
          </select>
        </div>
      </section>
    </aside>
  )
}
