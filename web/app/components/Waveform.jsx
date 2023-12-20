'use client';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ audioFile }) => {
  const waveformRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioFile) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'blue',
        progressColor: 'purple',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        cursorColor: 'white',
        height: 150,
      });

      wavesurfer.loadBlob(audioFile);
      setWaveSurfer(wavesurfer);
    }
  }, [audioFile]);

  const handlePlayPause = () => {
    if (waveSurfer) {
      if (isPlaying) {
        waveSurfer.pause();
      } else {
        waveSurfer.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mt-12">
      <div ref={waveformRef} />
      <div className="flex justify-end w-full">
        <button
          onClick={handlePlayPause}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? "Pausar" : "Reproducir"}
        </button>
      </div>
    </div>
  );  
};

export default Waveform;