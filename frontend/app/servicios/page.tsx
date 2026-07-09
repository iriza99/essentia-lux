'use client';

import ServicioBox from "@/components/ServicioBox";
import CremaBox from "@/components/CremaBox";
import AvatarServices from "@/components/avatar-services";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaGift, FaFlask, FaWhatsapp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const servicios = [
  {
    file: "/Valoración diagnostica.jpg",
    title: "Valoración diagnóstica",
    description: "Se realiza un análisis integral de la piel y las condiciones médicas, evaluamos las expectativas de los resultados y ofrecemos diferentes opciones de tratamiento.(Gratuito si se realiza algún procedimiento)",
    price: "40"
  },
  {
    file: "/Valoración estetica y asesoramiento dermocosmeticos.JPG",
    title: "Valoración estética y asesoramiento dermocosméticos",
    description: "Se realiza un análisis integral de la piel y de las condiciones médicas, evaluamos las expectativas de los resultados y ofrecemos diferentes opciones de tratamiento. Incluye una valoración diagnóstica enfocada en las necesidades específicas de tu piel, tanto faciales como corporales, y el asesoramiento de un tratamiento dermocosmético para el cuidado en casa, que el paciente se aplicará de forma personalizada para mejorar la calidad y el estado de la piel.",
    price: "70"
  },
  {
    file: "/Peeling químico facial.PNG",
    title: "Peeling químico facial",
    description: "El tratamiento se adapta a las características y tipo de tu piel, utilizando un producto cuidadosamente seleccionado que provoca una suave y controlada renovación. Este proceso estimula la regeneración celular y activa la producción natural de colágeno, revelando una piel visiblemente más suave, luminosa y uniforme.",
    price: ""
  },
  {
    file: "/Mesoterapia facial, cuello, escote y manos.jpeg",
    title: "Mesoterapia facial, cuello, escote y manos",
    description: "Microinyecciones de vitaminas, minerales y ácido hialurónico para revitalizar la piel, mejorar su luminosidad y firmeza.",
    price: ""
  },
  {
    file: "/Mesoterapia capilar.png",
    title: "Mesoterapia capilar",
    description: "Su objetivo principal es nutrir y revitalizar los folículos pilosos, mejorar la microcirculación sanguínea local, estimular el crecimiento del cabello y reducir su caída.",
    price: ""
  },
  {
    file: "/Mesoterapia lipolítica.png",
    title: "Mesoterapia lipolítica",
    description: "Aplicación de microinyecciones en la piel con sustancias específicas (como vitaminas, aminoácidos, enzimas o compuestos lipolíticos) que favorecen la disolución de la grasa localizada y mejoran la microcirculación.",
    price: ""
  },
  {
    file: "/Carboxiterapia facial.jpg",
    title: "Carboxiterapia facial",
    description: "Estimula la microcirculación sanguínea, favorece la oxigenación de los tejidos, activa la producción de colágeno y elastina, y mejora la textura, luminosidad y firmeza cutánea.",
    price: ""
  },
  {
    file: "/Carboxiterapia corporal.jpg",
    title: "Carboxiterapia corporal",
    description: "Este procedimiento mejora la microcirculación sanguínea, estimula la oxigenación de los tejidos y favorece la eliminación de la grasa localizada. Además, contribuye a reducir la celulitis, mejorar la flacidez y la textura de la piel, logrando una silueta más firme y uniforme sin necesidad de cirugía.",
    price: ""
  },
  {
    file: "/Plasma rico en plaquetas facial y capilar.jpg",
    title: "Bioestimulación cutánea autóloga facial y capilar",
    description: "Es un procedimiento seguro, natural y mínimamente invasivo, que aprovecha los propios recursos del cuerpo para rejuvenecer y revitalizar la piel y el cabello.",
    price: ""
  },
  {
    file: "/Relleno de labios.PNG",
    title: "Relleno de labios",
    description: "Procedimiento con ácido hialurónico con el fin de aumentar su volumen, mejorar su hidratación, definir su contorno y corregir asimetrías.",
    price: ""
  },
  {
    file: "/Rellenos dérmicos.jpg",
    title: "Relleno facial",
    description: "Tratamiento con ácido hialurónico o hidroxiapatita cálcica para restaurar volumen facial, suavizar arrugas y mejorar el contorno, logrando un rejuvenecimiento natural y duradero.",
    price: ""
  },
  {
    file: "/Hilos tensores.jpg",
    title: "Hilos tensores",
    description: "Procedimiento no quirúrgico que estimula la producción de colágeno y tensa la piel, logrando un efecto lifting natural, inmediato y progresivo.",
    price: ""
  },
  {
    file: "/Rejuvenecimiento tercio superior y escote con neuromodulador.jpg",
    title: "Rejuvenecimiento tercio superior y escote con neuromodulador",
    description: "Relaja de forma precisa los músculos responsables de las líneas de expresión, logrando un rostro más fresco y natural. Resultados visibles en pocos días, previniendo la formación de arrugas permanentes.",
    price: ""
  },
  {
    file: "/Infiltración de toxina botulínica para bruxismo.jpg",
    title: "Infiltración de toxina botulínica para bruxismo",
    description: "El neuromodulador se infiltra en los músculos maseteros para disminuir la tensión y el desgaste dental, aliviar el dolor y estilizar el tercio inferior del rostro.",
    price: ""
  },
  {
    file: "/Infiltración de toxina botulínica para hiperhidrosis.jpg",
    title: "Infiltración de toxina botulínica para hiperhidrosis",
    description: "El neuromodulador se aplica en axilas, manos, pies u otras zonas con sudoración excesiva para bloquear de forma temporal la actividad de las glándulas sudoríparas, logrando una reducción significativa de la sudoración.",
    price: ""
  },
  {
    file: "/Rinomodelación.png",
    title: "Rinomodelación",
    description: "Este tratamiento se utiliza para armonizar el perfil nasal, disimular irregularidades, levantar ligeramente la punta o suavizar el dorso, logrando un aspecto más equilibrado y natural del rostro.",
    price: ""
  },
  {
    file: "/Crioterapia.jpg",
    title: "Crioterapia",
    description: "Es un procedimiento seguro, no invasivo, que permite mejorar la silueta corporal, textura cutánea y firmeza sin cirugía.",
    price: ""
  },
  {
    file: "/Radiofrecuencia facial.jpeg",
    title: "Radiofrecuencia Facial",
    description: "Su objetivo principal es estimular la producción de colágeno y elastina, mejorar la elasticidad y firmeza de la piel, y reducir arrugas, flacidez y signos de envejecimiento.",
    price: ""
  },
  {
    file: "/Radiofrecuencia Corporal.jpg",
    title: "Radiofrecuencia Corporal",
    description: "Es un procedimiento seguro, indoloro y no requiere tiempo de recuperación, ideal para modelar y rejuvenecer el cuerpo sin cirugía.",
    price: ""
  },
  {
    file: "/Cavitación.jpg",
    title: "Cavitación",
    description: "La cavitación es un tratamiento no invasivo que ayuda a eliminar la grasa localizada mediante ondas ultrasónicas. Estas ondas actúan sobre las células de grasa, facilitando que el cuerpo las elimine de forma natural. Es un procedimiento seguro, indoloro y sin cirugía, ideal para mejorar la silueta y el contorno corporal de manera rápida y eficaz.",
    price: ""
  },
  {
    file: "/Lipoláser.jpg",
    title: "Lipoláser",
    description: "El LipoLaser es un tratamiento no invasivo que ayuda a eliminar la grasa localizada y remodelar la silueta corporal.",
    price: ""
  },
];

