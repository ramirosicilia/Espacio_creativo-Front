import React from 'react' 



export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #2c2c2c 100%)",
        color: "#f5f5f5",
        padding: "2rem 0",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        boxShadow: "0 -4px 10px rgba(0,0,0,0.4)",
        marginTop: "4rem",
      }}
    >
      <h3
        style={{
          fontWeight: "700",
          fontSize: "1.6rem",
          marginBottom: "1rem",
          letterSpacing: "1px",
          background: "linear-gradient(90deg, #12a4e2, #1cf0db, #00b4ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 10px rgba(0,204,255,0.6)",
        }}
      >
        Espacio Creativo
      </h3>

      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1rem" }}>
        {/* WhatsApp */}
        <a
          href="https://wa.me/541138774224"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#25D366", fontSize: "1.8rem" }}
        >
          <i className="bi bi-whatsapp"></i>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@espaciocreativo993"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", fontSize: "1.8rem" }}
        >
          <i className="bi bi-tiktok"></i>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/espacio9679"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#E1306C", fontSize: "1.8rem" }}
        >
          <i className="bi bi-instagram"></i>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61579275134722"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1877F2", fontSize: "1.8rem" }}
        >
          <i className="bi bi-facebook"></i>
        </a>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
        © {new Date().getFullYear()} Espacio Creativo — Todos los derechos reservados.
      </p>
    </footer>
  );
}