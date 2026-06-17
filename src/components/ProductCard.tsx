import { Link } from '@tanstack/react-router'
import type { Product } from '../lib/data'
import { formatPrice } from '../lib/data'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const delayClass = `animate-fade-up-delay-${Math.min(index + 1, 6)}`

  return (
    <Link
      to="/shop/$productId"
      params={{ productId: product.id }}
      className={`group block no-underline ${delayClass}`}
    >
      <div className="relative overflow-hidden bg-[#f2ede5] aspect-[4/5] mb-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        {product.tag && (
          <span className="absolute top-4 right-4 text-[11px] bg-[#faf8f5] text-[#7a6e64] px-3 py-1.5">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 border border-transparent group-hover:border-[#c4b49a] transition-all duration-300 pointer-events-none" />
      </div>

      <div className="space-y-1.5">
        <p className="text-xs text-[#a89880]">{product.origin}</p>
        <h3 className="font-display text-lg text-[#2c2620] leading-tight">{product.name}</h3>
        <p className="text-sm text-[#7a6e64]">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
