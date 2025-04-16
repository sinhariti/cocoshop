import { getRecommendedProducts } from "@/lib/data"
import ProductCard from "./product-card"

export default async function RecommendationSection() {
  const recommendedProducts = await getRecommendedProducts()

  return (
    <div id="recommendations" className="mt-12 mb-16">
      <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
