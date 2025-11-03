import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BotonesLibro({ libro }) {
  const location = useLocation();
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const existe = favoritos.some((f) => f.id === libro.id);
    setEsFavorito(existe);
  }, [libro.id]);

  // ✅ Abre el capítulo en una nueva pestaña y pasa el libro en localStorage
  const handleLeer = () => {
  if (!libro || !libro.id) {
    console.error("⚠️ No se puede abrir el capítulo: libro o id no definido.", libro);
    alert("Este libro no tiene un capítulo disponible todavía.");
    return;
  }

  localStorage.setItem("libroActual", JSON.stringify(libro));
window.open(`/capitulo/${libro.categoria}/${libro.id}`, "_blank");

};

  const handleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const existe = favoritos.some((f) => f.id === libro.id);

    if (!existe) {
      favoritos.push(libro);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      setEsFavorito(true);
      alert("Agregado a favoritos ❤️");
    } else {
      const nuevosFavoritos = favoritos.filter((f) => f.id !== libro.id);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      setEsFavorito(false);
      alert("Eliminado de favoritos 💔");

      if (location.pathname === "/favoritos") {
        window.location.reload();
      }
    }
  };

  return (
  <div className="acciones-container">
    <button onClick={handleLeer} className="boton-accion boton-leer">
      Leer Capítulo
    </button>

    <button
      onClick={handleFavorito}
      className={`boton-accion boton-favorito ${
        esFavorito ? "favorito-activo" : ""
      }`}
    >
      {esFavorito ? "Quitar de Favoritos 💔" : "Agregar a Favoritos ❤️"}
    </button>
  </div>
);

}
