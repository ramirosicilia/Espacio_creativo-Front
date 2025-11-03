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
      <h3 className="title-book">
        {libro.titulo}
      </h3> 
       
      <div
         className="book-container"
        >
                     <p class="libro-categoria">
                     <strong>Categoría:</strong> {libro.categoria}
                    </p>
            <p class="libro-genero">
              <strong>Género:</strong> {libro.genero}
            </p>
            <p class="libro-descripcion">
              {libro.descripcion}
            </p>
        </div>
      
   

      {/* Nueva sección de categoría y género */}
      

      <BotonesLibro libro={libro} />
    </div>
  </div>
</div>

  );
}