const combos = [
  {
    file: "/Sculpt Lux.png",
    title: "Sculpt Lux",
    description: "1 Sesión de crioterapia, 2 sesiones radiofrecuencia corporal, 1 cavitación, protocolo lipolítico, 10 sesiones de mesoterapia, asesoramiento personalizado y seguimientos.",
    price: ""
  },
  {
    file: "/Renova Lux capilar.jpg",
    title: "Renova Lux capilar",
    description: "6 Sesiones de Mesoterapia capilar, 2 sesiones PRP capilar, asesoramiento para tratamiento oral y tópico.",
    price: ""
  },
  {
    file: "/Carboxiterapia corporal.jpg",
    title: "pack carboxi glow",
    description: "5 Sesiones de Carboxiterapia facial, asesoramiento personalizado y fórmula magistral.",
    price: ""
  },
  {
    file: "/Regenera Lux.jpg",
    title: "Regenera Lux",
    description: "PRP facial, Peeling facial, asesoramiento personalizado de fórmula magistral.",
    price: ""
  },
  {
    file: "/Essentia Smile.png",
    title: "Essentia Smile",
    description: "Relleno labial 1 vial, neuromodulador 1 vial.",
    price: ""
  },
  {
    file: "/Essentia Fresh.jpg",
    title: "Essentia Fresh",
    description: "1 Sesión de Mesoterapia facial (Skin firm ang lift), 1 sesión con Neuromodulador, asesoramiento personalizado de fórmula magistral.",
    price: ""
  },
  {
    file: "/Radiofrecuencia facial.jpeg",
    title: "Ritual Lux Lift",
    description: "5 Sesiones de Radiofrecuencia facial.",
    price: ""
  },
  {
    file: "/Cavitación.jpg",
    title: "Método Reductor Essentia",
    description: "10 Sesiones de Cavitación.",
    price: ""
  },
  {
    file: "/Lipoláser.jpg",
    title: "Tratamiento Lux Shape",
    description: "10 Sesiones de Lipolaser.",
    price: ""
  },
  {
    file: "/Carboxiterapia facial.jpg",
    title: "Carboxi Eyes",
    description: "5 Sesiones de Carboxiterapia palpebral.",
    price: ""
  }
];
  
