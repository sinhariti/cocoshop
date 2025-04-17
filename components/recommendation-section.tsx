import { getRecommendedProducts } from "@/lib/data"
import ProductCard from "./product-card"

export default async function RecommendationSection() {
  const { mostPurchased, recentlyPurchased } = await getRecommendedProducts()

  return (
    <div id="recommendations" className="mt-12 mb-16">
      <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>

      {/* Most Purchased */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4 text-gray-800">Most Purchased</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mostPurchased.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Recently Purchased */}
      <div>
        <h3 className="text-xl font-medium mb-4 text-gray-800">Recently Purchased</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentlyPurchased.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
