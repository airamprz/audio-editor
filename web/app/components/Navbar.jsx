"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-7">
            {/* Website Logo */}
            <div>
              <Link
                href="/"
                className="text-xl font-bold uppercase hover:text-gray-300 transition duration-300"
              >
                AUDIO-EDITOR
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/convert"
                className="py-4 px-2 text-white hover:text-gray-300 transition duration-300"
              >
                Convertir a mp3
              </Link>
              <Link
                href="/convertwav"
                className="py-4 px-2 text-white hover:text-gray-300 transition duration-300"
              >
                Convertir a wav
              </Link>
              <Link
                href="/cut"
                className="py-4 px-2 text-white hover:text-gray-300 transition duration-300"
              >
                Cortar audio
              </Link>
              <Link
                href="/download"
                className="py-4 px-2 text-white hover:text-gray-300 transition duration-300"
              >
                Descargar audio de YouTube
              </Link>
              <Link
                href="/downloadWav"
                className="py-4 px-2 text-white hover:text-gray-300 transition duration-300"
              >
                Descargar audio de YouTube a WAV
              </Link>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 text-white"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className={`${isOpen ? "" : "hidden"} mobile-menu`}>
        <ul className="">
          <li className="active">
            <a
              href="/convert"
              className="block text-sm px-2 py-4 text-white bg-purple-500 font-semibold hover:bg-green-500 transition duration-300"
            >
              Convertir a mp3
            </a>
          </li>
          <li>
            <a
              href="/convertwav"
              className="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300"
            >
              Convertir a wav
            </a>
          </li>
          <li>
            <a
              href="/cut"
              className="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300"
            >
              Cortar audio
            </a>
          </li>
          <li>
            <a
              href="/download"
              className="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300"
            >
              Descargar audio de YouTube
            </a>
          </li>
          <li>
            <a
              href="/downloadWav"
              className="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300"
            >
              Descargar audio de YouTube a WAV
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
