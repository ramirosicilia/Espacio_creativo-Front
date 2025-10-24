// src/components/Capitulos.jsx
import { useParams, useNavigate } from "react-router-dom"; // 👈 agrega useNavigate
import { useEffect, useState } from "react";
import { obtenerCapituloPorLibro } from "../helper/dataLibro";
import "../styles/global.css";

export default function Capitulos() {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 para navegar a otro componente
  const [capitulo, setCapitulo] = useState(null);

  // 🟢 Desbloqueo automático si ya pagó
useEffect(() => {
  const pagado = localStorage.getItem(`cuento_pagado_${id}`) === "true";
  if (pagado) {
    document.querySelectorAll(".texto-bloqueado, .overlay").forEach((el) => {
      el.style.display = "none";
    });
    document.querySelectorAll(".texto-visible p").forEach((p) => {
      p.style.maxHeight = "none";
      p.style.overflow = "visible";
    });
  }
}, [id]);

  if (!capitulo) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No se encontró el contenido del libro con ID {id}.</h2>
      </div>
    );
  }

  const [libroId] = capitulo.id.split("-");
  const esCuento = ["4", "5", "6", "7", "8", "9"].includes(libroId);

  // 📘 Leer siguiente capítulo
  const handleLeerSiguiente = () => {
    const [libroId, capNum] = capitulo.id.split("-");
    const siguienteCapId = `${libroId}-${(parseInt(capNum || "1") + 1)}`;
    window.open(`/capitulo/${siguienteCapId}`, "_blank");
  };

  // 💰 Redirigir a la página de compra
  const handleComprar = () => {
    navigate(`/comprar/${libroId}`); // 👈 lleva al nuevo componente
  };

  const esPrimerCapitulo = capitulo.id.includes("-1");
  const esSegundoCapitulo = capitulo.id.includes("-2");

  return (
    <div className="capitulo-contenedor" style={{ padding: "20px" }}>
      <h2>{capitulo.titulo}</h2>

      {/* 🔹 Texto visible o completo */}
      {!esCuento ? (
        <p style={{ lineHeight: 1.6, whiteSpace: "pre-line" }}>
          {capitulo.contenido}
        </p>
      ) : (
        <>
          <div className="texto-visible">
            <p style={{ lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {capitulo.contenido.slice(0, 800)}
            </p>
          </div>

          <div className="texto-bloqueado">
            <p style={{ lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {capitulo.contenido.slice(800)}
            </p>
            <div className="overlay">
              🔒 <em>Compra el cuento para seguir leyendo...</em>
            </div>
          </div>
        </>
      )}

      {/* ✅ Botones */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        {!esCuento &&
          (esPrimerCapitulo ? (
            <button className="boton-siguiente" onClick={handleLeerSiguiente}>
              Leer Segundo Capítulo 📖
            </button>
          ) : esSegundoCapitulo ? (
            <button className="boton-siguiente" onClick={handleComprar}>
              Comprar Libro Ahora 💳
            </button>
          ) : null)}

        {esCuento && (
          <button className="boton-siguiente" onClick={handleComprar}>
            Comprar Cuento Ahora 💳
          </button>
        )}
      </div>
    </div>
  );
}
