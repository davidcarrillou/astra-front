import React from "react";
import "./cards.css";
import type { cardData } from "@/types";
interface CardsProps {
  cards: cardData[];
}

/**
 * Componente Cards
 * ----------------
 * - Recibe un array de cards por props
 * - Renderiza cada tarjeta con título, modelo, imagen, precios y botón
 * - Totalmente desacoplado de la BD
 */
const Cards: React.FC<CardsProps> = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="cards">
      {cards.map((card) => (
        <article key={card.id_card}>
          <a href="#">
            {/* Contenedor superior */}
            <div
              data-product-top
              title={`${card.titulo} - ${card.modelo}`}
              aria-description={`${card.titulo} - ${card.modelo}`}
            >
              {/* Badge dinámico */}
              {card.tipo_insignia && card.valor_insignia && (
                <div data-product-badge={card.tipo_insignia}>
                  <div className="badge-container">
                    <span>{card.valor_insignia}</span>
                  </div>
                </div>
              )}

              {/* Modelo */}
              <div data-product-model>
                <strong data-model={card.titulo} aria-label={card.titulo} />
                <span>{card.modelo}</span>
              </div>

              {/* Imagen */}
              {card.url_imagen && (
                <img
                  src={card.url_imagen}
                  alt={card.titulo}
                  loading="lazy"
                />
              )}
            </div>

            {/* Contenedor inferior */}
            <div data-product-info>
              <h2 title={card.titulo} className=":nll-clamp">
                {card.titulo}
              </h2>

              <div data-product-details>
                <div data-product-price>
                  <div className="product-og-price">
                    <span>${card.precio_original}</span>
                  </div>

                  {card.precio_anterior && (
                    <div className="product-old-price">
                      <span>${card.precio_anterior}</span>
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
