// src/components/Capitulos.jsx
import { useParams, useNavigate } from "react-router-dom"; // 👈 agrega useNavigate
import { useEffect, useState } from "react";
import { obtenerCapituloPorLibro } from "../helper/dataLibro";
import "../styles/global.css";

export default function Capitulos() {
  const { categoria, id } = useParams(); // 👈 ahora obtenemos también la categoría
  const navigate = useNavigate(); // 👈 para navegar a otro componente
  const [capitulo, setCapitulo] = useState(null);

  useEffect(() => {
    // 👇 cambio clave: buscar por categoría + id, no solo por id
    setCapitulo(obtenerCapituloPorLibro(id));
  }, [categoria, id]);

  if (!capitulo) {
    return (
      <div className="contenido-capitulo">
        <h2>
          No se encontró el contenido del {categoria?.toLowerCase() || "libro"} con ID {id}.
        </h2>
      </div>
    );
  }

  const [libroId] = capitulo.id.split("-");
  const esCuento = categoria === "Cuento" || ["4", "5", "6", "7", "8", "9"].includes(libroId);

  // 🔓 Verifica si el cuento ya fue pagado (guardado en localStorage)
const cuentosPagados = JSON.parse(localStorage.getItem("cuentos_pagados")) || [];
const cuentoPagado = cuentosPagados.includes(libroId);




  // 📘 Leer siguiente capítulo
  const handleLeerSiguiente = () => {
    const [libroId, capNum] = capitulo.id.split("-");
    const siguienteCapId = `${libroId}-${parseInt(capNum || "1") + 1}`;
    // 👇 se mantiene igual, pero con categoría
    window.open(`/capitulo/${categoria}/${siguienteCapId}`, "_blank");
  };

  // 💰 Redirigir a la página de compra
  const handleComprar = () => {
    // 👇 mantiene tu lógica, pero con categoría
    navigate(`/comprar/${categoria}/${libroId}`);
  };

  const esPrimerCapitulo = capitulo.id.includes("-1");
  const esSegundoCapitulo = capitulo.id.includes("-2");

  return (
    <div className="capitulo-contenedor" >
      <h2 className="capitule-title">{capitulo.titulo}:</h2>

      {/* 🔹 Texto visible o completo */}
      {!esCuento || cuentoPagado ? (
        <p className="cap">
          {capitulo.contenido}
        </p>
      ) : (
        <>
          <div className="texto-visible">
            <p className="texto-parrafo">
              {capitulo.contenido.slice(0, 800)}
            </p>
          </div>

          <div className="texto-bloqueado" >
            <p className="texto-oculto">
              {capitulo.contenido.slice(800)}
            </p>
            <div
              className="overlay"
            
            >
              🔒 <em>Compra el cuento para seguir leyendo...</em>
            </div>
          </div>
        </>
      )}

      {/* ✅ Botones */}
      <div className="capitulos-container">
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
