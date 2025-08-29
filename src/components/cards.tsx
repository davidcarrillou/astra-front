import React, { useEffect, useState } from "react";
import "./cards.css";
import type { cardData } from "@/types";
// 🔑 Configuración del cliente de Supabase
import {supabase} from "../supabaseClient";

/**
 * Componente Cards
 * ----------------
 * - Carga las tarjetas (productos/animes/series) desde la base de datos Supabase
 * - Filtra solo los que están activos (`activo = true`)
 * - Renderiza una grilla de cards con título, modelo, imagen, precios y botón
 */
const Cards: React.FC = () => {
  // Estado con la lista de cards que llegan de la BD
  const [cards, setCards] = useState<cardData[]>([]);

  // Estado para manejar la carga inicial (spinner/mensaje)
  const [loading, setLoading] = useState(true);

  /**
   * useEffect → Hook de React que se ejecuta al montar el componente
   * Se encarga de llamar a Supabase y traer los registros de la tabla `cards`.
   */
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);

      // Consulta a la tabla "cards" en Supabase
      const { data, error } = await supabase
        .from("cards")     // 👈 Nombre de la tabla en la BD
        .select("*")       // Selecciona todas las columnas
        .eq("activo", true); // Filtra solo los registros activos

      if (error) {
        // En caso de error en la query lo mostramos en consola
        console.error("Error cargando los datos de cards:", error.message);
      } else {
        // Si no hay error, guardamos los resultados en el estado
        setCards(data || []);
      }

      setLoading(false);
    };

    fetchCards();
  }, []); // 👈 se ejecuta solo una vez al cargar el componente

  // 🌀 Renderizado condicional mientras se cargan los datos
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  // 🚫 Renderizado condicional si no hay resultados
  if (cards.length === 0) {
    return <p>No hay productos disponibles en este momento.</p>;
  }

  // 🎨 Render principal de las cards
  return (
    <div className="cards">
      {cards.map((card) => (
        <article key={card.id_card}>
          <a href="#">
            {/* PRODUCT TOP → Contenedor superior de la tarjeta */}
            <div
              data-product-top
              title={`${card.titulo} - ${card.modelo}`} // Tooltip accesible
              aria-description={`${card.titulo} - ${card.modelo}`} // Descripción accesible
            >
              {/* BADGE dinámico (ej. "Nuevo", "Oferta", etc.) */}
              {card.tipo_insignia && card.valor_insignia && (
                <div data-product-badge={card.tipo_insignia}>
                  <div className="badge-container">
                    <span>{card.valor_insignia}</span>
                  </div>
                </div>
              )}

              {/* Modelo (título + referencia del producto) */}
              <div data-product-model>
                <strong data-model={card.titulo} aria-label={card.titulo} />
                <span>{card.modelo}</span>
              </div>

              {/* Imagen principal del producto */}
              {card.url_imagen && (
                <img
                  src={card.url_imagen}
                  alt={card.titulo}
                  loading="lazy" // ⚡️ Lazy loading para optimizar performance
                />
              )}
            </div>

            {/* PRODUCT INFO → Contenedor inferior con detalles */}
            <div data-product-info>
              {/* Nombre/Título */}
              <h2 title={card.titulo} className=":nll-clamp">
                {card.titulo}
              </h2>

              {/* Bloque de precios y botón */}
              <div data-product-details>
                {/* Precio actual */}
                <div data-product-price>
                  <div className="product-og-price">
                    <span>${card.precio_original}</span>
                  </div>

                  {/* Precio antiguo (si existe en BD) */}
                  {card.precio_anterior && (
                    <div className="product-old-price">
                      <span>${card.precio_anterior}</span>
                    </div>
                  )}
                </div>

                {/* CTA → Botón de acción */}
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