import LibrosCard from "../Components/LibrosCard";

export default function Favoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  return (
    <div style={{ padding: "20px 40px" }}>
      <h2 className="libros-destacados">Tus Favoritos ❤️</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {favoritos.length > 0 ? (
          favoritos.map((libro) => <LibrosCard key={libro.id} libro={libro} />)
        ) : (
          <p>No tienes libros en favoritos aún.</p>
        )}
      </div>
    </div>
  );
}
