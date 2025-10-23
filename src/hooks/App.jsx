import Header from "../Components/Header";
import Home from "../pages/Home";
import Favoritos from "../pages/Favoritos";
import Capitulos from "../pages/Capitulos";
import { Routes, Route } from "react-router-dom";
import { Compra } from "../Components/Compra";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/capitulo/:id" element={<Capitulos />} />
        <Route path="/comprar/:id" element={<Compra />} /> {/* 👈 nueva ruta */}
      </Routes>
    </>
  );
}

export default App;
