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

  <div className="libro-card-container flex justify-center p-6">
    <div
      className="libro-card flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl transition-transform duration-300 hover:scale-[1.02]"
      ref={cardRef}
    >
      {/* Imagen del libro */}
      <div className="flex-shrink-0 bg-gray-100 flex justify-center items-center p-4">
        <img
          src={libro.imagen}
          alt={libro.titulo}
          className="rounded-xl w-48 h-auto object-cover shadow-md"
        />
      </div>

```
  {/* Contenido */}
  <div className="container-text-card flex flex-col justify-between p-6">
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        {libro.titulo}
      </h3>

      <div className="genero-container bg-blue-600 text-white rounded-xl p-3 mb-4 shadow-sm">
        <h3 className="text-lg font-semibold">
          Categoría: <span className="font-normal">{libro.categoria}</span>
        </h3>
        <h3 className="text-lg font-semibold mt-1">
          Género: <span className="font-normal">{libro.genero}</span>
        </h3>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        {libro.descripcion}
      </p>
    </div>

    <div className="mt-6">
      <BotonesLibro libro={libro} />
    </div>
  </div>
</div>
```

  </div>
);

}
