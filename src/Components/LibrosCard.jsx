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
       
      <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding:".4rem 0px"
          }}
        >
          <p style={{ fontSize: "13px", color: "#444", margin: "2px 0" }}>
            <strong>Categoría:</strong> {libro.categoria}
          </p>
          <p style={{ fontSize: "13px", color: "#444", margin: "2px 0" }}>
            <strong>Género:</strong> {libro.genero} 
          </p> 
          <p style={{ fontSize: "14px", color: "#666" }}>{libro.descripcion}</p>
        </div>
      
   

      {/* Nueva sección de categoría y género */}
      

      <BotonesLibro libro={libro} />
    </div>
  </div>
</div>

  );
}
