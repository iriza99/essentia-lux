"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Resena {
  nombre: string;
  calificacion: number;
  comentario: string;
}

export default function Resenas() {
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [form, setForm] = useState<Resena>({
    nombre: "",
    calificacion: 5,
    comentario: "",
  });
  const [loading, setLoading] = useState(false);
  const [cargandoResenas, setCargandoResenas] = useState(true);

  useEffect(() => {
    cargarResenasSheets();
  }, []);

  const cargarResenasSheets = async () => {
    setCargandoResenas(true);
    try {
      const res = await axios.get<[string, string, string][]>(
        "https://essentialux-1.onrender.com/resenas"
      );
      const parsed: Resena[] = res.data.map(([nombre, estrellas, comentario]) => ({
        nombre,
        calificacion: estrellas.replace(/[^⭐]/g, "").length,
        comentario,
      }));
      setResenas(parsed);
    } catch (error) {
      console.error("Error cargando reseñas de Sheets:", error);
    } finally {
      setCargandoResenas(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim() || !form.comentario.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://essentialux-1.onrender.com/resenas", form);
      alert("¡Gracias por tu reseña!");
      setForm({ nombre: "", calificacion: 5, comentario: "" });
      await cargarResenasSheets();
    } catch (error) {
      console.error("Error enviando reseña:", error);
      alert("Ocurrió un error al guardar tu reseña.");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const renderInteractiveStars = (
    currentRating: number,
    onChange: (rating: number) => void
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="hover:scale-110 transition-transform duration-150"
          >
            <svg
              className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                star <= currentRating
                  ? "text-yellow-400 fill-current hover:text-yellow-500"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-3 text-lg font-semibold text-gray-700">
          {currentRating} estrella{currentRating !== 1 ? "s" : ""}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        {/* Header con animación */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-gradient-to-r from-[#6A806C] to-[#AF7E44] rounded-full shadow-lg mb-4">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#6A806C] to-[#AF7E44] bg-clip-text text-transparent">
            Reseñas de Nuestros Pacientes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Conoce las experiencias reales de quienes han confiado en nuestros servicios de salud
          </p>
        </div>

        {/* Spinner de carga */}
        {cargandoResenas ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#6A806C]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="animate-pulse bg-[#6A806C] rounded-full h-4 w-4"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-gray-700">Cargando experiencias...</p>
              <p className="text-gray-500">Por favor espere mientras iniciamos el servidor</p>
            </div>
          </div>
        ) : (
          <>
            {/* Estadísticas rápidas */}
            {resenas.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-[#6A806C]">{resenas.length}</div>
                    <div className="text-gray-600">Reseñas totales</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-yellow-500">
                      {resenas.length > 0
                        ? (resenas.reduce((acc, r) => acc + r.calificacion, 0) / resenas.length).toFixed(1)
                        : "0"}
                    </div>
                    <div className="text-gray-600">Promedio</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-green-600">
                      {resenas.filter((r) => r.calificacion >= 4).length}
                    </div>
                    <div className="text-gray-600">Satisfechos</div>
                  </div>
                </div>
              </div>
            )}

            {/* Reseñas existentes */}
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">💬 Opiniones Reales</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#6A806C] to-[#AF7E44] mx-auto rounded-full"></div>
              </div>

              {resenas.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <p className="text-xl text-gray-500">Sé el primero en compartir tu experiencia</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {resenas.map((r, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                    >
                      <div className="p-8 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#6A806C] to-[#AF7E44] rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {r.nombre.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">{r.nombre}</h3>
                              <div className="mt-1">{renderStars(r.calificacion)}</div>
                            </div>
                          </div>
                          <div className="text-gray-400">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                          </div>
                        </div>
                        <blockquote className="text-gray-700 leading-relaxed text-lg italic pl-4 border-l-4 border-[#6A806C]">
                          "{r.comentario}"
                        </blockquote>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Formulario para nueva reseña */}
            <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#6A806C] to-[#AF7E44] px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Comparte Tu Experiencia
                </h2>
                <p className="text-white/80 mt-2">Tu opinión nos ayuda a mejorar continuamente</p>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700">
                    Tu nombre *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
                    placeholder="Escribe tu nombre completo"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="comentario" className="block text-sm font-semibold text-gray-700">
                    Tu comentario *
                  </label>
                  <textarea
                    id="comentario"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none resize-none"
                    placeholder="Comparte tu experiencia con nuestro servicio..."
                    rows={5}
                    value={form.comentario}
                    onChange={(e) => setForm({ ...form, comentario: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Tu calificación *
                  </label>
                  {renderInteractiveStars(form.calificacion, (rating) =>
                    setForm({ ...form, calificacion: rating })
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.nombre.trim() || !form.comentario.trim()}
                  className="w-full bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-4 px-8 rounded-xl hover:from-[#6A806C] hover:to-[#AF7E44] transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                      Enviando tu reseña...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Enviar mi reseña
                    </div>
                  )}
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
