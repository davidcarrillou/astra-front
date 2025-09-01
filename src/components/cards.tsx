import React from "react";
import "./cards.css";
import type { itemCatalogo } from "@/types";
interface itemProductoProps {
  itemProducto: itemCatalogo[];
}


const Cards: React.FC<itemProductoProps> = ({ itemProducto }) => {
  if (!itemProducto || itemProducto.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="cards">
      {itemProducto.map((item) => (
        <article key={item.id_catalogo}>
          <a href="#">
            {/* Contenedor superior */}
            <div
              data-product-top
              title={`${item.nombre_producto} - ${item.modelo}`}
              aria-description={`${item.nombre_producto} - ${item.modelo}`}
            >
              {/* Badge dinámico */}
              {item.estado  && (
                <div data-product-badge={item.estado}>
                  <div className="badge-container">
                    <span>{item.estado}</span>
                  </div>
                </div>
              )}

              {/* Modelo */}
              <div data-product-model>
                <strong data-model={item.nombre_producto} aria-label={item.nombre_producto} />
                <span>{item.modelo}</span>
              </div>

              {/* Imagen */}
              {item.url_imagen && (
                <img
                  src={item.url_imagen?.[0] || "/img/default-product.jpg"}
                  alt={item.nombre_producto}
                  loading="lazy"
                />
              )}
            </div>

            {/* Contenedor inferior */}
            <div data-product-info>
              <h2 title={item.nombre_producto} className=":nll-clamp">
                {item.nombre_producto}
              </h2>

              <div data-product-details>
                <div data-product-price>
                  <div className="product-og-price">
                    <span>
                      ${calcularPrecioFinal(item.precio, item.descuento)}
                    </span>
                  </div>
                  {item.descuento && (
                    <div className="product-old-price">
                      <span className="tachado">
                        ${item.precio}
                      </span>
                    </div>
                  )}
                </div>
                <button type="button" tabIndex={-1}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
};

export default Cards;


const calcularPrecioFinal = (precio: number, descuento: string | null): number => {
  if (!descuento) return precio;
  const match = descuento.match(/\((\d+(\.\d+)?)%\)/);
  const porcentaje = match ? parseFloat(match[1]) : 0;
  return +(precio - (precio * porcentaje / 100)).toFixed(2);
};