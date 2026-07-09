import Link from "next/link";

export default function PagoCanceladoPage() {
  return (
    <div className="max-w-md mx-auto text-center py-12 space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Pago cancelado</h1>
      <p className="text-gray-600">
        No se ha realizado ningún cargo. Tu carrito sigue disponible si quieres
        completar la compra más tarde.
      </p>
      <Link
        href="/carrito"
        className="inline-block bg-gradient-to-r from-[#6A806C] to-[#AF7E44] text-white py-3 px-8 rounded-xl font-semibold"
      >
        Volver al carrito
      </Link>
    </div>
  );
}
