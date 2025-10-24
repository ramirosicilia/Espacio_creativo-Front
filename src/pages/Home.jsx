import Sliders from "../Components/Sliders";
import LibrosCard from "../Components/LibrosCard";
import libro1 from "../assets/books/portada ganadora.png";
import libro2 from "../assets/books/portada.jpg";
import libro3 from "../assets/books/tapa.png";
import cuento1 from "../assets/books/el guardian.jpg";
import cuento2 from "../assets/books/Angel.jpg";
import cuento3 from "../assets/books/Deseo.jpg";
import cuento4 from "../assets/books/Despertar.jpg";
import cuento5 from "../assets/books/Citas.jpg";
import cuento6 from "../assets/books/espejo.jpg";

export default function Home() {
  const libros = [
    {
      id: 1,
      titulo: "Los Héroes de la Dimensión Paralela",
      categoria:"Libro",
      genero:"Ciencia ficción/Romance",
      descripcion: `Una noche. Una luz. Un destino que rompe los límites del mundo.
  Ram, un repartidor sin rumbo, sigue un paquete… y termina desapareciendo en una tormenta de luz.
  Despierta en una Dimensión Paralela, donde la realidad está invertida y la noche domina.
  Aquí, los amigos son enemigos… y el amor se convierte en peligro.
  Solo cuatro horas de día. Veinte de oscuridad absoluta.
  Sombras y espectros cazan bajo las órdenes del cruel Sargento Alex.
  Ram descubre que nada es como era… ni siquiera él mismo.
  Solo seis llaves pueden sellar la oscuridad para siempre.
  Con los Guerreros de la Luz, emprende una misión imposible.
  Porque cuando la esperanza brilla, ni la noche más eterna puede vencerla.`,
      imagen: libro1,
    },
    {
      id: 2,
      titulo: "Reconquistando la Tierra",
      categoria:"Libro",
      genero:"Ciencia ficción/Aventura",
      descripcion: `Año 3500 d.C.
  La humanidad vive desterrada en las profundidades del océano desde hace ocho siglos.
  La superficie pertenece a los Insectoides, criaturas mutantes que convirtieron la Tierra en su nido.
  Entre mares envenenados y monstruos radiactivos, surge una última esperanza: la Bomba Aerox-B26.
  Solo una nave puede llevarla al cráter que liberará el gas que salvará al mundo: la Aurora.
  Pero el océano es un infierno viviente, y cada metro es una batalla por sobrevivir.
  Cuando logran alcanzar tierra firme, descubren que lo peor aún los espera.
  Hormigas gigantes, langostas colosales y cucarachas de hielo dominan el planeta.
  Math y su tripulación deben elegir entre su vida… o el futuro de la humanidad.
  La última guerra por la Tierra ha comenzado.`,
      imagen: libro2,
    },
    {
      id: 3,
        titulo: "La Tercer Guerra",
        categoria:"Libro",
       genero:"Ciencia ficción/Romance",
        descripcion: `Año 2065.
  El planeta arde bajo la Tercera Guerra Mundial: 195 naciones enfrentadas por poder, hambre y territorio.
  Entre el fuego y la ruina, Edwards y Erica —dos almas unidas por el amor— son arrancados del uno del otro.
  Él es enviado al desierto; ella, al ejército del Imperio Latino, que desafía a Estados Unidos.
  Pero mientras los hombres se destruyen entre sí, una amenaza del cielo desciende sobre la Tierra.
  Los invasores alienígenas no vienen a conquistar… sino a exterminar.
  Ciudades borradas, cuerpos convertidos en experimentos, humanidad al borde del abismo.
  En medio del caos, Edwards y Erica vuelven a encontrarse —enemigos por bandera, aliados por destino.
  Ahora no pelean por un país, sino por el derecho a existir.
  El amor será su última arma… en la guerra que decidirá el fin del mundo.`,
      imagen: libro3,
    },
  ];

  const cuentos = [
    {
      id: 4,
      titulo: "El cuidador",
      categoria:"Cuento",
      genero:"Ciencia ficción/Comedio",
      descripcion: `Europa, verano de 2033. La superficie arde bajo temperaturas imposibles, pero lo que nadie imagina es que, en las profundidades del planeta, algo despierta… criaturas ancestrales que han esperado siglos para conquistar la Tierra.

      Mientras tanto, en una ciudad cualquiera, Stuart y su inseparable amigo Richard buscan una noche de diversión en un bar lleno de excesos. Pero lo que parecía otra velada de rutina pronto se transforma en una pesadilla. Entre mafiosos, un vagabundo violento y un monstruo salido de las entrañas del mundo, la noche revelará un rostro siniestro donde lo humano y lo inhumano se confunden.

      Un relato oscuro, inquietante y lleno de tensión, donde el verdadero horror se esconde en los lugares más inesperados.`,
      imagen: cuento1,
    },
    {
      id: 5,
      titulo: "La mirada de un Ángel",
      categoria:"Cuento",
      genero:"Ciencia ficción/Drama",
      descripcion: `Sandra, enfermera en oncología infantil, vive rodeada del dolor y la esperanza de sus pequeños pacientes.
      Su luz es Tiffany, una niña que sueña con volver a correr, y por quien Sandra lo arriesga todo.
      Cuando logra reunir el dinero para su operación, el destino se lo arrebata en un asalto brutal.
      Días después, Tiffany muere… y algo dentro de Sandra también.
      Pero la noche guarda un secreto: al cruzarse con los ladrones, su mirada deja de ser humana.
      Ahora refleja el dolor de cada inocente, y condena a quien lo provoca.
      Roco y Sarna sienten el peso de todas sus víctimas... y la culpa los consume.
      Desde entonces, las calles susurran su nombre: el ángel que juzga con los ojos.
      Una historia de justicia, redención y el poder divino que habita en el alma rota de una mujer.`,
      imagen: cuento2,
    },
    {
      id: 6,
      titulo: "El último deseo",
      categoria:"Cuento",
      genero:"Drama",
      descripcion: `Medellín, años noventa. Un secuestro rompe para siempre a la familia Garavito.
      Doña Nélida vive con el corazón detenido, esperando el regreso de su hijo.
      Veintiocho años después, un mendigo en El Cairo despierta lo imposible: la esperanza.
      ¿Y si ese desconocido fuera Fernando… o al menos, su sombra?
      Sus hermanos trazan un plan desesperado: regalarle a su madre una mentira hermosa.
      Solo una noche más de fe… antes de que la verdad los consuma.
      Entre el amor y la culpa, nacerá un acto que desafía la razón.
      Un hijo inventado. Una madre que vuelve a sonreír.
      Y un último deseo que cambiará sus vidas para siempre.
      Porque a veces, mentir es la forma más pura de amar.`,
      imagen: cuento3,
    },
    {
      id: 7,
      titulo: "El nuevo Despertar",
      categoria:"Cuento",
      genero:"Suspenso",
      descripcion: `Cristian Gómez lo tenía todo: una familia, una carrera prometedora y una vida sin sobresaltos. Hasta que una decisión equivocada lo lanzó a una pesadilla que no parece tener fin.
        Despertar esposado, rodeado de criminales y sombras que respiran violencia, lo enfrenta a una realidad donde la culpa, el miedo y la supervivencia son las únicas leyes.
        En un mundo donde los inocentes también sangran, Cristian deberá luchar no solo por su vida, sino por conservar su cordura.
        Entre rejas, descubrirá que el verdadero infierno no siempre está hecho de fuego… sino de recuerdos.

        Una historia intensa, psicológica y estremecedora, donde nada es lo que parece y cada página te empuja a un final que no olvidarás.`,
      imagen: cuento4,
    },
    {
      id: 8,
      titulo: "El infierno de las Apps de citas",
      categoria:"Cuento",
      genero:"Comedia/Romance",
      descripcion: `En una ciudad dominada por pantallas, dos mujeres aún creen en el amor real.
      Celeste, cansada de promesas vacías, acepta una cita que cambiará su vida.
      Romina, ilusionada con un “príncipe digital”, descubrirá el rostro oscuro del deseo.
      Detrás de cada sonrisa perfecta, se ocultan secretos, mentiras… y peligro.
      Las redes son un espejo donde el encanto y la crueldad se confunden.
      Cuando el amor se vuelve una apuesta, solo el alma puede ganar.
      Entre engaños y heridas, nacerá una chispa de esperanza inesperada.
      Porque incluso en el abismo, la bondad puede aparecer disfrazada.
      Dos corazones perdidos en un mundo frío.
      Y una verdad eterna: el amor no se desliza, se siente.`,
      imagen: cuento5,
    },
    {
      id: 9,
      titulo: "A travéz del espejo",
      categoria:"Cuento",
      genero:"Terror/Thriller",
      descripcion: `En los años sesenta, los Miller ocultaban un secreto que ni la muerte pudo enterrar.
       Su casa, en los límites de Oklahoma, sigue respirando entre sombras y murmullos.
       Décadas después, Christopher llega buscando paz… y encuentra algo que lo observa.
       Tras el espejo del baño, una mirada idéntica a la suya aguarda, inmóvil.
       Las noches se llenan de voces. Las paredes, de recuerdos que no son suyos.
       Cada reflejo roba un fragmento de su alma.
       La casa quiere un dueño… y el espejo, un cuerpo.
       El tiempo se dobla, la razón se quiebra, y el pasado despierta hambriento.
       Cuando la oscuridad te mira desde tu propio rostro, ¿a dónde podés huir?
       Porque el verdadero horror no vive afuera… sino en tu reflejo.`,
      imagen: cuento6,
    },
  ];

  return (
    <div style={{ padding: "60px 40px" }}>
      <Sliders />

      <h2 className="libros-destacados">Libros Destacados</h2>
      <div class="arrow-down"></div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {libros.map((libro) => (
          <LibrosCard key={libro.id} libro={libro} />
        ))}
      </div>

      <h2 className="libros-destacados">Cuentos cortos y largos</h2>
        <div class="arrow-down"></div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cuentos.map((cuento) => (
        <LibrosCard key={cuento.id} libro={cuento} categoria={cuento.categoria} />
      ))}

      </div>
    </div>
  );
}
