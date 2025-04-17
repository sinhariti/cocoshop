"use client"

import type { Product } from "@/lib/types"
import { Quando } from "next/font/google"
import { createContext, useContext, useState, type ReactNode } from "react"

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  totalPrice: number
  incrementQuantity: (productId: Product) => void
  decrementQuantity: (productId: string) => void
  getItemQuantity: (productId: string) => number
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = async (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  
    // Sync with backend
    try {
      const token = localStorage.getItem("token"); // or sessionStorage if you store it there
      
      await fetch("http://localhost:4000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
        credentials: "include", // Still required if you're using cookies alongside JWT
        body: JSON.stringify({
          productID: product.id,
          quantity: 1,
        }),
      });
    
      console.log("Synced with backend");
    } catch (err) {
      console.error("Failed to sync with backend:", err);
    }
  };    
  

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    
  }

  const clearCart = () => {
    setItems([])
  }

  const incrementQuantity = async (product: Product) => {
    // 1. Update local state
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    const item = items.find((item) => item.id === product.id)
    // 2. Sync with backend
    try {
      const token = localStorage.getItem("token");
  
      await fetch("http://localhost:4000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
        credentials: "include",
        body: JSON.stringify({
          productID: product.id, // or product._id based on your schema
          quantity: item?.quantity
        }),
      });
  
      console.log("Quantity incremented on backend");
    } catch (err) {
      console.error("Failed to increment quantity on backend:", err);
    }
  };
  
  
  const decrementQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity - 1
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
        }
        return item
      }),
    )
  }

  const getItemQuantity = (productId: string) => {
    const item = items.find((item) => item.id === productId)
    return item ? item.quantity : 0
  }

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const checkout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // only if using cookies/auth
        body: JSON.stringify({ items }), // send cart items
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      clearCart();
      alert("Order placed successfully!");
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert("Error during checkout: " + err.message);
    }
  };
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        incrementQuantity,
        decrementQuantity,
        getItemQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