const cremas = [
  // PRODUCTOS FACIALES
  {
    file: "/AGE ELEMENT  FIRMING CONCENTRATE 30 ML.png",
    title: "Age Element Firming Concentrate 30 ML",
    description: "Un tratamiento intensivo diseñado para combatir la flacidez y la pérdida de firmeza. Su fórmula avanzada actúa sobre los primeros signos de la edad, revitalizando la piel apagada y devolviéndole la elasticidad perdida.",
    beneficios: ["Combate la flacidez", "Revitaliza la piel", "Restaura elasticidad"],
    metodoUso: [
      "Su aplicación es tópica y facial, 2 veces al día",
      "Mañana y noche",
      "Con 3 a 4 gotas sobre la piel limpia y seca",
      "Masajeando hasta su completa absorción",
      "Siempre antes de la crema de tratamiento y protección solar"
    ],
    price: "89.54",
    categoria: "facial"
  },
  {
    file: "/AGE ELEMENT ANTI-WRINKLE  CONCENTRATE  30 ML.png",
    title: "Age Element Anti-Wrinkle Concentrate 30 ML",
    description: "Un tratamiento de choque diseñado para actuar de forma intensiva sobre las arrugas marcadas y profundas.",
    beneficios: ["Reduce arrugas profundas", "Acción intensiva", "Efecto tensor"],
    metodoUso: [
      "Se aplican 3 o 4 gotas sobre la piel limpia y seca",
      "Del rostro, cuello y escote por la mañana",
      "Masajeando hasta su completa absorción",
      "Se usa antes de la crema de tratamiento habitual",
      "Siempre con protección solar para alisar y rellenar las arrugas"
    ],
    price: "89.54",
    categoria: "facial"
  },
  {
    file: "/SKIN 0,3 50 ML.png",
    title: "Skin 0,3 50 ML",
    description: "Diseñado para ofrecer una transformación global a la piel. Actúa eficazmente sobre los principales signos del envejecimiento y las imperfecciones. El resultado es una piel visiblemente más lisa, firme, unificada y radiante.",
    beneficios: ["Piel más lisa", "Firmeza visible", "Unifica el tono"],
    metodoUso: [
      "Aplicación nocturna en rostro, cuello y escote",
      "Iniciar con una frecuencia de días alternos",
      "Aumentando progresivamente hasta el uso diario",
      "Siempre que la piel lo tolere bien"
    ],
    price: "79.90",
    categoria: "facial"
  },
  {
    file: "/AOX FERULIC 30 ML.png",
    title: "AOX Ferulic 30 ML",
    description: "Un potente escudo protector que revitaliza la piel desde la primera aplicación. Este sérum de vanguardia está formulado para combatir los signos visibles del envejecimiento y el estrés oxidativo. Su triple acción intensiva: Restaura la luminosidad, reduce arrugas y restaura la firmeza.",
    beneficios: ["Protección antioxidante", "Restaura luminosidad", "Reduce arrugas"],
    metodoUso: [
      "Aplica 3-5 gotas (mañana - noche)",
      "Sobre la piel limpia y seca de rostro, cuello y escote",
      "Evitando el contorno de ojos",
      "Masajea suavemente hasta su completa absorción"
    ],
    price: "127.80",
    categoria: "facial"
  },
  {
    file: "/BRIGHTENING FOAM 100  ML.png",
    title: "Brightening Foam 100 ML",
    description: "Más que un limpiador. Esta espuma cremosa con AHAs es el primer paso para un rostro luminoso. Realiza una microexfoliación diaria que unifica el tono y mejora la textura. Ideal para pieles normales/mixtas, deja la piel fresca, suave y radiante.",
    beneficios: ["Limpieza profunda", "Microexfoliación", "Unifica el tono"],
    metodoUso: [
      "Tópico, aplicar y masajear en la noche",
      "Posteriormente aclarar"
    ],
    price: "23.20",
    categoria: "facial"
  },
  {
    file: "/BLEMIDERM TREATMENT 50 ML.png",
    title: "Blemiderm Treatment 50 ML",
    description: "Para pieles grasas con acné activo. Controla el sebo, desobstruye poros, previene y reduce imperfecciones (granos y espinillas) y unifica el tono.",
    beneficios: ["Controla el sebo", "Previene imperfecciones", "Unifica el tono"],
    metodoUso: [
      "Aplicar en la noche",
      "No aclarar"
    ],
    price: "50.00",
    categoria: "facial"
  },
  {
    file: "/MELAN TRAN3X GEL CREAM  50 ML.png",
    title: "Melan Tran3x Gel Cream 50 ML",
    description: "Su avanzada fórmula actúa sobre los diferentes mecanismos de formación de la mancha para reducir visiblemente la pigmentación existente, prevenir la aparición de nuevas manchas y unificar el tono de la piel. Su textura en gel-crema se absorbe rápidamente, dejando un acabado confortable.",
    beneficios: ["Reduce pigmentación", "Previene manchas", "Unifica tono"],
    metodoUso: [
      "Aplicar en la noche",
      "No aclarar"
    ],
    price: "79.90",
    categoria: "facial"
  },
  {
    file: "/MESOPROTECH MELAN 130 PIGMENT CONTROL.png",
    title: "Mesoprotech Melan 130 Pigment Control",
    description: "Protector solar de muy alta protección UVB/UVA con color. Específicamente formulado para prevenir manchas y controlar la hiperpigmentación.",
    beneficios: ["Protección SPF 130", "Previene manchas", "Con color"],
    metodoUso: [
      "Aplicar en el rostro",
      "No aclarar"
    ],
    price: "41.50",
    categoria: "facial"
  },
  {
    file: "/COUPEREND CREAM  50 ML.png",
    title: "Couperend Cream 50 ML",
    description: "Un tratamiento de rescate diseñado específicamente para las pieles más reactivas, sensibles, con cuperosis o rosácea. Su objetivo: aportar el máximo de alivio de inmediato, descongestionar las zonas enrojecidas y minimizar la dilatación, el picor y el ardor.",
    beneficios: ["Calma pieles sensibles", "Reduce enrojecimiento", "Alivia ardor"],
    metodoUso: [
      "Mañana y noche",
      "No aclarar"
    ],
    price: "50.00",
    categoria: "facial"
  },

  // PRODUCTOS CAPILARES
  {
    file: "/TRICOLOGY HAIR LOSS ORAL SUPPLEMENT.png",
    title: "Tricology Hair Loss Oral Supplement",
    description: "Un suplemento nutricional formulado científicamente como coadyuvante en los tratamientos para la alopecia (caída del cabello). Su objetivo es actuar desde el interior, aportando los nutrientes esenciales que el folículo piloso necesita para fortalecer el anclaje del cabello. Ayuda a frenar la caída y a estimular el crecimiento de cabello nuevo y más sano.",
    beneficios: ["Fortalece desde el interior", "Frena la caída", "Estimula crecimiento"],
    metodoUso: [
      "Oral, 1 con diario",
      "En las mañanas"
    ],
    price: "49.00",
    categoria: "capilar"
  },
  {
    file: "/TRICOLOGY HAIR LOSS LOTION.png",
    title: "Tricology Hair Loss Lotion",
    description: "Se debe aplicar sobre el cuero cabelludo limpio y seco por la noche, en días alternos, utilizando un vial por semana, que se dosifica en tres aplicaciones. Aplicar en la noche, no aclarar, día de por medio, un vial para 7-9 días. Actúa sobre el cuero cabelludo, revitaliza el folículo y fortalece el anclaje. Ayuda a frenar la caída y mejora la densidad.",
    beneficios: ["Revitaliza el folículo", "Fortalece anclaje", "Mejora densidad"],
    metodoUso: [
      "Se debe aplicar sobre el cuero cabelludo limpio y seco por la noche",
      "En días alternos",
      "Utilizando un vial por semana, que se dosifica en tres aplicaciones",
      "Aplicar en la noche, no aclarar",
      "Día de por medio, un vial para 7-9 días"
    ],
    price: "76.00",
    categoria: "capilar"
  },
  {
    file: "/TRICOLOGY HAIR LOSS SHAMPOO.png",
    title: "Tricology Hair Loss Shampoo",
    description: "Champú estimulante para alopecia. Limpia suavemente, fortalece y prepara el cuero cabelludo para optimizar la absorción del tratamiento tópico.",
    beneficios: ["Limpieza suave", "Fortalece cabello", "Prepara para tratamiento"],
    metodoUso: [
      "Aplicar, dejar actuar 5 minutos",
      "Aclarar"
    ],
    price: "38.00",
    categoria: "capilar"
  },

  // PRODUCTO CORPORAL
  {
    file: "/BODYSHOCK INTENSIVE MIST 150 ML.png",
    title: "Bodyshock Intensive Mist 150 ML",
    description: "Un tratamiento corporal de acción localizada diseñado para combatir la celulitis más persistente. Su formato en bruma de fácil aplicación permite una absorción rápida. Actúa mejorando la textura de la piel y ayudando a alisar la 'piel de naranja'.",
    beneficios: ["Combate celulitis", "Mejora textura", "Alisa piel de naranja"],
    metodoUso: [
      "Tópico, aplicar (mañana - noche)",
      "No aclarar"
    ],
    price: "75.00",
    categoria: "corporal"
  },
];

