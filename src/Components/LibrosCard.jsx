import BotonesLibro from "./BotonesLibro";

import { useEffect, useRef } from "react";

export default function LibrosCard({ libro }) {
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Deja de observar una vez visible
          }
        });
      },
      { threshold: 0.2 } // 20% visible para activar
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
  <div className="libro-card-container">
    <div className="libro-card" ref={cardRef}>
      <img src={libro.imagen} alt={libro.titulo} />

      <div className="container-text-card">
        <h3
          style={{
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#fff",
          }}
        >
          {libro.titulo}
        </h3>

        {/* 🔹 Categoría y Género */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "6px 0 10px",
            fontSize: "13px",
            color: "#aaa",
          }}
        >
          <span
            style={{
              background: "#222",
              padding: "4px 10px",
              borderRadius: "8px",
              color: "#00bcd4",
              fontWeight: 500,
            }}
          >
            {libro.categoria}
          </span>
          <span
            style={{
              background: "#333",
              padding: "4px 10px",
              borderRadius: "8px",
              color: "#ffb74d",
              fontWeight: 500,
            }}
          >
            {libro.genero}
          </span>
        </div>

        <p
          style={{
            fontSize: "14px",
            color: "#ccc",
            lineHeight: "1.5",
            marginBottom: "12px",
          }}
        >
          {libro.descripcion}
        </p>

        <BotonesLibro libro={libro} />
      </div>
    </div>
  </div>
);

}
