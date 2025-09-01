import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/header";
import Carrusel from "./components/Carrusel";
import { Productos } from "./pages/productos";


export default function App() {
  return (
    <Router>
      <Encabezado /> {/* siempre se muestra */}
      <main>
        <Routes>
          {/* Página principal */}
          <Route
            path="/"
            element={
              <>
                <Carrusel />
                <div className="contents">
                  
                </div>
              </>
            }
          />

          {/* Página de productos */}
          <Route path="/products" element={<Productos />} />
        </Routes>
      </main>
    </Router>
  );
}
