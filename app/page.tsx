

import ProductList from "@/components/product-list"
import RecommendationSection from "@/components/recommendation-section"
import { getProducts } from "@/lib/data"

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-[#2E3944] rounded-lg p-6 text-[#D3D9D4] shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome to CocoShop</h1>
        <p className="text-[#748D92] max-w-2xl">
          Discover our curated collection of premium products. From electronics to home essentials, we've got everything
          you need.
        </p>
      </div>

      <ProductList products={products} />

      <RecommendationSection />
    </div>
  )
}