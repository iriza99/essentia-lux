"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/types/product";

interface OrderSummary {
  order: {
    id: string;
    status: string;
    total_cents: number;
    currency: string;
  };
  items: { product_name: string; unit_price_cents: number; quantity: number }[];
}

export default function PagoExitoPage() {
  return (
    <Suspense>
      <PagoExitoContent />
    </Suspense>
  );
}

function PagoExitoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [data, setData] = useState<OrderSummary | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    let attempts = 0;
    const poll = async () => {
      attempts += 1;
      const res = await fetch(`/api/orders/by-session?session_id=${sessionId}`);
      if (!res.ok) {
        if (attempts < 5) setTimeout(poll, 1500);
        else setError(true);
        return;
      }
      const json: OrderSummary = await res.json();
      if (json.order.status !== "paid" && attempts < 5) {
        setTimeout(poll, 1500);
        return;
      }
      setData(json);
    };

    poll();
  }, [sessionId]);

  return (
    <div className="max-w-md mx-auto text-center py-12 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">¡Gracias por tu compra!</h1>

      {!data && !error && (
        <p className="text-gray-500">Confirmando tu pago...</p>
      )}

      {error && (
        <p className="text-gray-500">
          Tu pago se ha procesado. Puedes ver el estado del pedido en tu
          cuenta en unos minutos.
        </p>
      )}

      {data && (
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-left space-y-3">
          {data.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm text-gray-700">
              <span>
                {item.quantity} × {item.product_name}
              </span>
              <span>{formatPrice(item.unit_price_cents * item.quantity, data.order.currency)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-100">
            <span>Total</span>
            <span>{formatPrice(data.order.total_cents, data.order.currency)}</span>
          </div>
        </section>
      )}

      <Link
        href="/mi-cuenta"
        className="inline-block bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-3 px-8 rounded-xl font-semibold"
      >
        Ver mis pedidos
      </Link>
    </div>
  );
}
