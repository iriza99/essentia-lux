'use client'
import { useEffect, useState } from 'react'
import { parrafosInicio, introductionData } from '@/data'
import { MotionTransition } from '@/components/transition-component'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
  const [mensaje, setMensaje] = useState('Estamos preparando tu experiencia...')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://essentialux-1.onrender.com/')
      .then((res) => res.json())
      .then((data) => {
        setMensaje(data.message)
        setIsLoading(false)
      })
      .catch(() => {
        setMensaje('Error al conectar con el backend')
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden pb-16 pt-24 lg:pt-24 bg-white">
      
      {/* Fondo blanco con gradientes sutiles */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-primary/5"></div>
      </div>

      {/* Elementos decorativos flotantes minimalistas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos flotantes animados con dorado y gris */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-gray-100/20 rounded-full blur-xl animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-gray-100/20 to-primary/10 rounded-full blur-xl animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-primary/8 to-gray-50/15 rounded-full blur-2xl animate-pulse opacity-30" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-gray-100/20 to-primary/10 rounded-full blur-xl animate-pulse opacity-40" style={{animationDelay: '0.5s'}}></div>
        
        
        {/* Formas geométricas sutiles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-primary/20 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-gray-400/30 rounded-full animate-ping opacity-30" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-ping opacity-30" style={{animationDelay: '2s'}}></div>
      </div>

      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center space-y-8 sm:space-y-12 md:space-y-16 px-4 sm:px-6 md:px-8">
        
        {/* Header con logo personalizado */}
        <MotionTransition
          position="bottom"
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#AF7E44] to-[#6A806C] rounded-full shadow-lg shadow-[#AF7E44]/25 mb-4 p-2">
            <img 
              src="/icono.png" 
              alt="Essentia Lux Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain filter brightness-0 invert"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'block';
                }
              }}
            />
            {/* SVG de respaldo */}
            <svg 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 text-white hidden" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-[#6A806C] via-[#AF7E44] to-[#6A806C] bg-clip-text text-transparent leading-tight">
              Essentia Lux
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#AF7E44] via-[#6A806C] to-[#AF7E44] bg-clip-text text-transparent leading-tight mt-1">
              Aesthetic Medicine
            </h2>
          </div>

          <p className="text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl max-w-md mx-auto font-medium">
            Tu experiencia de belleza personalizada
          </p>
        </MotionTransition>

        {/* Bloque central con glassmorphism minimalista */}
        <MotionTransition
          position="bottom"
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl"
        >
          <div className="relative group">
            {/* Glow effect sutil - AGRANDADO */}
            <div className="absolute -inset-6 bg-gradient-to-r from-primary via-gray-300 to-primary rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-1000"></div>
            
            {/* Contenido principal - fondo blanco sólido */}
            <div className="relative bg-white shadow-elegant-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center space-y-6 sm:space-y-8 border border-gray-200 overflow-hidden">
              
              {/* Decoración interna minimalista */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
              
              {/* Contenido */}
              <div className="relative z-10">
                {isLoading ? (
                  <div className="flex flex-col items-center space-y-4">
                    {/* Skeleton loader elegante */}
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-[#6A806C] rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-[#6A806C] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <p className="text-gray-600 text-lg sm:text-xl md:text-2xl animate-pulse font-medium">
                      {mensaje}
                    </p>
                  </div>
                ) : mensaje && !mensaje.startsWith('Error') ? (
                  <div className="space-y-6 sm:space-y-8">
                    {parrafosInicio.map((linea, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-gray-300 rounded-full opacity-25"></div>
                        <p className="text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl leading-relaxed font-medium tracking-wide pl-6">
                          {linea}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3 text-red-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl font-medium">
                      {mensaje}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MotionTransition>

        {/* Animación de texto con estilo mejorado */}
        <MotionTransition position="bottom">
          <div className="text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="relative inline-block">
              {/* Fondo decorativo sutil */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-gray-50 to-primary/5 blur-xl rounded-2xl opacity-60"></div>
              
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-200 shadow-elegant">
                <TypeAnimation
                  key={introductionData.tituloPrincipal}
                  sequence={introductionData.frases.flatMap((frase: string) => [frase, 2000])}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="font-black bg-gradient-to-r from-primary via-[#6A806C] to-primary bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-tight tracking-wide"
                />
                
                {/* Cursor personalizado */}
                <span className="inline-block w-1 h-10 sm:h-12 md:h-14 bg-gradient-to-b from-primary to-[#6A806C] ml-1 animate-pulse rounded-full"></span>
              </div>
            </div>
          </div>
        </MotionTransition>

        {/* Floating elements decorativos minimalistas */}
        <div className="hidden lg:block absolute top-1/4 left-8 opacity-30">
          <div className="flex flex-col space-y-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-[#6A806C] rounded-lg rotate-45 shadow-elegant"></div>
            <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-primary rounded-full shadow-md"></div>
            <div className="w-4 h-4 bg-gradient-to-br from-primary to-gray-300 rounded-lg shadow-sm"></div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-1/3 right-8 opacity-30">
          <div className="flex flex-col space-y-4">
            <div className="w-6 h-6 bg-gradient-to-bl from-gray-300 to-primary rounded-full shadow-md"></div>
            <div className="w-8 h-8 bg-gradient-to-bl from-primary to-[#6A806C] rounded-lg -rotate-12 shadow-elegant"></div>
            <div className="w-4 h-4 bg-gradient-to-bl from-gray-300 to-primary rounded-lg shadow-sm"></div>
          </div>
        </div>

      </section>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
