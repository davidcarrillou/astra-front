
import "./App.css"; // Archivo CSS clásico
import Encabezado from "./components/header";
import Carrusel from "./components/Carrusel";

export default function App() {
  return (
  <div>
    <Encabezado />
    <main>
      <Carrusel />
    </main>
  </div>
  );
}
