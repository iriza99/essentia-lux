"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    const redirectTo = searchParams.get("redirectTo") || "/mi-cuenta";
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto">
      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#6A806C] to-[#AF7E44] px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Iniciar sesión</h1>
          <p className="text-white/80 mt-2">Accede a tu cuenta de Essentia Lux</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-black focus:border-[#6A806C] focus:bg-white transition-all duration-200 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-[#AF7E44] font-semibold hover:underline">
              Regístrate
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
