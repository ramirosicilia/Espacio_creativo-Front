import BotonesLibro from "./BotonesLibro";

import { useEffect, useRef } from "react";

export default function LibrosCard({ libro }) {
  const cardRef = useRef();
  const [verMas, setVerMas] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // 🔹 Acorta el texto a 280 caracteres (podés ajustar)
  const textoCorto = libro.descripcion.slice(0, 280);

  return (
    <div className="libro-card-container">
      <div className="libro-card" ref={cardRef}>
        <img src={libro.imagen} alt={libro.titulo} />
        <div className="container-text-card">
          <h3 className="title-book">{libro.titulo}</h3>

          <div className="book-container">
            <p className="libro-categoria">
              <strong>Categoría:</strong> {libro.categoria}
            </p>
            <p className="libro-genero">
              <strong>Género:</strong> {libro.genero}
            </p>

            <p className="libro-descripcion">
              {verMas ? libro.descripcion : `${textoCorto}... `}
              <span
                onClick={() => setVerMas(!verMas)}
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {verMas ? "Ver menos" : "Ver más"}
              </span>
            </p>
          </div>

          {/* 🔹 Los botones quedan siempre visibles */}
          <BotonesLibro libro={libro} />
        </div>
      </div>
    </div>
  );
}