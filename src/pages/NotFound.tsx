import "./notfound.css"
import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <p>Ups... no encontramos lo que buscabas.</p>
        <img src="/img/404-robot.svg" alt="Página no encontrada" />
        <Link to="/" className="btn-volver">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
