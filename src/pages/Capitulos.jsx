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
      <div style={{ padding: 20 }}>
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

  // 🟢 NUEVO: Verifica si el libro fue comprado
  const librosPagados = JSON.parse(localStorage.getItem("libros_pagados")) || [];
  const libroPagado = librosPagados.includes(libroId);

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

  // 🟢 NUEVO: Descargar PDF si el libro ya está pagado
  const handleDescargarPDF = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/libros_urls?libro_id=eq.${libroId}`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        }
      );
      const result = await response.json();
      if (result.length > 0 && result[0].url_publica) {
        const link = document.createElement("a");
        link.href = result[0].url_publica;
        link.download = result[0].archivo || "Libro.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        alert("⚠️ No se encontró el PDF del libro en la base de datos.");
      }
    } catch (e) {
      console.error("❌ Error al intentar descargar el PDF:", e);
    }
  };

  const esPrimerCapitulo = capitulo.id.includes("-1");
  const esSegundoCapitulo = capitulo.id.includes("-2");

  return (
    <div className="capitulo-contenedor" style={{ padding: "20px" }}>
      <h2>{capitulo.titulo}</h2>

      {/* 🔹 Texto visible o completo */}
      {!esCuento || cuentoPagado ? (
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

          <div className="texto-bloqueado" style={{ position: "relative" }}>
            <p style={{ lineHeight: 1.6, whiteSpace: "pre-line", opacity: 0.3 }}>
              {capitulo.contenido.slice(800)}
            </p>
            <div
              className="overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255,255,255,0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
              }}
            >
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
            // 🟢 NUEVO: si es libro y ya fue comprado → botón de descarga
            categoria === "libro" && libroPagado ? (
              <button className="boton-siguiente" onClick={handleDescargarPDF}>
                📘 Descargar Libro
              </button>
            ) : (
              <button className="boton-siguiente" onClick={handleComprar}>
                Comprar Libro Ahora 💳
              </button>
            )
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
