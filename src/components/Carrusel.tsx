"use client";

import React, { useState, useEffect, useRef } from "react";
import "./carrusel.css";

type Diapositiva = {
  imagen: string;
  texto1: string;
  texto2: string;
  titulo: string;
  textoBoton: string;
};

type CarruselProps = {
  diapositivas?: Diapositiva[];
  intervalo?: number;
};

const Carrusel: React.FC<CarruselProps> = ({
  diapositivas = [
    {
      imagen: "../src/assets/flyer_comp.webp",
      texto1: "Instalación Rápida y Profesional.",
      texto2: "Costes Accesibles para hogares y pequeños negocios.",
      titulo: "CCTV, Sistemas de Videovigilancia.",
      textoBoton: "Cotiza Ahora!",
    },
    {
      imagen: "/_images/7UjPhg8eaKKRwvvGNDCupg0p.webp",
      texto1: "Tecnología de última generación",
      texto2: "Soluciones adaptadas a tus necesidades",
      titulo: "Seguridad 24/7",
      textoBoton: "Ver Productos",
    },
    {
      imagen: "/_images/vgnQfETQVpYNxLvxUdTfAnFv.webp",
      texto1: "Monitoreo remoto",
      texto2: "Acceso desde cualquier dispositivo",
      titulo: "Control Total",
      textoBoton: "Más Información",
    },
  ],
  intervalo = 5000,
}) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [progreso, setProgreso] = useState(62.8);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);
  const progresoRef = useRef<NodeJS.Timeout | null>(null);
  const inicioProgresoRef = useRef<number | null>(null);

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

  useEffect(() => {
    iniciarAutoPlay();
    return () => detenerAutoPlay();
  }, []);

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
          <div className="carrousel_arrow carrousel_arrow-left" onClick={anteriorDiapositiva}>
            ◀
          </div>

          <ul>
            {diapositivas.map((_, index) => (
              <li key={index}>
                <button
                  className={`carrosel_dot ${indiceActual === index ? "active" : ""}`}
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

          <div className="carrousel_arrow carrousel_arrow-right" onClick={siguienteDiapositiva}>
            ▶
          </div>
        </div>
      </div>

      <div className="header_image-wrapper">
        {diapositivas.map((slide, index) => (
          <img
            key={index}
            src={slide.imagen}
            alt={slide.titulo}
            className={`header_image ${indiceActual === index ? "active" : ""}`}
            loading="eager"
          />
        ))}
      </div>
    </section>
  );
};

export default Carrusel;
