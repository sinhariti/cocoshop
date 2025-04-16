import type { Product } from "./types"

// Mock data for products
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 199.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness, sleep, and notifications with this sleek smart watch",
    price: 249.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "electronics",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Soft, sustainable, and stylish organic cotton t-shirt",
    price: 29.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "clothing",
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection",
    price: 59.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "accessories",
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours",
    price: 34.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "home",
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for all Qi-enabled devices",
    price: 39.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "electronics",
  },
  {
    id: "7",
    name: "Ceramic Coffee Mug",
    description: "Handmade ceramic coffee mug with unique glaze finish",
    price: 24.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "home",
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker with 12-hour battery life",
    price: 79.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "electronics",
  },
]

// Mock function to get all products
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products
}

// Mock function to get recommended products
// In a real app, this would use user data and algorithms to provide personalized recommendations
export async function getRecommendedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Return a subset of products as "recommendations"
  return products.slice(0, 4)
}
