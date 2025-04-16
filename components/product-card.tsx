"use client"

import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity, incrementQuantity, decrementQuantity } = useCart()
  const quantity = getItemQuantity(product.id)

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-4 pt-6">
        <h3 className="font-semibold text-lg">{product.name}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
        <p className="text-xl font-bold">₹{product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {quantity === 0 ? (
          <Button className="flex-1 bg-[#124E66] hover:bg-[#2E3944] text-[#D3D9D4]" onClick={() => addToCart(product)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex w-full items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-l-md rounded-r-none border-r-0"
              onClick={() => decrementQuantity(product.id)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="h-9 px-4 flex items-center justify-center border-y">{quantity}</div>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-r-md rounded-l-none border-l-0"
              onClick={() => incrementQuantity(product.id)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
