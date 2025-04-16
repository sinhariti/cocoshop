import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-6 bg-[#124E66] rounded-full mr-2"></div>
        <h2 className="text-2xl font-semibold text-[#212A31]">All Products</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
