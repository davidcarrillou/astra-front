import React from "react";
import "./header.css";
import Carrusel from "./Carrusel";

const Encabezado: React.FC = () => {
   return (
     <header style={styles.header}>
      {/* 🔹 Logo y menú */}
      <div style={styles.topBar}>
        <h1 style={styles.logo}>Astra CCTV</h1>
        <nav style={styles.nav}>
          <a href="#catalogo" style={styles.link}>Catálogo</a>
          <a href="#paquetes" style={styles.link}>Paquetes</a>
          <a href="#accesorios" style={styles.link}>Accesorios</a>
          <a href="#cotizaciones" style={styles.link}>Cotizaciones</a>
        </nav>
      </div>

      {/* 🔹 Carrusel importado */}
      <Carrusel />
    </header>
  );
};
// 🎨 Estilos inline (puedes moverlos a CSS si prefieres)
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    width: "100%",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
  },
};
export default Encabezado;
