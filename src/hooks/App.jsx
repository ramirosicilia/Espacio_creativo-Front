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
       <Route path="/capitulo/:categoria/:id" element={<Capitulos />} />
       <Route path="/comprar/:categoria/:id" element={<Compra />} />
       <Route path="/cuento/:id" element={<Capitulos />} />

      </Routes>
    </>
  );
}

export default App;
