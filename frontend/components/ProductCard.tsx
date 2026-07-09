import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/tienda/${product.slug}`}
      className="group block rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative w-full h-56 bg-gray-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-secondary font-semibold mt-2">
          {formatPrice(product.price_cents, product.currency)}
        </p>
        {product.stock <= 0 && (
          <p className="text-red-500 text-xs font-semibold mt-1">
            Agotado
          </p>
        )}
      </div>
    </Link>
  );
}
