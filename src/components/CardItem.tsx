import React from "react"
import "./cards.css"
import type { itemCatalogo } from "@/types"
import { Link } from "react-router-dom"

interface CardItemProps {
  item: itemCatalogo
}

export const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const modeloUri = encodeURIComponent(item.modelo ?? "sin-modelo")
  const productoUri = `${item.id_catalogo}`

  return (
    <article key={item.id_catalogo} className="card-item">
      <Link to={`/products/${productoUri}/${modeloUri}`}>
        <div
          data-product-top
          title={`${item.nombre_producto} - ${item.modelo}`}
          aria-description={`${item.nombre_producto} - ${item.modelo}`}
        >
          {/* Badges dinámicos desde tags */}
          {item.tags?.map((tag, i) => (
            <div key={i} data-product-badge={tag}>
              <div className={`badge-container ${tag.toLowerCase().replace(/\s/g, "-")}`}>
                <span>{tag}</span>
              </div>
            </div>
          ))}

          {/* Modelo */}
          <div data-product-model>
            <strong data-model={item.nombre_producto} aria-label={item.nombre_producto} />
            <span>{item.modelo}</span>
          </div>

          {/* Imagen */}
          <img
            src={item.imagen_principal || "/img/default-product.jpg"}
            alt={item.nombre_producto}
            loading="lazy"
          />
        </div>

        {/* Contenedor inferior */}
        <div data-product-info>
          <h2 title={item.nombre_producto} className=":nll-clamp">
            {item.nombre_producto}
          </h2>

          <div data-product-details>
            <div data-product-price>
              <div className="product-og-price">
                <span>${item.precio_final}</span>
              </div>

              {item.descuento_porcentaje && (
                <div className="product-old-price">
                  <span className="tachado">${item.precio}</span>
                  <span className="descuento">{item.descuento_porcentaje}% OFF</span>
                </div>
              )}
            </div>

            <div className={`stock-indicator ${item.cantidad_disponible > 0 ? "disponible" : "agotado"}`}>
              {item.cantidad_disponible > 0 ? "Disponible" : "Sin stock"}
            </div>

            <button type="button" tabIndex={-1}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </Link>
    </article>
  )
}
