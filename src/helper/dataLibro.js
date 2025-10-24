// data/capitulosData.js
import { dimensionParalela } from "./capitulo1Dimension";
import { reconquistandoLaTierra } from "./capitulo1Reconquistando";
import { laTercerGuerra } from "./capitulo1LatercerGuerra";
import { elCuidador } from "./cuentoCuidador";
import { laMirada } from "./laMiradaDAngel";
import { Deseo } from "./elUltimoDeso";
import { Despertar } from "./elNuevoDespertar";
import { Citas } from "./citasApps";
import { Espejo } from "./atravezDelEspedjo";
import { dimensionParalela2 } from "./capitulo2Libro1";
import { reconquistandoLaTierra2 } from "./capitulo2Libro2";
import { laTercerGuerra2 } from "./capitulo2Libro3";



export function obtenerCapituloPorLibro(id) {
  if (id == null) return null; // 👈 agregado: evita error si id es undefined o null

  const idStr = id.toString();

  // ✅ Soporte para capítulos con formato "X-Y"
  const [libroId, capNum] = idStr.split("-");

  switch (libroId) {
    case "1":
      return capNum === "2" ? CapituloLibro1_2() : Capitulo1Libro1();

    case "2":
      return capNum === "2" ? CapituloLibro2_2() : Capitulo1Libro2();

    case "3":
      return capNum === "2" ? CapituloLibro3_2() : Capitulo1Libro3();

    case "4":
      return Cuento1();

    case "5":
      return Cuento2();

    case "6":
      return Cuento3();

    case "7":
      return Cuento4();

    case "8":
      return Cuento5();

    case "9":
      return Cuento6();

    default:
      return null;
  }
}

// 📖 Primer capítulo del Libro 1
function Capitulo1Libro1() {
  return {
    id: "1-1",
    categoria: "Libro", // 👈 agregado
    titulo: "Capítulo 1 — El Viaje:",
    contenido: dimensionParalela(),
  };
}

// 📖 Segundo capítulo del Libro 1
function CapituloLibro1_2() {
  return {
    id: "1-2",
    categoria: "Libro",
    titulo: "Capítulo 2 — Bienvenido a la Dimensión Paralela",
    contenido: dimensionParalela2(),
  };
}

// 📖 Primer capítulo del Libro 2
function Capitulo1Libro2() {
  return {
    id: "2-1",
    categoria: "Libro",
    titulo: "Capítulo 1 — El día de la esperanza",
    contenido: reconquistandoLaTierra(),
  };
}

// 📖 Segundo capítulo del Libro 2
function CapituloLibro2_2() {
  return {
    id: "2-2",
    categoria: "Libro",
    titulo: "Capítulo 2 — Los Diez convocados",
    contenido: reconquistandoLaTierra2(),
  };
}

// 📖 Primer capítulo del Libro 3
function Capitulo1Libro3() {
  return {
    id: "3-1",
    categoria: "Libro",
    titulo: "Capítulo 1 — Un mundo apocalíptico",
    contenido: laTercerGuerra(),
  };
}

// 📖 Segundo capítulo del Libro 3
function CapituloLibro3_2() {
  return {
    id: "3-2",
    categoria: "Libro",
    titulo: "Capítulo 2 — Los desaparecidos en Batalla",
    contenido: laTercerGuerra2(),
  };
}

// 📚 Cuentos
function Cuento1() {
  return {
    id: "4",
    categoria: "Cuento", // 👈 agregado
    titulo: "El Cuidador",
    contenido: elCuidador(),
  };
}

function Cuento2() {
  return {
    id: "5",
    categoria: "Cuento",
    titulo: "La mirada de un Ángel",
    contenido: laMirada(),
  };
}

function Cuento3() {
  return {
    id: "6",
    categoria: "Cuento",
    titulo: "El Último Deseo",
    contenido: Deseo(),
  };
}

function Cuento4() {
  return {
    id: "7",
    categoria: "Cuento",
    titulo: "El Nuevo Despertar",
    contenido: Despertar(),
  };
}

function Cuento5() {
  return {
    id: "8",
    categoria: "Cuento",
    titulo: "El Infierno de las Apps de Citas",
    contenido: Citas(),
  };
}

function Cuento6() {
  return {
    id: "9",
    categoria: "Cuento",
    titulo: "A Través del Espejo",
    contenido: Espejo(),
  };
}
