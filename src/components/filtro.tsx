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
    { nombre: "64gb" },
    { nombre: "128gb" },
    { nombre: "256gb" },
    { nombre: "512gb" },
    { nombre: "1tb" },
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
  }, [filtros, onCambiarFiltros])

  useEffect(() => {
  console.log("Catálogos actualizados:", catalogos);
}, [catalogos]);

  const renderOpciones = (campo: keyof EstadoFiltros, opciones: string[]) => (
    <div className={`filter__content ${seccionesAbiertas[campo] ? "" : "oculto"}`}>
      <div className="filter__items">
        {opciones.map((opcion, index) => (
          <label key={index} htmlFor={`${campo}-${index}`} className="option-item">
            <input
              id={`${campo}-${index}`}
              type="checkbox"
              checked={filtros[campo]?.includes(opcion)}
              onChange={() => toggleFiltro(campo, opcion)}
            />
            <span className="option-label">{opcion}</span>
          </label>
        ))}
      </div>
    </div>
  )

  const renderizarColores = () => {
    const coloresActuales = Array.isArray(filtros.colores) ? filtros.colores : []

    return (
      <div className={`filter__content ${seccionesAbiertas["colores"] ? "" : "oculto"}`}>
        <div className="colors__grid">
          {catalogos.colores.map((color, index) => (
            <div
              key={index}
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
    <aside className="filter__container">
      {/* Limpiar filtros */}
      <div className="filter__clear">
        <p className=":label">Filtrar productos</p>
        <button className="btn :secondary" onClick={limpiarFiltros}>Limpiar filtros</button>
      </div>

      {/* Ordenar */}
      <div className="select__order-filter">
        <label htmlFor="order_by">Ordenar por:</label>
        <select
            id="order_by"
            value={filtros.ordenarPor}
            onChange={(e) => setFiltros({ ...filtros, ordenarPor: e.target.value })}
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-menor">Precio menor</option>
            <option value="precio-mayor">Precio mayor</option>
            <option value="disponibilidad">Disponibilidad</option>
          </select>
      </div>

      {/* Información de productos */}
      <div className="products__info">
        <p className=":label">Productos:</p>
        <div className="products__total-items"><span>{conteoProductos} resultados</span></div>
      </div>

      {/* Marcas */}
      <div className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("marcas")}>
          <p className=":label">Marca</p>
          <span>{seccionesAbiertas["marcas"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("marcas", catalogos.marcas)}
      </div>

      {/* Rangos de precio */}
      <div className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("rangosPrecio")}>
          <p className=":label">Precio</p>
          <span>{seccionesAbiertas["rangosPrecio"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("rangosPrecio", [
          "Menos de $1,499",
          "$1,500 a $5,499",
          "$5,500 a $10,499",
          "$10,500 a $16,499",
          "Más de $16,500"
        ])}
        <div className="range__price-inputs">
          <div className="filter__range">
            <label htmlFor="filter_min-input" className=":hd-tag">Ingrese el precio minimo</label>
            <input
              id="filter_min-input"
              type="number"
              placeholder="Min"
              className="precio-input"
              value={filtros.precioMinimo}
              onChange={(e) => toggleFiltro("precioMinimo", e.target.value)}
            />
          </div>
          <span className=":sp-line">-</span>
          <div className="filter__range">
            <label htmlFor="filter_max-input" className=":hd-tag">Ingrese el precio maximo</label>
            <input
              id="filter_max-input"
              type="number"
              placeholder="Max"
              className="precio-input"
              value={filtros.precioMaximo}
              onChange={(e) => toggleFiltro("precioMaximo", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Memoria */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("almacenamiento")}>
          <p className=":label">Memoria</p>
          <span>{seccionesAbiertas["almacenamiento"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("almacenamiento", opcionesMemoria.map((memoria) => memoria.nombre))}
      </section>

      {/* Colores */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("colores")}>
          <p className=":label">Color</p>
          <span>{seccionesAbiertas["colores"] ? "−" : "+"}</span>
        </div>
        {renderizarColores()}
      </section>

      {/* Características */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("caracteristicas")}>
          <p className=":label">Caracteristicas</p>
          <span>{seccionesAbiertas["caracteristicas"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("caracteristicas", catalogos.tags)}
      </section>

      {/* Disponibilidad */}
      <section className="filter__section">
        <div className="filter__header" onClick={() => toggleSeccion("accesibilidad")}>
          <p className=":label">Disponibilidad</p>
          <span>{seccionesAbiertas["accesibilidad"] ? "−" : "+"}</span>
        </div>
        {renderOpciones("accesibilidad", ["disponible"])}
      </section>
    </aside>
  )
}
