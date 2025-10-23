import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/global.css";

// 📘 Imágenes (las mismas que pasaste)
import libro1 from "../assets/books/portada ganadora.png";
import libro2 from "../assets/books/portada.jpg";
import libro3 from "../assets/books/tapa.png";
import cuento1 from "../assets/books/el guardian.jpg";
import cuento2 from "../assets/books/Angel.jpg";
import cuento3 from "../assets/books/Deseo.jpg";
import cuento4 from "../assets/books/Despertar.jpg";
import cuento5 from "../assets/books/Citas.jpg";
import cuento6 from "../assets/books/espejo.jpg";

export function Compra() {
  const { id } = useParams();
  const [mercadoPago, setMercadoPago] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [botonVisible, setBotonVisible] = useState(true); // 👈 nuevo estado para ocultar el botón

  const productos = {
    1: { titulo: "Los Héroes de la Dimensión Paralela", imagen: libro1, precio: 5.00.toFixed("2") },
    2: { titulo: "Reconquistando la Tierra", imagen: libro2, precio: 5.00.toFixed("2") },
    3: { titulo: "La Tercer Guerra", imagen: libro3, precio: 5.00.toFixed("2") },
    4: { titulo: "El Cuidador", imagen: cuento1,  precio: 5.00.toFixed("2") },
    5: { titulo: "La Mirada de un Ángel", imagen: cuento2, precio: 5.00.toFixed("2")  },
    6: { titulo: "El Último Deseo", imagen: cuento3, precio: 5.00.toFixed("2") },
    7: { titulo: "El Nuevo Despertar", imagen: cuento4, precio: 5.00.toFixed("2") },
    8: { titulo: "El Infierno de las Apps de Citas", imagen: cuento5,precio: 5.00.toFixed("2") },
    9: { titulo: "A Través del Espejo", imagen: cuento6,precio: 5.00.toFixed("2") },
  };

  const producto = productos[id];
  const apiUrl=import.meta.env.VITE_PAYMENT_URL
  let publicKey=import.meta.env.VITE_MP_PUBLIC_KEY
  // 🧩 Cargar SDK de Mercado Pago al montar el componente
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mp = new window.MercadoPago(publicKey, { locale: "es-AR" });
      setMercadoPago(mp);
    };
    document.body.appendChild(script);
  }, [publicKey]);

  // 💰 Crear preferencia y renderizar botón de pago
  const [loading, setLoading] = useState(false); // 🧩 nuevo estado

const handlePagar = async () => {
  if (!mercadoPago || loading) return; // ⛔ evitar múltiples clicks

  setLoading(true); // bloquear mientras crea la preferencia

  try {
    const response = await fetch(`${apiUrl}/create_preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mp: [
          {
            id: id,
            name: producto.titulo,
            quantity: 1,
            unit_price: producto.precio,
          },
        ],
      }),
    });

    const data = await response.json();
    if (!data.id) throw new Error("No se recibió preferenceId desde el backend");

    setPreferenceId(data.id);
    setBotonVisible(false);

    const bricksBuilder = mercadoPago.bricks();
    const container = document.getElementById("wallet_container");
    if (container) container.innerHTML = ""; // limpiar si ya existe    

    await bricksBuilder.create("wallet", "wallet_container", {
      initialization: { preferenceId: data.id },
      customization: { texts: { valueProp: "smart_option" } },
    });
  } catch (error) {
    console.error("Error al crear la preferencia de pago:", error);
  } finally {
    setLoading(false); // 🔓 permitir nuevo intento si falló
  }
};

 return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        gap: "40px",
      }}
    >
      <img
        src={producto.imagen}
        alt={producto.titulo}
        style={{
          width: "280px",
          height: "400px",
          objectFit: "cover",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      />

      <div className="gap-compra" style={{ position: "relative" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "50px", color: "#fff" }}>
          {producto.titulo}
        </h2>
        <p style={{ fontSize: "1.3rem", color: "#fff" }}>
          Precio: <strong>${producto.precio} ARS</strong>
        </p>

             <button
        className="boton-siguiente"
        style={{
          marginTop: "20px",
          padding: "10px 30px",
          fontSize: "1.1rem",
          opacity: botonVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
        onClick={handlePagar}
        disabled={loading} // ⛔ bloquea el botón mientras carga
      >
        {loading ? "Cargando..." : "Comprar Ahora 💳"}
      </button>


        {/* 👇 se posiciona de forma absoluta sobre el botón */}
        <div
          id="wallet_container"
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0",
            right: "0",
            display: "flex",
            justifyContent: "center",
            pointerEvents: botonVisible ? "none" : "auto",
          }}
        ></div>
      </div>
    </div>
  );
}
