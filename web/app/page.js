export default function Home() {
  return (
    <div className="container mx-auto text-black px-4 py-8 sm:px-8 md:px-16 lg:px-32 xl:px-48">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a MP3 EDITOR</h1>
      <p className="text-lg mb-6">
        MP3 EDITOR es una aplicación web diseñada para profesionales y entusiastas de la edición de audio. Te proporciona una manera fácil y rápida de manipular archivos de audio directamente desde tu navegador, sin necesidad de descargar ningún programa adicional.
      </p>

      <h2 className="text-2xl font-bold mb-4">Tecnologías Utilizadas</h2>
      <p className="text-lg mb-6">
        Hemos utilizado una combinación de tecnologías para brindarte la mejor experiencia posible:
      </p>

      <ul className="list-disc ml-6 mb-6">
        <li>
          <span className="font-bold">Fluent-FFmpeg:</span> Utilizamos la biblioteca Fluent-FFmpeg para la manipulación eficiente de archivos de audio. Esto nos permite ofrecer una amplia gama de funciones de edición sin comprometer la calidad del audio.
        </li>
        <li>
          <span className="font-bold">Node.js y Next.js:</span> En el lado del servidor, hemos implementado Node.js y Next.js para gestionar las operaciones de backend y facilitar la construcción de una aplicación web rápida y eficiente.
        </li>
        <li>
          <span className="font-bold">React, Next.js y Tailwind CSS:</span> En el lado del cliente, hemos utilizado React para la construcción de interfaces de usuario dinámicas, Next.js para la estructura de la aplicación y Tailwind CSS para el diseño y estilos, proporcionando una experiencia de usuario moderna y receptiva.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Características Destacadas</h2>
      <p className="text-lg mb-6">
        MP3 EDITOR se ha diseñado pensando en tus necesidades. Algunas de las características destacadas incluyen:
      </p>

      <ul className="list-disc ml-6 mb-6">
        <li>Conversión de audio a formatos populares como MP3 y WAV.</li>
        <li>Corte preciso de segmentos de audio.</li>
        <li>Descarga de audio de YouTube y conversión a diferentes formatos.</li>
        <li>Generación de archivos de alta calidad para garantizar la mejor experiencia auditiva.</li>
      </ul>

      <p className="text-lg mb-6">
        Estamos comprometidos a mejorar continuamente MP3 EDITOR. Pronto añadiremos nuevas funciones y optimizaremos las existentes para ofrecerte una herramienta aún más poderosa y fácil de usar.
      </p>

      <p className="text-lg">
        ¡Explora todas las funciones y comienza a editar tus archivos de audio hoy mismo!
      </p>
    </div>
  );
}