export default function ServiciosPage() {
  const [seccionActiva, setSeccionActiva] = useState('servicios');
  const [categoriaCremas, setCategoriaCremas] = useState('todas');
  const [cremaSeleccionada, setCremaSeleccionada] = useState<typeof cremas[0] | null>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (cremaSeleccionada) {
      console.log('🟢 Modal abierto:', cremaSeleccionada.title);
      
      // Guardar la posición actual del scroll
      scrollPositionRef.current = window.scrollY;
      console.log('📍 Posición scroll guardada:', scrollPositionRef.current);
      
      // PRIMERO: Hacer scroll al inicio de la página INMEDIATAMENTE
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
      
      // LUEGO: Bloquear scroll del body
      requestAnimationFrame(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = '0px';
        document.body.style.left = '0px';
        document.body.style.right = '0px';
        document.body.style.width = '100%';
        document.body.style.height = '100vh';
        
        // Asegurar que el overlay también esté en 0
        if (modalOverlayRef.current) {
          modalOverlayRef.current.scrollTop = 0;
          console.log('✅ Overlay scroll reseteado');
        }
      });
      
    } else if (scrollPositionRef.current > 0) {
      console.log('🔴 Modal cerrado, restaurando scroll a:', scrollPositionRef.current);
      
      // Restaurar estilos del body
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      // Restaurar la posición de scroll original
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          left: 0,
          behavior: 'instant' as ScrollBehavior
        });
      });
    }
  }, [cremaSeleccionada]);

  const categorias = [
    { id: 'todas', nombre: 'Todas' },
    { id: 'facial', nombre: 'Facial' },
    { id: 'corporal', nombre: 'Corporal' },
    { id: 'capilar', nombre: 'Capilar' }
  ];

  const cremasFiltradas = categoriaCremas === 'todas' 
    ? cremas 
    : cremas.filter(crema => crema.categoria === categoriaCremas);

  return (
    <div className="relative w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      
      {/* Avatar solo visible en pantallas grandes */}
      <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-10">
        <AvatarServices />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Título responsivo */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-secondary">
            Nuestros Servicios
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4 mb-6 sm:mb-8">
            Tratamientos personalizados para realzar tu belleza natural y cuidar tu piel.
          </p>

          {/* Botones de navegación - 3 botones */}
          <div className="flex justify-center">
            <div className="bg-white/70 backdrop-blur-md p-1 rounded-2xl shadow-lg border border-white/20 flex flex-col sm:flex-row gap-1 sm:gap-0">
              <button
                onClick={() => setSeccionActiva('servicios')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base ${
                  seccionActiva === 'servicios'
                    ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <FaCalendarAlt className="text-xs sm:text-sm" />
                <span className="whitespace-nowrap">Servicios disponibles</span>
              </button>
              <button
                onClick={() => setSeccionActiva('combos')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base ${
                  seccionActiva === 'combos'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <FaGift className="text-xs sm:text-sm" />
                <span className="whitespace-nowrap">Paquetes Especiales</span>
              </button>
              <button
                onClick={() => setSeccionActiva('cremas')}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base ${
                  seccionActiva === 'cremas'
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <FaFlask className="text-xs sm:text-sm" />
                <span className="whitespace-nowrap">Productos disponibles</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECCIÓN: SERVICIOS */}
        {seccionActiva === 'servicios' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {servicios.map((servicio, index) => (
                <ServicioBox key={index} data={servicio} />
              ))}
            </div>

            {/* Línea divisora decorativa */}
            <div className="my-8 sm:my-12 md:my-16 flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-3xl mx-auto"></div>
            </div>
          </motion.div>
        )}

        {/* SECCIÓN: COMBOS */}
        {seccionActiva === 'combos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Descripción de combos */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-purple-600 font-medium text-base sm:text-lg md:text-xl">
                ✨ ¡Ahorra tiempo y dinero combinando tratamientos! ✨
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Programas diseñados para resultados óptimos con descuentos especiales
              </p>
            </div>

            {/* Grid de combos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {combos.map((combo, index) => (
                <ServicioBox key={index} data={combo} />
              ))}
            </div>

            {/* Línea divisora decorativa */}
            <div className="my-8 sm:my-12 md:my-16 flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-3xl mx-auto"></div>
            </div>
          </motion.div>
        )}

        {/* SECCIÓN: CREMAS */}
        {seccionActiva === 'cremas' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Descripción de cremas */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-primary font-medium text-base sm:text-lg md:text-xl">
                ✨ Productos de alta calidad para el cuidado diario ✨
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Nuestra línea exclusiva de cremas y tratamientos faciales con servicio a domicilio
              </p>
            </div>

            {/* Filtros por categoría */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() => setCategoriaCremas(categoria.id)}
                  className={`
                    px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-medium text-xs sm:text-sm md:text-base
                    transition-all duration-300 touch-target
                    ${categoriaCremas === categoria.id
                      ? 'bg-primary text-white shadow-primary'
                      : 'bg-white text-textprimario hover:bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  {categoria.nombre}
                </button>
              ))}
            </div>

            {/* Grid de cremas - CON COMPONENTE CremaBox - 3 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {cremasFiltradas.map((crema, index) => (
                <CremaBox 
                  key={index}
                  data={crema}
                  onVerDetalles={() => setCremaSeleccionada(crema)}
                />
              ))}
            </div>

            {/* Mensaje si no hay productos */}
            {cremasFiltradas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-textsecundario text-base sm:text-lg">
                  No hay productos disponibles en esta categoría
                </p>
              </div>
            )}


            {/* Línea divisora decorativa */}
            <div className="my-8 sm:my-12 md:my-16 flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-3xl mx-auto"></div>
            </div>
          </motion.div>
        )}

        {/* Espacio final */}
        <div className="h-12 sm:h-16 md:h-24" />
      </div>

      {/* MODAL DE MÉTODO DE USO - OPTIMIZADO PARA MÓVIL */}
      <AnimatePresence mode="wait">
        {cremaSeleccionada && (
          <motion.div
            ref={modalOverlayRef}
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999999,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              overflowY: 'scroll',
              WebkitOverflowScrolling: 'touch',
              isolation: 'isolate'
            }}
            onClick={() => {
              console.log('🔴 Cerrar modal - click en overlay');
              setCremaSeleccionada(null);
            }}
          >
            <motion.div
              key={`modal-${cremaSeleccionada.title}`}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                backgroundColor: 'white',
                borderRadius: '0',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                width: '100%',
                maxWidth: '100%',
                minHeight: '100vh',
                position: 'relative',
                zIndex: 1000000,
                isolation: 'isolate'
              }}
              className="sm:rounded-3xl sm:max-w-2xl sm:min-h-0 sm:my-8 sm:mx-4"
              onClick={(e) => {
                e.stopPropagation();
                console.log('✅ Click dentro del modal - no cerrar');
              }}
            >
              {/* Header del modal con imagen */}
              <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden sm:rounded-t-3xl">
                <Image
                  src={cremaSeleccionada.file}
                  alt={cremaSeleccionada.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Botón cerrar - MÁS GRANDE Y VISIBLE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('🔴 Cerrar modal - botón X');
                    setCremaSeleccionada(null);
                  }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white rounded-full p-2.5 sm:p-3 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg z-10"
                  style={{ touchAction: 'manipulation' }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Título sobre la imagen */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1.5 sm:mb-2">
                    {cremaSeleccionada.title}
                  </h3>
                  <span className="inline-block bg-primary text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium capitalize">
                    {cremaSeleccionada.categoria}
                  </span>
                </div>
              </div>

              {/* Contenido del modal - SCROLL INTERNO */}
              <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto pb-8" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
                {/* Descripción */}
                <div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {cremaSeleccionada.description}
                  </p>
                </div>

                {/* Beneficios */}
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-secondary mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">✨</span>
                    Beneficios
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {cremaSeleccionada.beneficios.map((beneficio, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-green-50 p-2.5 sm:p-3 rounded-lg">
                        <span className="text-green-600 text-sm sm:text-base mt-0.5">✓</span>
                        <span className="text-xs sm:text-sm text-gray-700">{beneficio}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Método de uso - DESTACADO */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-primary/20">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">📋</span>
                    Método de Uso
                  </h4>
                  <div className="space-y-2.5 sm:space-y-3">
                    {cremaSeleccionada.metodoUso.map((paso, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 sm:gap-3 bg-white/80 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm"
                      >
                        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed pt-0.5 sm:pt-1">
                          {paso}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Precio - AHORA HACE SCROLL CON TODO */}
                <div className="pt-3 sm:pt-4 border-t-2 border-gray-200 space-y-3 sm:space-y-4">
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Precio</p>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                      €{cremaSeleccionada.price}
                    </p>
                  </div>

                  {/* Botón WhatsApp - SOLO EN DESKTOP */}
                  <motion.a
                    href={`https://wa.me/34691589789?text=${encodeURIComponent(
                      `¡Hola! Me interesa el producto: ${cremaSeleccionada.title}\nPrecio: €${cremaSeleccionada.price}\n¿Podrían darme más información?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:flex w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 sm:py-3.5 px-4 rounded-lg transition-all duration-300 items-center justify-center gap-2 text-sm sm:text-base shadow-lg active:scale-95"
                    style={{ 
                      touchAction: 'manipulation',
                      backgroundColor: '#6A806C'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp className="text-lg sm:text-xl" />
                    Consultar por WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
