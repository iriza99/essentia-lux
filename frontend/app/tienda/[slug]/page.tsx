import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/types/product";

export const revalidate = 60;

export default async function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("active", true)
    .single<Product>();

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative w-full h-80 md:h-full min-h-[320px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-2xl font-semibold text-secondary mt-3">
          {formatPrice(product.price_cents, product.currency)}
        </p>

        {product.description && (
          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-8">
          {product.stock > 0 ? (
            <AddToCartButton product={product} />
          ) : (
            <p className="text-red-500 font-semibold">Producto agotado</p>
          )}
        </div>
      </div>
    </div>
  );
}
