import { useState, useEffect } from "react";
import slider1 from "../assets/books/los guardianes de la noche.png";
import slider2 from "../assets/books/Brian y Jackon.jpg";
import slider3 from "../assets/books/Mascara intimidando a cristian en grupo.png";
import slider4 from "../assets/books/bienvenido-a-ladimencio paralela.png";
import slider5 from "../assets/books/colorado diabolico.png";
import slider6 from "../assets/books/aerox-b26.png";

const images = [slider1, slider2, slider3,slider4, slider5, slider6];

export default function Sliders() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (

    <div className="slider-container">
        <div>
          <img
            src={images[current]}
            alt="slider"
           
          />
        </div>
    </div>
  );
}
