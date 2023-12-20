"use client";
import axios from "axios";
import React, { useState } from "react";

const AudioCut = ({ audioFile, onCut }) => {
  const [cuttedBlob, setCuttedBlob] = useState(null);
  const [startTime, setStartTime] = useState(0); 
  const [duration, setDuration] = useState(10); 

  const handleCut = async () => {
    try {
      if (audioFile) {
        const formData = new FormData();
        formData.append("audioFile", audioFile);

        formData.append("startTime", startTime);
        formData.append("duration", duration);

        const response = await axios.post(
          "http://localhost:3001/audioCut",
          formData,
          {
            responseType: "blob",
          }
        );

        if (response.status === 200) {
          const contentType = response.headers["content-type"];

          if (contentType && contentType.startsWith("audio/mp3")) {
            setCuttedBlob(response.data);

            if (onCut) {
              onCut(response.data);

              const downloadLink = document.createElement("a");
              downloadLink.href = URL.createObjectURL(response.data);
              downloadLink.download = "audio_cortado.mp3";
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }
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
      console.error("Error al cortar el audio:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <span className="text-gray-700">Tiempo de inicio (segundos):</span>
          <input
            className="w-20 border border-gray-300 rounded-md px-2 py-1 text-gray-700"
            type="number"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label className="flex items-center space-x-2">
          <span className="text-gray-700">Duración (segundos):</span>
          <input
            className="w-20 border border-gray-300 rounded-md px-2 py-1 text-gray-700"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-end w-full mt-2">
        <button
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
          onClick={handleCut}
        >
          Cortar audio
        </button>
      </div>
    </div>
  );
};

export default AudioCut;
