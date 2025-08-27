
import "./App.css"; // Archivo CSS clásico
import Encabezado from "./components/header";

export default function App() {
  return (<div>
    <div>
      <Encabezado />
      <main>
        <h2>Bienvenido a Astra CCTV</h2>
        <p>Aquí encontrarás cámaras, paquetes y accesorios de videovigilancia.</p>
      </main>
    </div>
  </div>);
}
