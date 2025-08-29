"use client";

import React, { useState, useEffect, useRef } from "react";
import "./carrusel.css";
import type { carruselData } from "@/types";
import {supabase} from "../supabaseClient";

type CarruselProps = {
  intervalo?: number;
};

const Carrusel: React.FC<CarruselProps> = ({ intervalo = 5000 }) => {
  const [listadatosCarrusel, setDatosCarrusel] = useState<carruselData[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [progreso, setProgreso] = useState(62.8);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progresoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inicioProgresoRef = useRef<number | null>(null);

  // 🔹 Función para traer datos de Supabase
  const buscarDatosCarrusel = async () => {
    const { data, error } = await supabase
      .from("carrusel")
      .select("*")
      .eq("activo", true)
      .limit(5);
    if (error) {
      console.error("Error cargando datos del carrusel:", error.message);
    } else {
      console.log("datos del carrusel cargados:", data);
      setDatosCarrusel(data || []); // Guardamos los resultados
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
        siguienteImagen();
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
    intervaloRef.current = setInterval(siguienteImagen, intervalo);
  };

  const detenerAutoPlay = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    detenerAnimacionProgreso();
  };

  // 🔹 Navegación entre diapositivas
  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev + 1) % listadatosCarrusel.length);
    reiniciarAutoPlay();
  };

  const anteriorImagen = () => {
    setIndiceActual(
      (prev) => (prev - 1 + listadatosCarrusel.length) % listadatosCarrusel.length
    );
    reiniciarAutoPlay();
  };

  const irAImagen = (index: number) => {
    if (index === indiceActual) return;
    setIndiceActual(index);
    reiniciarAutoPlay();
  };

  const reiniciarAutoPlay = () => {
    detenerAutoPlay();
    iniciarAutoPlay();
  };

  // 🔹 Efecto inicial: cargamos los datos del carrusel desde Supabase
  useEffect(() => {
    buscarDatosCarrusel(); // Llamamos a Supabase al montar el componente
  }, []);

  // 🔹 Efecto para autoplay (cuando ya hay datos cargados)
  useEffect(() => {
    if (listadatosCarrusel.length > 0) {
      iniciarAutoPlay();
      return () => detenerAutoPlay();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listadatosCarrusel]);

  // Si no hay datos cargados aún mostramos un loader
  if (listadatosCarrusel.length === 0) {
    return <div className="skeleton__carrousel :shine"></div>
  }

  const dataCarrusel = listadatosCarrusel[indiceActual];

  return (
    <section className="header_carrousel">
      <div className="header_info-wrapper">
        <div className="header_contents">
          <p>{dataCarrusel.descripcion}</p>
          <p>{dataCarrusel.descripcion_larga}</p>
          <h1>{dataCarrusel.titulo}</h1>
          <button className="btn" data-btn="cotizar">{dataCarrusel.texto_boton}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					  	<g className="artboard">
							  <rect width="28" height="6" fill="currentColor" />
							  <rect x="22" y="28" width="28" height="6" transform="rotate(-90 22 28)" fill="currentColor" />
							  <path d="M0 23.5L23.5 -6.70769e-07L28 4.5L4.5 28L0 23.5Z" fill="currentColor" />
					  	</g>
					  </svg>
          </button>
        </div>

        <div className="header_nav-wrapper">
          <div
            className="carrousel_arrow carrousel_arrow-left"
            onClick={anteriorImagen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					  	<g className="artboard">
					  		<path
								  d="M1.83627 11.1429L12.122 0.857143C12.5954 0.383756 13.3629 0.383756 13.8363 0.857143L14.6934 1.71429C15.1668 2.18767 15.1668 2.95518 14.6934 3.42857L8.05055 10.0714L21.8384 10.0714C22.5078 10.0714 23.0506 10.6141 23.0506 11.2836L23.0506 12.7164C23.0506 13.3859 22.5078 13.9286 21.8384 13.9286L8.05056 13.9286L14.6934 20.5714C15.1668 21.0448 15.1668 21.8123 14.6934 22.2857L13.8363 23.1429C13.3629 23.6162 12.5954 23.6162 12.122 23.1429L2.69341 13.7143L1.83627 12.8571C1.36288 12.3838 1.36288 11.6162 1.83627 11.1429Z"
					  			fill="currentColor" />
					  	</g>
					  </svg>
          </div>

          <ul>
            {listadatosCarrusel.map((_, index) => (
              <li key={index}>
                <button
                  className={`carrosel_dot ${
                    indiceActual === index ? "active" : ""
                  }`}
                  onClick={() => irAImagen(index)}
                  aria-label={`Ir a la imagen ${index + 1}`}
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
            onClick={siguienteImagen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					  	<g className="artboard">
					  		<path
								  d="M24.122 11.1429L13.8363 0.857143C13.3629 0.383756 12.5954 0.383756 12.122 0.857143L11.2648 1.71429C10.7915 2.18767 10.7915 2.95518 11.2648 3.42857L17.9077 10.0714L4.11988 10.0714C3.45041 10.0714 2.9077 10.6141 2.9077 11.2836L2.9077 12.7164C2.9077 13.3859 3.45041 13.9286 4.11988 13.9286L17.9077 13.9286L11.2648 20.5714C10.7915 21.0448 10.7915 21.8123 11.2648 22.2857L12.122 23.1429C12.5954 23.6162 13.3629 23.6162 13.8363 23.1429L23.2648 13.7143L24.122 12.8571C24.5954 12.3838 24.5954 11.6162 24.122 11.1429Z"
					  			fill="currentColor" />
					  	</g>
					  </svg>
          </div>
        </div>
      </div>

      <div className="header_image-wrapper">
        {listadatosCarrusel.map((data, index) => (
          <img
            key={data.id_carrusel}
            src={data.url_imagen ?? undefined}
            alt={data.titulo}
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
