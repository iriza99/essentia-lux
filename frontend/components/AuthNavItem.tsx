"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export default function AuthNavItem() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoaded(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!loaded) return null;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/mi-cuenta"
          className="text-sm font-semibold text-secondary hover:text-primary transition-colors duration-300"
        >
          Mi cuenta
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-gray-500 hover:text-primary transition-colors duration-300"
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-sm font-semibold text-secondary hover:text-primary transition-colors duration-300"
    >
      Iniciar sesión
    </Link>
  );
}
