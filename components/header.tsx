import Link from "next/link"
import Cart from "./cart"
import { Button } from "../components/ui/button"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"

export default function Header() {
  return (
    <header className="bg-[#212A31] text-[#D3D9D4] border-b border-[#748D92]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="text-[#212A31] bg-[#D3D9D4] px-2 py-1 rounded-md mr-1">Coco</span>
          <span className="text-[#D3D9D4]">Shop</span>
        </Link>

        <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products..." className="pl-10 placeholder:text-gray bg-white" />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="px-3 bg-white text-primary">
            ✨
          </Button>
          <Cart/>
        </div>
      </div>
    </header>
  )
}
