"use client";

import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import "./notdata.css";

type BaseProps<T> = {
  mensajeError?: string;
  mensajeNoResultados?: string;
  loadingText?: string;
  retryText?: string;
  renderProductos: (productos: T[]) => ReactNode;
};

// Modo CONTROLADO: el padre controla productos/cargando/error
type ControlledProps<T> = BaseProps<T> & {
  productos: T[];
  cargando: boolean;
  error: string | null;
  fetchProductos?: never;
  deps?: never;
};

// Modo AUTÓNOMO: NotData hace el fetch y maneja loading/error/retry
type UncontrolledProps<T> = BaseProps<T> & {
  fetchProductos: () => Promise<T[]>;
  /** Cambia esto para que NotData refetchee (por ejemplo, [filtros, busqueda]) */
  deps?: unknown[];
  productos?: never;
  cargando?: never;
  error?: never;
};

type NotDataProps<T> = ControlledProps<T> | UncontrolledProps<T>;

export default function NotData<T>(props: NotDataProps<T>) {
  const usingFetch = "fetchProductos" in props;

  // Estado local solo si estamos en modo autónomo
  const [localProductos, setLocalProductos] = useState<T[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(usingFetch);
  const [localError, setLocalError] = useState<string | null>(null);
  const [reintentando, setReintentando] = useState(false);

  // Normalizamos para renderizar
  const loading = usingFetch ? localLoading : (props as ControlledProps<T>).cargando;
  const error = usingFetch ? localError : (props as ControlledProps<T>).error;
  const productos = usingFetch ? localProductos : (props as ControlledProps<T>).productos;

  const {
    mensajeError = "Ocurrió un error al cargar los productos.",
    mensajeNoResultados = "No se encontraron productos con los filtros seleccionados.",
    loadingText = "Cargando productos…",
    retryText = "Reintentar",
    renderProductos,
  } = props as BaseProps<T>;

  const cargar = async () => {
    if (!usingFetch) return;
    try {
      setLocalLoading(true);
      setLocalError(null);
      const data = await (props as UncontrolledProps<T>).fetchProductos();
      setLocalProductos(data ?? []);
    } catch {
      setLocalError(mensajeError);
      setLocalProductos([]);
    } finally {
      setLocalLoading(false);
    }
  };

  // Carga inicial y refetch al cambiar deps (filtros/búsqueda)
  useEffect(() => {
    if (usingFetch) cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, usingFetch ? (props as UncontrolledProps<T>).deps ?? [] : []);

  const handleRetry = async () => {
    if (!usingFetch) return;
    setReintentando(true);
    await cargar();
    setReintentando(false);
  };

  // UI
  if (loading) {
    return (
      <div className="notdata-container">
        <div className="notdata-icon">⏳</div>
        <h2 className="notdata-message">{loadingText}</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notdata-container">
        <div className="notdata-icon">⚠️</div>
        <h2 className="notdata-message">{mensajeError}</h2>
        <p className="notdata-sub">Intenta nuevamente más tarde.</p>

        {usingFetch && (
          <button className="notdata-button" onClick={handleRetry} disabled={reintentando}>
            <span className="btn-text">{reintentando ? "Cargando..." : retryText}</span>
            {reintentando && <span className="loader" aria-hidden="true" />}
          </button>
        )}
      </div>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <div className="notdata-container">
        <div className="notdata-icon">🔍</div>
        <h2 className="notdata-message">{mensajeNoResultados}</h2>
        <p className="notdata-sub">Intenta ajustar los filtros o la búsqueda.</p>

        {usingFetch && (
          <button className="notdata-button" onClick={handleRetry} disabled={reintentando}>
            <span className="btn-text">{reintentando ? "Cargando..." : retryText}</span>
            {reintentando && <span className="loader" aria-hidden="true" />}
          </button>
        )}
      </div>
    );
  }

  return <>{renderProductos(productos)}</>;
}
