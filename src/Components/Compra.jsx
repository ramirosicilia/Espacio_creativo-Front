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




// 🟢 versión actualizada: usa "url_publica" en vez de "pdf_url"
export function Compra() {
  const { id } = useParams();
  const [mercadoPago, setMercadoPago] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [botonVisible, setBotonVisible] = useState(true);
  const [cuentosDesbloqueados, setCuentosDesbloqueados] = useState(false);
  const [cargando, setCargando] = useState(false);

  // ======================================================
  // 📚 PRODUCTOS
  // ======================================================
  const productos = {
    1: { titulo: "Los Héroes de la Dimensión Paralela", imagen: libro1, precio:(1990).toFixed(2), categoria: "libros" },
    2: { titulo: "Reconquistando la Tierra", imagen: libro2, precio: (1990).toFixed(2), categoria: "libros" },
    3: { titulo: "La Tercer Guerra", imagen: libro3, precio: (1990).toFixed(2), categoria: "libros" },
    4: { titulo: "El Cuidador", imagen: cuento1, precio: (1990).toFixed(2), categoria: "cuentos" },
    5: { titulo: "La Mirada de un Ángel", imagen: cuento2, precio: (1990).toFixed(2), categoria: "cuentos" },
    6: { titulo: "El Último Deseo", imagen: cuento3, precio: (1990).toFixed(2), categoria: "cuentos" },
    7: { titulo: "El Nuevo Despertar", imagen: cuento4, precio: (1990).toFixed(2), categoria: "cuentos" },
    8: { titulo: "El Infierno de las Apps de Citas", imagen: cuento5, precio: (1990).toFixed(2), categoria: "cuentos" },
    9: { titulo: "A Través del Espejo", imagen: cuento6, precio: (1990).toFixed(2), categoria: "cuentos" },
  };

  const producto = productos[id];
  const apiUrl = import.meta.env.VITE_PAYMENT_URL;
  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;

  // ======================================================
  // 🔹 Cargar SDK MercadoPago
  // ======================================================
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mp = new window.MercadoPago(publicKey, { locale: "es-AR" });
      setMercadoPago(mp);
    };
    document.body.appendChild(script);
  }, [publicKey]);

  // ======================================================
  // 🔓 Desbloquear cuento
  // ======================================================
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

  // ======================================================
  // 📥 Descargar libro (PDF)
  // ======================================================
  const descargarLibro = (urlPublica) => {
    if (!urlPublica) {
      console.warn("⚠️ No se recibió una URL pública válida para descargar el libro.");
      alert("⚠️ No se encontró el archivo del libro. Intenta nuevamente más tarde o contacta soporte.");
      return;
    }

    console.log("📘 Descargando libro desde:", urlPublica);
    const link = document.createElement("a");
    link.href = urlPublica;
    link.download = "libro.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ======================================================
  // 🔄 Verificación de pago periódica (más robusta)
  // ======================================================
  useEffect(() => {
    if (!id) return;
    let activo = true;
    let yaRedirigio = false;

    const sessionId = localStorage.getItem("session_id");

    const verificar = async () => {
      while (activo && !yaRedirigio) {
        try {
          const res = await fetch(
            `${apiUrl}/webhook_estado?libroId=${encodeURIComponent(id)}&sessionId=${encodeURIComponent(sessionId)}`
          );
          const data = await res.json();

          console.log("🔍 Estado del pago:", data);

          if (data.pago_exitoso && data.data?.[0]?.payment_id) {
            const paymentID = data.data[0].payment_id;
            localStorage.setItem("payment", JSON.stringify(paymentID));

            // ✅ Doble verificación
            const validacion = await fetch(
              `${apiUrl}/webhook_estado?libroId=${encodeURIComponent(id)}&sessionId=${encodeURIComponent(sessionId)}`
            );
            const validacionData = await validacion.json();

            console.log("🧾 Segunda validación:", validacionData);

            if (
              validacionData.pago_exitoso &&
              validacionData.data?.[0]?.payment_id === paymentID
            ) {
              yaRedirigio = true;

              if (producto.categoria === "cuentos") {
                alert("✅ ¡Pago aprobado! Desbloqueando cuento...");
                desbloquearCuento(id);
              } else if (
                producto.categoria === "libros" &&
                validacionData.data?.[0]?.url_publica
              ) {
                alert("📘 ¡El código de desbloqueo es: migueletes2372");
                descargarLibro(validacionData.data[0].url_publica);
              } else {
                alert("⚠️ El pago fue aprobado pero no se encontró el archivo del libro.");
              }

              // 🔥 Solo acá, tras éxito total
              setTimeout(() => {
                console.log("🧩 Eliminando session_id:", sessionId);
                localStorage.removeItem("session_id");
              }, 1000);

              return;
            } else {
              console.warn("⚠️ Pago no verificado en segunda validación. No se desbloquea nada.");
            }

            return;
          }
        } catch (err) {
          console.error("❌ Error verificando pago:", err);
        }

        await new Promise((r) => setTimeout(r, 3000));
      }
    };

    verificar();
    return () => {
      activo = false;
    };
  }, [id]);

  // ======================================================
  // ⚙️ Verificación puntual tras iniciar el pago
  // ======================================================
  const verificarPagoEnBackend = async (libroId) => {
    try {
      const reintentarCada = 2000;
      const maxIntentos = 20;

      for (let intento = 1; intento <= maxIntentos; intento++) {
        const res = await fetch(`${apiUrl}/webhook_estado?libroId=${encodeURIComponent(libroId)}`);
        const data = await res.json();

        console.log(`🕓 Verificación inmediata ${intento}/${maxIntentos}:`, data);

        if (data.pago_exitoso) {
          if (producto.categoria === "cuentos") {
            desbloquearCuento(libroId);
          } else if (producto.categoria === "libros" && data.data?.[0]?.url_publica) {
            const paymentID = data.data?.[0]?.payment_id;
            localStorage.setItem("payment", JSON.stringify(paymentID));
            descargarLibro(data.data[0].url_publica);
          } else {
            alert("⚠️ Pago exitoso, pero no se encontró la URL del libro.");
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

  useEffect(() => {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      localStorage.setItem("session_id", sessionId);
    }
  }, []);

  // ======================================================
  // 💳 Iniciar compra con MercadoPago
  // ======================================================
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
              id,
              name: producto.titulo,
              quantity: 1,
              unit_price: producto.precio,
              categoria: producto.categoria,
              session_id: localStorage.getItem("session_id"),
            },
          ],
        }),
      });

      const data = await response.json();
      if (!data.id) throw new Error("No se recibió preferenceId desde el backend");

      setPreferenceId(data.id);
      setBotonVisible(false);
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

  // ======================================================
  // 🚫 Producto no encontrado
  // ======================================================
  if (!producto) {
    return <h2 style={{ padding: "40px", color: "#fff" }}>Producto no encontrado ❌</h2>;
  }

  // ======================================================
  // 🎨 Render
  // ======================================================
  return (
    <div className="producto-container">
      <img src={producto.imagen} alt={producto.titulo} className="producto-imagen" />

      <div className="producto-detalle">
        <h2 className="producto-titulo">{producto.titulo}</h2>

        <p className="producto-precio">
          Precio: <strong>${producto.precio} ARS</strong>
        </p>

        <button
          className={`boton-comprar ${botonVisible ? "visible" : ""}`}
          onClick={handlePagar}
          disabled={cargando}
        >
          {cargando ? "Procesando..." : "Comprar Ahora 💳"}
        </button>

        {cargando && <p className="texto-cargando">🔄 Cargando Mercado Pago...</p>}

        <div id="wallet_container" className={`wallet-container ${botonVisible ? "bloqueado" : ""}`}></div>
      </div>
    </div>
  );
}
