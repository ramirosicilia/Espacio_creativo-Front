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
        <h3 style={{ marginTop: "10px", fontSize: "18px", fontWeight: "600" }}>
          {libro.titulo}
        </h3>

```
    {/* Categoría y género */}
    <div style={{ display: "flex", gap: "10px", margin: "8px 0" }}>
      <span
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "12px",
        }}
      >
        {libro.categoria}
      </span>
      <span
        style={{
          backgroundColor: "#ffb100",
          color: "black",
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "12px",
        }}
      >
        {libro.genero}
      </span>
    </div>

    <p style={{ fontSize: "14px", color: "#666" }}>{libro.descripcion}</p>
    <BotonesLibro libro={libro} />
  </div>
</div>
```

  </div>
);

}
