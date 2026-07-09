import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Falta session_id." }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: order } = await admin
    .from("orders")
    .select("id, status, total_cents, currency, created_at")
    .eq("stripe_checkout_session_id", sessionId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Pedido no encontrado." }, { status: 404 });
  }

  const { data: items } = await admin
    .from("order_items")
    .select("product_name, unit_price_cents, quantity")
    .eq("order_id", order.id);

  return NextResponse.json({ order, items: items ?? [] });
}
