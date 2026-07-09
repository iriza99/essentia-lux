'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInfoCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

interface CremaBoxProps {
  data: {
    file: string;
    title: string;
    description: string;
    beneficios: string[];
    metodoUso: string[];
    price: string;
    categoria: string;
  };
  onVerDetalles: () => void;
}

const CremaBox = ({ data, onVerDetalles }: CremaBoxProps) => {
  const { file, title, price, categoria } = data;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mensaje de WhatsApp personalizado para el producto
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Me interesa el producto: ${title}\nPrecio: €${price}\n¿Podrían darme más información?`
  );
  const whatsappLink = `https://wa.me/34691589789?text=${whatsappMessage}`;

  // VERSIÓN MÓVIL - SUPER COMPACTA
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      >
        <div className="flex gap-3 p-3">
          {/* Imagen pequeña a la izquierda */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={file}
              alt={title}
              fill
              className="object-cover"
              sizes="96px"
            />
            {/* Badge pequeño */}
            <div className="absolute top-1 right-1 bg-primary/90 px-1.5 py-0.5 rounded-full">
              <span className="text-[8px] font-medium text-white capitalize">
                {categoria}
              </span>
            </div>
          </div>

          {/* Contenido a la derecha */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Título y precio */}
            <div>
              <h3 className="text-xs font-semibold text-primary line-clamp-2 mb-1">
                {title}
              </h3>
              <p className="text-lg font-bold text-secondary">
                €{price}
              </p>
            </div>

            {/* Botones compactos */}
            <div className="flex gap-1.5 mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🔍 Ver detalles móvil:', title);
                  onVerDetalles();
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-white text-[10px] font-semibold py-1.5 px-2 rounded-md flex items-center justify-center gap-1 active:scale-95 transition-transform"
              >
                <FaInfoCircle className="text-xs" />
                Info
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 text-white text-[10px] font-semibold py-1.5 px-2 rounded-md flex items-center justify-center gap-1 active:scale-95 transition-transform"
                style={{ backgroundColor: '#6A806C' }}
              >
                <FaWhatsapp className="text-xs" />
                Chat
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // VERSIÓN DESKTOP - COMPLETA
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-base card-hover group relative overflow-hidden"
    >
      <div className="p-6 h-full flex flex-col relative">
        {/* Imagen del producto */}
        <div className="relative w-full aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-gray-100">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={file}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>

          {/* Badge de categoría */}
          <motion.div 
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
          >
            <span className="text-xs font-medium text-primary capitalize">
              {categoria}
            </span>
          </motion.div>

          {/* Efecto de brillo en hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
            style={{ width: '200%' }}
          />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col flex-1 space-y-3">
          <motion.h3 
            className="text-lg md:text-xl font-semibold text-primary group-hover:text-secondary transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-sm md:text-base text-textsecundario text-justify line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {data.description}
          </motion.p>

          {/* Beneficios */}
          <div className="space-y-1.5">
            {data.beneficios.slice(0, 3).map((beneficio, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                <span className="text-sm text-textprimario">
                  {beneficio}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Línea decorativa */}
          <motion.div 
            className="w-12 h-1 bg-gradient-to-r from-secondary to-primary rounded-full group-hover:w-20 transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />

          {/* Spacer */}
          <div className="flex-1" />

          {/* Precio y botones */}
          <div className="pt-3 border-t border-gray-200 space-y-3 mt-auto">
            <div className="flex items-center justify-between gap-2">
              <motion.span 
                className="text-2xl font-bold text-primary whitespace-nowrap"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                €{price}
              </motion.span>
              <motion.button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🔍 Ver detalles desktop:', title);
                  onVerDetalles();
                }}
                className="btn-primary text-sm px-4 py-2 hover:shadow-lg whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver detalles
              </motion.button>
            </div>
            
            {/* Botón WhatsApp */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm hover:shadow-lg group/wa"
              style={{ backgroundColor: '#6A806C' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp className="text-lg group-hover/wa:animate-pulse" />
              Consultar por WhatsApp
            </motion.a>
          </div>
        </div>
      </div>

      {/* Efectos adicionales */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
      />
    </motion.div>
  );
};

export default CremaBox;
