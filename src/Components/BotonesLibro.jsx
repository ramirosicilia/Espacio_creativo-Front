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
  window.open(`/capitulo/${libro.id}`, "_blank");
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
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <button
        onClick={handleLeer}
        style={{
          backgroundColor: "#3182ce",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Leer Capítulo
      </button>

      <button
        onClick={handleFavorito}
        style={{
          backgroundColor: esFavorito ? "#a0aec0" : "#e53e3e",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {esFavorito ? "Quitar de Favoritos 💔" : "Agregar a Favoritos ❤️"}
      </button>
    </div>
  );
}
