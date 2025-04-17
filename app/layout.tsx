import type React from "react"
import ClientLayout from "./client-layout"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}

// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import Header from "@/components/header"
// import { CartProvider } from "@/lib/cart-context"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "ShopNow - E-commerce Store",
//   description: "Shop the latest products with personalized recommendations",
//   generator: "v0.dev",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <CartProvider>
//           <Header />
//           <main>{children}</main>
//         </CartProvider>
//       </body>
//     </html>
//   )
// }

// import "./globals.css"