
import "./App.css"; // Archivo CSS clásico
import { Page } from "./components/page";
import Encabezado from "./components/header";

// Datos de ejemplo para el catálogo
const products = [
  {
    id: 1,
    name: "Cámara IP Hikvision 2MP",
    category: "Cámaras",
    price: "$1,500 MXN",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "DVR 8 Canales Dahua",
    category: "Accesorios",
    price: "$2,800 MXN",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Paquete 4 Cámaras + DVR",
    category: "Paquetes",
    price: "$6,500 MXN",
    image: "https://via.placeholder.com/300x200",
  },
];

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
  /*const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", "Cámaras", "Paquetes", "Accesorios"];

  const filteredProducts =
    filter === "Todos"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <div className="app-container">
      {// Header /}
      <header className="header">
        <h1 className="logo">AstraCCTV</h1>
        <nav className="nav">
          <a href="#catalogo">Catálogo</a>
          <a href="#paquetes">Paquetes</a>
          <a href="#cotizacion">Cotización</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      {// Hero /}
      <section className="hero">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Protege tu hogar y negocio
        </motion.h2>
        <p className="hero-subtitle">Sistemas de videovigilancia confiables y modernos</p>
        <button className="btn-primary">Ver catálogo</button>
      </section>

      {// Catálogo //}
      <section id="catalogo" className="catalogo">
        <h3 className="section-title">Catálogo de productos</h3>

        {// Filtros //}
        <div className="filtros">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn-filter ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {// Productos //}
        <div className="grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img"
              />
              <div className="card-content">
                <h4 className="card-title">{product.name}</h4>
                <p className="card-category">{product.category}</p>
                <p className="card-price">{product.price}</p>
                <button className="btn-secondary">Cotizar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {// Footer //}
      <footer id="contacto" className="footer">
        <p>© 2025 AstraCCTV - Todos los derechos reservados</p>
        <div className="footer-icons">
          <Phone />
          <Camera />
          <Package />
          <Wrench />
        </div>
      </footer>

      {// Botón flotante de WhatsApp //}
      <a
        href="https://wa.me/5219999999999" // Cambiar por tu número de WhatsApp
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        💬
      </a>
    </div>
  );*/
}
