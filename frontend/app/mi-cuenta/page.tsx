import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/types/product";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente de pago",
  paid: "Pagado",
  failed: "Fallido",
  refunded: "Reembolsado",
};

export default async function MiCuentaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, is_member, member_discount_percent")
    .eq("id", user.id)
    .single();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, status, total_cents, currency, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#6A806C] to-[#AF7E44] px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Mi cuenta</h1>
          <p className="text-white/80 mt-2">{user.email}</p>
        </div>

        <div className="p-8 space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">Nombre:</span>{" "}
            {profile?.full_name || "—"}
          </p>

          {profile?.is_member && (
            <div className="bg-[#AF7E44]/10 border border-[#AF7E44]/30 rounded-xl p-4">
              <p className="text-[#AF7E44] font-semibold">
                Socio de Essentia Lux
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Disfrutas de un {profile.member_discount_percent}% de
                descuento en la tienda.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Historial de pedidos
        </h2>
        {!orders || orders.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Todavía no has realizado ningún pedido.
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between text-sm border-b border-gray-100 pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(order.created_at).toLocaleDateString("es-ES")}
                  </p>
                  <p className="text-gray-500">
                    {STATUS_LABELS[order.status] || order.status}
                  </p>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatPrice(order.total_cents, order.currency)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
