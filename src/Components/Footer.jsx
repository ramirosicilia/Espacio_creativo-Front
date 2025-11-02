import React from 'react' 



export default function Footer() {
  return (
    <footer className="footer-container">
      <h3 className="footer-title">Espacio Creativo</h3>

      <div className="footer-icons">
        {/* WhatsApp */}
        <a
          href="https://wa.me/541138774224"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon footer-whatsapp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@espaciocreativo993"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon footer-tiktok"
        >
          <i className="bi bi-tiktok"></i>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/espacio9679"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon footer-instagram"
        >
          <i className="bi bi-instagram"></i>
        </a>

        {/* Facebook */}
        <a
         href="https://www.facebook.com/profile.php?id=61579275134722"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon footer-facebook"
        >
          <i className="bi bi-facebook"></i>
        </a>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Espacio Creativo — Todos los derechos reservados.
      </p>
    </footer>
  );
}
