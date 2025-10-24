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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        ref={cardRef}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
          maxWidth: "900px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* Imagen del libro */}
        <div
          style={{
            flexShrink: 0,
            backgroundColor: "#f8f9fa",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <img
            src={libro.imagen}
            alt={libro.titulo}
            style={{
              borderRadius: "0.75rem",
              width: "12rem",
              height: "auto",
              objectFit: "cover",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        {/* Contenido */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#343a40",
                marginBottom: "0.5rem",
              }}
            >
              {libro.titulo}
            </h3>

            <div
              style={{
                backgroundColor: "#0d6efd",
                color: "white",
                borderRadius: "0.75rem",
                padding: "0.75rem",
                marginBottom: "1rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", margin: 0 }}>
                Categoría:{" "}
                <span style={{ fontWeight: "400" }}>{libro.categoria}</span>
              </h3>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginTop: "0.5rem",
                }}
              >
                Género: <span style={{ fontWeight: "400" }}>{libro.genero}</span>
              </h3>
            </div>

            <p
              style={{
                color: "#6c757d",
                fontSize: "0.9rem",
                lineHeight: "1.6",
                marginBottom: 0,
              }}
            >
              {libro.descripcion}
            </p>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <BotonesLibro libro={libro} />
          </div>
        </div>
      </div>
    </div>
  );
};


