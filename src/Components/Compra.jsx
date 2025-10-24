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
  const [botonVisible, setBotonVisible] = useState(true);

  // 🟢 agregado: estado para saber si se desbloquearon cuentos
  const [cuentosDesbloqueados, setCuentosDesbloqueados] = useState(false);

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
  const apiUrl = "http://localhost:5000";
  const publicKey = "APP_USR-5001fc0e-9c7b-4549-902e-409778e1ae29";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mp = new window.MercadoPago(publicKey, { locale: "es-AR" });
      setMercadoPago(mp);
    };
    document.body.appendChild(script);
  }, [publicKey]);

  const handlePagar = async () => {
    if (!mercadoPago) return;

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
      if (container) container.innerHTML = "";

      await bricksBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId: data.id,
        },
        customization: {
          texts: {
            valueProp: "smart_option",
          },
        },
      });

      // 🟢 agregado: comienza a verificar el estado del pago cada 5 segundos
      const intervalo = setInterval(async () => {
        try {
          const res = await fetch(`${apiUrl}/webhook_estado`);
          const estado = await res.json();

          if (estado.pago_exitoso) {
            clearInterval(intervalo);
            setCuentosDesbloqueados(true);
            console.log("✅ Pago exitoso recibido, desbloqueando cuentos.");

            // Desbloquear visualmente los cuentos bloqueados
            document.querySelectorAll(".cuento-bloqueado").forEach((c) => {
              c.style.opacity = "1";
              c.style.pointerEvents = "auto";
              c.style.filter = "none";
              c.style.transition = "opacity 0.5s ease";
            });
          }
        } catch (err) {
          console.error("Error al consultar estado del pago:", err);
        }
      }, 5000);
      // 🟢 fin agregado

    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
    }
  };

  if (!producto) {
    return <h2 style={{ padding: "40px" }}>Producto no encontrado ❌</h2>;
  }

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
        <h2 style={{ fontSize: "1.8rem", marginBottom: "30px", color: "#fff" }}>
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
        >
          Comprar Ahora 💳
        </button>

        <div
          id="wallet_container"
          style={{
            position: "absolute",
            top: "20px",
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
