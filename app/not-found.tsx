'use client'
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center">
            <DotLottieReact
                src="/animations/404 Error.lottie"
                style={{ width: '300px', height: '300px' }}
                autoplay
                loop
            />
            <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
            <p className="text-gray-600">Lo sentimos, la página que buscas no existe.</p>
        </div>
    );
}