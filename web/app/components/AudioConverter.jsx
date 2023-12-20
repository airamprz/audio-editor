'use client';
import axios from "axios";
import React, { useState } from "react";

const AudioConverter = ({ audioFile, onConvert }) => {
  const [convertedBlob, setConvertedBlob] = useState(null);

  const handleConvert = async () => {
    try {
      if (audioFile) {
        const formData = new FormData();
        formData.append("audioFile", audioFile);

        const response = await axios.post(
          "http://localhost:3001/convertToMP3",
          formData,
          {
            responseType: "blob", 
          }
        );

        if (response.status === 200) {
          const contentType = response.headers["content-type"];

          
          if (contentType && contentType.startsWith("audio/mp3")) {
            setConvertedBlob(response.data);

            if (onConvert) {
              onConvert(response.data);
            }

            
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(response.data);
            downloadLink.download = "converted_audio.mp3";
            downloadLink.click();
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
            response.data
          );
        }
      }
    } catch (error) {
      console.error("Error al convertir el audio a MP3:", error);
    }
  };

  return (
    <div className="flex justify-end w-full mt-2">
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleConvert}
      >
        Convertir a MP3
      </button>
    </div>
  );
};

export default AudioConverter;
