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
  const [cuentosDesbloqueados, setCuentosDesbloqueados] = useState(false);
  const [cargando, setCargando] = useState(false);

  const productos = {
    1: { titulo: "Los Héroes de la Dimensión Paralela", imagen: libro1, precio: 5.0.toFixed("2") },
    2: { titulo: "Reconquistando la Tierra", imagen: libro2, precio: 5.0.toFixed("2") },
    3: { titulo: "La Tercer Guerra", imagen: libro3, precio: 5.0.toFixed("2") },
    4: { titulo: "El Cuidador", imagen: cuento1, precio: 5.0.toFixed("2") },
    5: { titulo: "La Mirada de un Ángel", imagen: cuento2, precio: 5.0.toFixed("2") },
    6: { titulo: "El Último Deseo", imagen: cuento3, precio: 5.0.toFixed("2") },
    7: { titulo: "El Nuevo Despertar", imagen: cuento4, precio: 5.0.toFixed("2") },
    8: { titulo: "El Infierno de las Apps de Citas", imagen: cuento5, precio: 5.0.toFixed("2") },
    9: { titulo: "A Través del Espejo", imagen: cuento6, precio: 5.0.toFixed("2") },
  };

  const producto = productos[id];
  const apiUrl = import.meta.env.VITE_PAYMENT_URL;
  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;

  // 🟢 Cargar SDK de Mercado Pago
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mp = new window.MercadoPago(publicKey, { locale: "es-AR" });
      setMercadoPago(mp);
    };
    document.body.appendChild(script);
  }, [publicKey]);

  // 🧩 Función para desbloquear cuento
  const desbloquearCuento = (libroId) => {
    console.log("✅ Desbloqueando cuento", libroId);
    setCuentosDesbloqueados(true);
    setCargando(false);

    const cuentosPagados = JSON.parse(localStorage.getItem("cuentos_pagados")) || [];
    if (!cuentosPagados.includes(libroId)) {
      cuentosPagados.push(libroId);
      localStorage.setItem("cuentos_pagados", JSON.stringify(cuentosPagados));
    }

    setTimeout(() => {
      window.location.href = `/cuento/${libroId}`;
    }, 1500);
  };

  // 🟢 AGREGADO: Función para descargar automáticamente un PDF desde URL
  const descargarPDF = (pdfUrl, nombreArchivo = "libro.pdf") => {
    if (!pdfUrl) return console.warn("⚠️ No hay URL de PDF para descargar");
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = nombreArchivo;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("📚 Descarga automática iniciada:", pdfUrl);
  };

  // 🟢 Verificación continua estilo "real time" (sin Supabase)
  useEffect(() => {
    if (!id) return;

    let activo = true;
    const verificar = async () => {
      while (activo) {
        try {
          const res = await fetch(`${apiUrl}/webhook_estado?libroId=${id}`);
          const data = await res.json();
          if (data.pago_exitoso) {
            alert("✅ Hace click para desbloquear el cuento");
            desbloquearCuento(id);

            // 🟢 NUEVO: Si viene pdf_url del backend, descarga automática
            if (data.pdf_url) {
              console.log("🟢 URL PDF recibida:", data.pdf_url);
              descargarPDF(data.pdf_url, `${producto.titulo}.pdf`);
            }

            break;
          }
        } catch (err) {
          console.error("Error verificando pago:", err);
        }
        await new Promise((r) => setTimeout(r, 1500)); // cada 1.5 s
      }
    };

    verificar();
    return () => {
      activo = false;
    };
  }, [id]);

  // 🟢 Verificación manual desde backend (respaldo)
  const verificarPagoEnBackend = async (libroId) => {
    try {
      const reintentarCada = 2000;
      const maxIntentos = 20;

      for (let intento = 1; intento <= maxIntentos; intento++) {
        const res = await fetch(`${apiUrl}/webhook_estado?libroId=${libroId}`);
        const data = await res.json();

        console.log(`🕓 Verificación inmediata ${intento}/${maxIntentos}:`, data);

        if (data.pago_exitoso) {
          console.log("💚 Pago detectado inmediatamente");
          desbloquearCuento(libroId);

          // 🟢 NUEVO: descarga automática si viene URL
          if (data.pdf_url) {
            console.log("🟢 Descargando PDF desde verificación inmediata...");
            descargarPDF(data.pdf_url, `${producto.titulo}.pdf`);
          }

          return;
        }

        await new Promise((r) => setTimeout(r, reintentarCada));
      }

      console.warn("⚠️ No se detectó pago tras verificación inmediata.");
    } catch (e) {
      console.error("❌ Error verificando pago:", e);
    }
  };

  // 💳 Manejar compra
  const handlePagar = async () => {
    if (!mercadoPago) return;
    setCargando(true);

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
              categoria: producto.categoria,
            },
          ],
        }),
      });

      const data = await response.json();
      if (!data.id) throw new Error("No se recibió preferenceId desde el backend");

      setPreferenceId(data.id);
      setBotonVisible(false);

      // 🟢 Empieza a verificar enseguida
      verificarPagoEnBackend(id);

      const bricksBuilder = mercadoPago.bricks();
      const container = document.getElementById("wallet_container");
      if (container) container.innerHTML = "";

      await bricksBuilder.create("wallet", "wallet_container", {
        initialization: { preferenceId: data.id },
        customization: { texts: { valueProp: "smart_option" } },
        callbacks: {
          onReady: () => console.log("🧱 Wallet lista"),
          onSuccess: async (payment) => {
            console.log("✅ Pago exitoso desde front:", payment);
            verificarPagoEnBackend(id);
          },
          onError: (error) => console.error("❌ Error en el Brick:", error),
        },
      });

      setCargando(false);
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      setCargando(false);
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
          {cargando ? "Procesando..." : "Comprar Ahora 💳"}
        </button>

        {cargando && (
          <p style={{ color: "#fff", marginTop: "10px", fontStyle: "italic" }}>
            🔄 Cargando Mercado Pago...
          </p>
        )}

        <div
          id="wallet_container"
          style={{
            position: "absolute",
            bottom: "0",
            left: "20px",
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
