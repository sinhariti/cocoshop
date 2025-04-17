"use client"

import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Cart() {
  const { items, removeFromCart, clearCart, totalPrice, incrementQuantity, decrementQuantity } = useCart()
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [finalPrice, setFinalPrice] = useState(totalPrice)

  const handleCheckout = () => {
    // Save the total price before clearing the cart
    setFinalPrice(totalPrice)
    setShowOrderDialog(true)
    clearCart() // Clear the cart after showing the dialog
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5 text-[#212A31]" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#212A31] text-[#D3D9D4] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>

          <div className="mt-8">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 border-b pb-3">
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-md p-0"
                            onClick={() => decrementQuantity(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-md p-0"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="mt-1 h-7 w-7"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg mb-6">
                    <span>Total:</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-[#124E66] hover:bg-[#2E3944] text-[#D3D9D4]"
                      onClick={handleCheckout} // Use the new function for checkout
                    >
                      Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#748D92] text-[#212A31] hover:bg-[#D3D9D4]"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl">🎉 Order Placed!</DialogTitle>
          </DialogHeader>
          <p className="text-lg mt-2">Thank you for your purchase.</p>
          <p className="mt-1 font-medium">Total Paid: ₹{finalPrice.toFixed(2)}</p> {/* Use finalPrice here */}
          <Button className="mt-4" onClick={() => setShowOrderDialog(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
