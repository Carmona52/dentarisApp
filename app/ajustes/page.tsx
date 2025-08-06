'use client'
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function Ajustes() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Próximamente</h1>
      <p className="text-gray-600">Tu aplicación, a tu medida</p>
      <DotLottieReact
        src="/animations/Dentist.lottie"
        style={{ width: '300px', height: '300px' }}
        autoplay
        loop
      />
      <p className="text-gray-500 mt-4">Estamos trabajando para ofrecerte una experiencia personalizada.</p>
    </div>
  );
}