"use client";

import React from "react";
import "./noresults.css";

interface NoResultsProps {
  mensaje?: string;
}

const NoResults: React.FC<NoResultsProps> = ({ mensaje }) => {
  return (
    <div className="noresults-container">
      <div className="noresults-icon">🔍</div>
      <h2 className="noresults-message">
        {mensaje || "No se encontraron resultados."}
      </h2>
      <p className="noresults-sub">Intenta ajustar los filtros o la búsqueda.</p>
    </div>
  );
};

export default NoResults;
