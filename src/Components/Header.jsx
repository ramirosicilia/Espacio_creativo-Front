import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      
      <span className="titulo-espacio">Espacio Creativo</span>
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/favoritos" className="nav-link">Favoritos</Link>
      </nav>
    </header>
  );
}
