"use client";
import { useState, useEffect } from "react";

export default function DownloadWavPage() {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleInputChange = (event) => {
    setYoutubeUrl(event.target.value);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:3001/youtubeToWav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubeUrl: youtubeUrl,
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.startsWith("audio/wav")) {
          const blob = await response.blob();

          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = "audio.wav";

          downloadLink.click();

          URL.revokeObjectURL(downloadLink.href);
        } else {
          console.error(
            "La respuesta no es un archivo de audio válido:",
            contentType
          );
        }
      } else {
        console.error(
          "Error en la respuesta del servidor:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al convertir el audio a WAV:", error);
    }
  };

  useEffect(() => {
  }, [youtubeUrl]);

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 h-screen">
       <h1 className="text-6xl font-bold text-center mt-12 text-gray-900">
        Descargar audio de YouTube a WAV
      </h1>
      <p className="text-center mt-2 text-black">
        Pega la URL de YouTube y haz clic en Descargar
      </p>
      <div className="mt-4 flex items-center justify-center">
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 text-gray-700"
          type="text"
          placeholder="Pega la URL de YouTube"
          value={youtubeUrl}
          onChange={handleInputChange}
        />
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleDownload}
        >
          Descargar
        </button>
      </div>
    </div>
       
  );
}
