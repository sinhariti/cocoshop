import ProductList from "@/components/product-list"
import RecommendationSection from "@/components/recommendation-section"
import { getProducts } from "@/lib/data"
import Header from "@/components/header"
export default async function Home() {
  const products = await getProducts()

  return (
    
    <div className="container mx-auto px-4 py-8">
      <Header /> 
      <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>
      
      <ProductList products={products} />

      <RecommendationSection />
    </div>
  )
}
