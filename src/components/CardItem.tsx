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
          {item.tags?.map((tag, index) => (
            <div key={index} data-product-badge={tag}>
              <div className={`badge-container ${tag.toLowerCase().replace(/\s/g, "-")}`}>
                <span>{tag}</span>
              </div>
            </div>
          ))}

          {/* Modelo */}
          <div data-product-model>
            <strong data-model={item.marca} aria-label={item.marca} />
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
                  <span>${item.precio}</span>
                  <span>{item.descuento_porcentaje}%</span>
                </div>
              )}
            </div>

            {/* <div className={`stock-indicator ${item.cantidad_disponible > 0 ? "disponible" : "agotado"}`}>
              {item.cantidad_disponible > 0 ? "Disponible" : "Sin stock"}
            </div> */}

            <div data-shopcard-add>
              Agregar al carrito
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
