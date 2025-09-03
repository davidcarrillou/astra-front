"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { ProductoDetalle } from "@/types"
import "./producto-detalle.css"
import { supabase } from "@/supabaseClient"

export default function DetalleProducto() {
  const { id, modelo } = useParams()
  const [producto, setProducto] = useState<ProductoDetalle | null>(null)
  const [cargando, setCargando] = useState(true)
  const [imagenActual, setImagenActual] = useState(0)
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    const cargarProducto = async () => {
      setCargando(true)
      try {
        const modeloDecodificado = decodeURIComponent(modelo ?? "")
        const { data, error } = await supabase
          .from("producto_detalle")
          .select("*")
          .eq("id_producto", id)
          .eq("modelo", modeloDecodificado)
          .single()

        if (error || !data) {
          console.error("Error cargando producto:", error)
          setProducto(null)
        } else {
          const productoTransformado: ProductoDetalle = {
            id_producto: data.id_producto,
            nombre_producto: data.nombre_producto,
            modelo: data.modelo,
            descripcion_corta: data.descripcion_corta ?? "Descripción no disponible.",
            precio: data.precio,
            precio_final: data.precio_final ?? data.precio,
            descuento_porcentaje: data.descuento_porcentaje ?? "",
            marca: data.marca ?? "N/A",
            nombre_color: data.nombre_color ?? "N/A",
            valor_color: data.valor_color ?? "#cccccc",
            categoria: data.categoria ?? "N/A",
            fecha: data.fecha ?? "N/A",
            cantidad_disponible: data.cantidad_disponible ?? 0,
            url_imagen: Array.isArray(data.url_imagen) ? data.url_imagen : ["/placeholder.svg"],
            especificaciones: Array.isArray(data.especificaciones)
              ? data.especificaciones
              : [
                  { clave: "Marca", valor: data.marca ?? "N/A" },
                  { clave: "Modelo", valor: data.modelo ?? "N/A" },
                  { clave: "Color", valor: data.nombre_color ?? "N/A" }
                ],
            tags: Array.isArray(data.tags) ? data.tags : ["Nuevo"]
          }
          setProducto(productoTransformado)
          setImagenActual(0)
          //borrar luego
          console.log("parametros:", { id, modelo })
          console.log("Producto cargado:", data)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      } catch (error) {
        console.error("Error:", error)
        setProducto(null)
      } finally {
        setCargando(false)
      }
    }

    if (id && modelo) {
      cargarProducto()
    }
  }, [id, modelo])

  if (cargando) {
    return (
      <div className="producto-detalle-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="producto-detalle-container">
        <div className="error-message">
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no está disponible.</p>
        </div>
      </div>
    )
  }


  const siguienteImagen = () => {
    setImagenActual((prev) =>
      producto.url_imagen && prev < producto.url_imagen.length - 1 ? prev + 1 : 0
    )
  }

  const anteriorImagen = () => {
    setImagenActual((prev) =>
      producto.url_imagen && prev > 0 ? prev - 1 : producto.url_imagen.length - 1
    )
  }

  return (
    <div className="producto-detalle-container">
      <div className="producto-detalle-content">
        {/* Galería de imágenes */}
        <div className="galeria-imagenes">
          <div className="imagen-principal">
            <img
              key={imagenActual}
              src={producto.url_imagen[imagenActual] || "/placeholder.svg"}
              alt={producto.nombre_producto || "Producto"}
              className="imagen-producto"
            />

            <div className="contador-imagen">
              {imagenActual + 1} / {producto.url_imagen?.length}
            </div>

            {producto.url_imagen.length > 1 && (
              <>
                <button
                  className="nav-btn prev-btn"
                  onClick={anteriorImagen}
                >
                  ←
                </button>
                <button
                  className="nav-btn next-btn"
                  onClick={siguienteImagen}
                >
                  →
                </button>
              </>
            )}
          </div>
          <div className="thumbnails">
            {producto.url_imagen?.map((imagen, index) => (
              <div key={index} className="thumbnail" onClick={() => setImagenActual(index)}>
                <img
                  src={imagen}
                  alt={`Vista ${index + 1}`}
                  className={`thumbnail ${index === imagenActual ? "active" : ""}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="info-producto">
          <div className="header-info">
            <div className="sku-disponibilidad">
              <span className="sku">Modelo: {producto.modelo}</span>
              <span className="disponibilidad">
                Disponibilidad: <span className="stock-count">{producto.cantidad_disponible}</span> en Stock
              </span>
            </div>
          </div>

          <h1 className="titulo-producto">{producto.nombre_producto}</h1>

          <div className="tags-container">
            {producto.tags.map((tag, index) => (
              <span key={index} className={`tag tag-${tag.toLowerCase().replace(/\s/g, "-")}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="precio-container">
            <span className="precio-actual">${producto.precio_final}</span>
            {producto.descuento_porcentaje && (
              <>
                <span className="precio-original">${producto.precio}</span>
                <span className="descuento-tag">{producto.descuento_porcentaje}% OFF</span>
              </>
            )}
            <span className="iva-incluido">IVA incluido</span>
          </div>

          <div className="controles-compra">
            <div className="cantidad-selector">
              <label htmlFor="cantidad">Cantidad:</label>
              <div className="cantidad-input">
                <button onClick={() => setCantidad((prev) => Math.max(1, prev - 1))} disabled={cantidad <= 1}>
                  -
                </button>
                <input
                  id="cantidad"
                  type="number"
                  value={cantidad}
                  onChange={(e) =>
                    setCantidad(Math.max(1, Math.min(producto.cantidad_disponible, parseInt(e.target.value) || 1)))
                  }
                  min="1"
                  max={producto.cantidad_disponible}
                />
                <button
                  onClick={() => setCantidad((prev) => Math.min(producto.cantidad_disponible, prev + 1))}
                  disabled={cantidad >= producto.cantidad_disponible}
                >
                  +
                </button>
              </div>
              <span className="disponibles">({producto.cantidad_disponible} disponibles)</span>
            </div>

            <button className="btn-agregar-carrito">Agregar al carrito</button>
            <button className="btn-paypal">Pagar con PayPal</button>
            <p className="envio-info">* Envíos disponibles únicamente para Quintana Roo</p>
          </div>

          {/* Especificaciones */}
          <div className="especificaciones">
            <h3>Especificaciones del producto</h3>
            <div className="specs-grid">
              {producto.especificaciones.map((spec, index) => (
                <div key={index} className="spec-item">
                  <span className="spec-key">{spec.clave}:</span>
                  <span className="spec-value">{spec.valor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}