"use client"

import type React from "react"
import "./cards.css"
import type { itemCatalogo } from "@/types"
import { Link } from "react-router-dom"

interface itemProductoProps {
  datosProductos: itemCatalogo
}

const Cards: React.FC<itemProductoProps> = ({ datosProductos }) => {
  if (!datosProductos) {
    return <p>No hay producto disponible.</p>
  }

  const productoSlug = datosProductos.modelo || `producto-${datosProductos.id_catalogo}`

  return (
    <div className="cards">
      <article key={datosProductos.id_catalogo}>
        <Link to={`/products/${productoSlug}`}>
          <div
            data-product-top
            title={`${datosProductos.nombre_producto} - ${datosProductos.modelo}`}
            aria-description={`${datosProductos.nombre_producto} - ${datosProductos.modelo}`}
          >
            {datosProductos.estado && (
              <div data-product-badge={datosProductos.estado}>
                <div className="badge-container">
                  <span>{datosProductos.estado}</span>
                </div>
              </div>
            )}

            <div data-product-model>
              <strong data-model={datosProductos.nombre_producto} aria-label={datosProductos.nombre_producto} />
              <span>{datosProductos.modelo}</span>
            </div>

            {datosProductos.url_imagen && (
              <img
                src={datosProductos.url_imagen?.[0] || "/img/default-product.jpg"}
                alt={datosProductos.nombre_producto}
                loading="lazy"
              />
            )}
          </div>

          <div data-product-info>
            <h2 title={datosProductos.nombre_producto} className="nll-clamp">
              {datosProductos.nombre_producto}
            </h2>

            <div data-product-details>
              <div data-product-price>
                <div className="product-og-price">
                  <span>${calcularPrecioFinal(datosProductos.precio, datosProductos.descuento)}</span>
                </div>
                {datosProductos.descuento && (
                  <div className="product-old-price">
                    <span className="tachado">${datosProductos.precio}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Add to cart logic here
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </Link>
      </article>
    </div>
  )
}

const calcularPrecioFinal = (precio: number | null, descuento: string | null): number => {
  if (!precio || !descuento) return precio || 0
  const match = descuento.match(/(\d+(\.\d+)?)%/)
  const porcentaje = match ? Number.parseFloat(match[1]) : 0
  return +(precio - (precio * porcentaje) / 100).toFixed(2)
}

export default Cards
