import LibrosCard from "../Components/LibrosCard";

export default function Favoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  return (
    <div  className="container-favoritos">
      <h2 className="libros-destacados">Tus Favoritos ❤️</h2>
      <div className="contenedor-favoritos">
        {favoritos.length > 0 ? (
          favoritos.map((libro) => <LibrosCard key={libro.id} libro={libro} />)
        ) : (
          <p className="favoritos-vacios">No tienes libros en favoritos aún.</p>
        )}
      </div>
    </div>
  );
}
