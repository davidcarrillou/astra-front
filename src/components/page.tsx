import React from 'react';

// Definición del tipo de props que recibirá el componente Page
export type PageProps = {
    titulo: string;       // Título de la página
    descripcion: string;  // Descripción de la página
    completado: boolean;  // Estado de completado
};

// Componente funcional que muestra el título, descripción y estado de completado
export const Page: React.FC<PageProps> = ({ titulo, descripcion, completado }) => (
    <div>
        <input type="checkbox" checked={completado} readOnly aria-hidden="true"/>
        <div>
            <h2>{titulo}</h2>
            <p>{descripcion}</p>
            <p>{completado ? "✅ Completado" : "⏳ Pendiente"}</p>
        </div>
    </div>
);