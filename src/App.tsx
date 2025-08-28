
import "./App.css"; // Archivo CSS clásico
import Encabezado from "./components/header";
import Carrusel from "./components/Carrusel";
import Cards from "./components/cards";

export default function App() {
  return (
  <div>
    <Encabezado />
    <main>
      <Carrusel />
      <div className="contents">  {/* COLOCAR AQUI TODAS LAS SECCIONES QUE SE REQUIERAN */}
        <section className="top_products">
          <h2>Productos</h2>
          <Cards />
        </section>
      </div>
    </main>
    {/* FOOTER DE LA PAGINA */}
  </div>
  );
}
