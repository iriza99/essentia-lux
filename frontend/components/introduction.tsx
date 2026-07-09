'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaClock, FaUsers, FaEye, FaBullseye } from 'react-icons/fa';
import { introductionData } from '../data';

const Introduction = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative z-20 w-full min-h-screen bg-white">
      {/* Elemento decorativo de fondo - colores formales */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-br from-gray-100 to-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-tr from-primary/5 to-gray-100 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Título principal - gradiente dorado elegante */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {introductionData.tituloPrincipal}
          </motion.h1>
          
          <motion.div 
            className="w-20 sm:w-24 h-1 bg-gradient-gold mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        {/* Descripción principal */}
        <motion.div 
          className="card-premium mb-8 sm:mb-12"
          variants={cardVariants}
        >
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700 text-center font-medium">
            {introductionData.descripcion}
          </p>
        </motion.div>

        {/* Misión y Visión - colores formales */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <motion.div 
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-elegant border border-gray-200 hover:shadow-elegant-lg transition-all duration-300"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2.5 sm:p-3 bg-gray-200 rounded-full">
                <FaBullseye className="text-gray-800 text-xl sm:text-2xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Misión</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify text-base sm:text-lg md:text-xl">
              {introductionData.mision}
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-elegant border border-gray-200 hover:shadow-elegant-lg transition-all duration-300"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2.5 sm:p-3 bg-gray-200 rounded-full">
                <FaEye className="text-gray-800 text-xl sm:text-2xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Visión</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify text-base sm:text-lg md:text-xl">
              {introductionData.vision}
            </p>
          </motion.div>
        </div>

        {/* Frase inspiradora - dorado elegante */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          variants={itemVariants}
        >
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light italic text-gray-800 leading-relaxed max-w-4xl mx-auto relative px-8 sm:px-12">
            <span className="text-4xl sm:text-6xl text-primary/20 absolute -top-4 sm:-top-6 -left-2 sm:-left-4">"</span>
            {introductionData.fraseInspiradora}
            <span className="text-4xl sm:text-6xl text-primary/20 absolute -bottom-8 sm:-bottom-12 -right-2 sm:-right-4">"</span>
          </blockquote>
        </motion.div>

        {/* Ubicación */}
        <motion.div 
          className="card-premium mb-8 sm:mb-12"
          variants={cardVariants}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="p-2.5 sm:p-3 bg-primary/10 rounded-full">
              <FaMapMarkerAlt className="text-primary text-xl sm:text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Nuestra Ubicación</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-elegant border-4 border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={introductionData.mapaImagen}
                  alt="Mapa de ubicación"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed text-center lg:text-left font-medium">
                {introductionData.direccion}
              </p>
              
              <motion.a
                href={introductionData.mapasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMapMarkerAlt className="text-base sm:text-lg" />
                Ver en Google Maps
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Equipo */}
        <motion.div 
          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-elegant border border-gray-200 mb-8 sm:mb-12"
          variants={cardVariants}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="p-2.5 sm:p-3 bg-gray-100 rounded-full">
              <FaUsers className="text-gray-800 text-xl sm:text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{introductionData.equipoTitulo}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed text-justify font-medium">
                {introductionData.equipoDescripcion}
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line text-justify font-medium">
                {introductionData.equipoDetalles}
              </p>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-gold rounded-full blur-xl opacity-20"></div>
                <Image
                  src="/imagen_circular_recortada.png"
                  alt={introductionData.equipoNombre}
                  width={250}
                  height={250}
                  className="relative rounded-full shadow-2xl border-4 border-white w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Horarios y Contacto */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Horarios */}
          <motion.div 
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-elegant border border-gray-200"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2.5 sm:p-3 bg-primary/10 rounded-full">
                <FaClock className="text-primary text-xl sm:text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{introductionData.horariosTitulo}</h2>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {introductionData.horarios.map((hora, i) => (
                <motion.p 
                  key={i}
                  className="text-gray-700 p-3 sm:p-4 bg-white rounded-lg text-center text-base sm:text-lg font-medium border border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {hora}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Contacto */}
          <motion.div 
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-elegant border border-gray-200"
            variants={cardVariants}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{introductionData.contactoTitulo}</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <motion.a
                href={`${introductionData.whatsapp.url}?text=${encodeURIComponent(
                  '¡Hola! Estoy interesad@ en recibir información sobre los tratamientos médico estéticos. ¿Me puedes ayudar?'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 group border-2 border-gray-200 hover:border-primary shadow-sm hover:shadow-elegant"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp className="text-green-500 text-2xl sm:text-3xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-gray-900 text-base sm:text-lg">WhatsApp</p>
                  <p className="text-sm sm:text-base text-gray-600">{introductionData.whatsapp.numero}</p>
                </div>
              </motion.a>

              <motion.a
                href={introductionData.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 group border-2 border-gray-200 hover:border-primary shadow-sm hover:shadow-elegant"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaInstagram className="text-pink-500 text-2xl sm:text-3xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-gray-900 text-base sm:text-lg">Instagram</p>
                  <p className="text-sm sm:text-base text-gray-600">Síguenos en redes</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="h-12 sm:h-20" />
      </motion.div>
    </div>
  );
};

export default Introduction;
