import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Encabezado from "./components/header"
import Carrusel from "./components/Carrusel"
import { NotFound } from "./pages/NotFound"
import Productos from "./pages/productos"
import DetalleProducto from "./pages/detalleProducto"
import Contacto from "./pages/contacto"

export default function App() {
  return (
    <Router>
      <Encabezado /> {/* Siempre visible */}
      <main>
        <Routes>
          {/* Página principal */}
          <Route
            path="/"
            element={
              <>
                <Carrusel />
                <div className="contents">
                  <h1>Bienvenido a la tienda</h1>
                </div>
              </>
            }
          />

          {/* Catálogo de productos */}
          <Route path="/products" element={<Productos />} />
          <Route path="/contact" element={<Contacto />} />

          {/* Página de detalle de producto */}
          <Route path="/products/:id/:modelo" element={<DetalleProducto />} />

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  )
}
