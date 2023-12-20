"use client";
import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Waveform from "../components/Waveform";
import AudioToWav from "../components/AudioToWav";

export default function ConvertToWavPage() {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileUpload = (file) => {
    setAudioFile(file);
  };

  const handleCrop = (file) => {
    console.log("Archivo cortado:", file);
  };

  const handleConvert = (file) => {
    console.log("Archivo convertido:", file);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 h-screen">
      <h1 className="text-6xl font-bold text-center mt-12 text-gray-900">
        Convertir audio a WAV
      </h1>
      <p className="text-center mt-2 text-black">
        Esta página permite convertir un archivo de audio a WAV.
      </p>
      <FileUploader onFileUpload={handleFileUpload} />
      <Waveform audioFile={audioFile} onCrop={handleCrop} />
      <AudioToWav audioFile={audioFile} onConvert={handleConvert} />
    </div>
  );
}
