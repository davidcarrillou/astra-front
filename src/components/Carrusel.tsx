"use client";

import React, { useState, useEffect, useRef } from "react";
import "./carrusel.css";
import { createClient } from "@supabase/supabase-js"; // Importamos cliente de Supabase

// Definimos el tipo de dato que esperas de Supabase
type Diapositiva = {
  id: number;          // 👈 importante tener un id único en la tabla
  imagen: string;
  texto1: string;
  texto2: string;
  titulo: string;
  textoBoton: string;
};

type CarruselProps = {
  intervalo?: number;
};

// Creamos cliente de Supabase con tus variables de entorno
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

const Carrusel: React.FC<CarruselProps> = ({ intervalo = 5000 }) => {
  const [diapositivas, setDiapositivas] = useState<Diapositiva[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [progreso, setProgreso] = useState(62.8);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progresoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inicioProgresoRef = useRef<number | null>(null);

  // 🔹 Función para traer datos de Supabase
  const fetchDiapositivas = async () => {
    const { data, error } = await supabase.from("diapositivas").select("*");
    if (error) {
      console.error("Error cargando diapositivas:", error.message);
    } else {
      setDiapositivas(data || []); // Guardamos los resultados
    }
  };

  // 🔹 Animación del círculo de progreso
  const iniciarAnimacionProgreso = () => {
    detenerAnimacionProgreso();
    setProgreso(62.8);
    inicioProgresoRef.current = Date.now();

    progresoRef.current = setInterval(() => {
      const transcurrido = Date.now() - (inicioProgresoRef.current ?? 0);
      const avance = Math.min(transcurrido / intervalo, 1);
      setProgreso(62.8 * (1 - avance));

      if (avance >= 1) {
        siguienteDiapositiva();
      }
    }, 50);
  };

  const detenerAnimacionProgreso = () => {
    if (progresoRef.current) {
      clearInterval(progresoRef.current);
      progresoRef.current = null;
    }
  };

  // 🔹 Control de autoplay
  const iniciarAutoPlay = () => {
    detenerAutoPlay();
    iniciarAnimacionProgreso();
    intervaloRef.current = setInterval(siguienteDiapositiva, intervalo);
  };

  const detenerAutoPlay = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    detenerAnimacionProgreso();
  };

  // 🔹 Navegación entre diapositivas
  const siguienteDiapositiva = () => {
    setIndiceActual((prev) => (prev + 1) % diapositivas.length);
    reiniciarAutoPlay();
  };

  const anteriorDiapositiva = () => {
    setIndiceActual(
      (prev) => (prev - 1 + diapositivas.length) % diapositivas.length
    );
    reiniciarAutoPlay();
  };

  const irADiapositiva = (index: number) => {
    if (index === indiceActual) return;
    setIndiceActual(index);
    reiniciarAutoPlay();
  };

  const reiniciarAutoPlay = () => {
    detenerAutoPlay();
    iniciarAutoPlay();
  };

  // 🔹 Efecto inicial: cargamos diapositivas desde Supabase
  useEffect(() => {
    fetchDiapositivas(); // Llamamos a Supabase al montar el componente
  }, []);

  // 🔹 Efecto para autoplay (cuando ya hay datos cargados)
  useEffect(() => {
    if (diapositivas.length > 0) {
      iniciarAutoPlay();
      return () => detenerAutoPlay();
    }
  }, [diapositivas]);

  // Si no hay diapositivas cargadas aún mostramos un loader
  if (diapositivas.length === 0) {
    return <p>Cargando carrusel...</p>;
  }

  const diapositivaActual = diapositivas[indiceActual];

  return (
    <section className="header_carrousel">
      <div className="header_info-wrapper">
        <div className="header_contents">
          <p>{diapositivaActual.texto1}</p>
          <p>{diapositivaActual.texto2}</p>
          <h1>{diapositivaActual.titulo}</h1>
          <button data-btn="cotizar">{diapositivaActual.textoBoton}</button>
        </div>

        <div className="header_nav-wrapper">
          <div
            className="carrousel_arrow carrousel_arrow-left"
            onClick={anteriorDiapositiva}
          >
            ◀
          </div>

          <ul>
            {diapositivas.map((_, index) => (
              <li key={index}>
                <button
                  className={`carrosel_dot ${
                    indiceActual === index ? "active" : ""
                  }`}
                  onClick={() => irADiapositiva(index)}
                  aria-label={`Ir a la diapositiva ${index + 1}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle
                      className="progress-bar"
                      cx="12"
                      cy="12"
                      r="10"
                      strokeDasharray="62.8"
                      style={{
                        strokeDashoffset:
                          indiceActual === index ? progreso : 62.8,
                      }}
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div
            className="carrousel_arrow carrousel_arrow-right"
            onClick={siguienteDiapositiva}
          >
            ▶
          </div>
        </div>
      </div>

      <div className="header_image-wrapper">
        {diapositivas.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.imagen}
            alt={slide.titulo}
            className={`header_image ${
              indiceActual === index ? "active" : ""
            }`}
            loading="eager"
          />
        ))}
      </div>
    </section>
  );
};

export default Carrusel;
