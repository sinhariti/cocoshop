// lib/data.ts
import type { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:4000/api/products", {
    cache: "no-store", // Disable caching for real-time fetching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const products: Product[] = data.map((p: any) => ({
    id: p._id,
    name: p.title,
    description: p.description,
    price: p.price,
    category: p.category,
  }));

  return products;
}

export async function getRecommendedProducts(): Promise<{
  mostPurchased: Product[],
  recentlyPurchased: Product[]
}> {
  const res = await fetch("http://localhost:4000/api/recommendations/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  const data = await res.json();

  const mostPurchased: Product[] = data.mostPurchased.map((p: any) => ({
    id: p._id || p.productID,
    name: p.title,
    description: p.description || "",
    price: p.price,
    category: "recommended", // placeholder/fallback category
  }));

  const recentlyPurchased: Product[] = data.recentlyPurchased.map((p: any) => ({
    id: p._id || p.productID,
    name: p.title,
    description: p.description || "",
    price: p.price,
    category: "recent", // placeholder/fallback category
  }));

  return { mostPurchased, recentlyPurchased };
}
