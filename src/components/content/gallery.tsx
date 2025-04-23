"use client"

import React from "react"
import { Folder } from "lucide-react"

interface GalleryFolder {
  id: number
  name: string
  path: string
}

export default function Gallery() {
  const folders: GalleryFolder[] = [
    { id: 1, name: "Languages", path: "/gallery/languages" },
    { id: 2, name: "Categories", path: "/gallery/categories" },
    { id: 3, name: "Restaurants", path: "/gallery/restaurants" },
    { id: 4, name: "Brands", path: "/gallery/brands" },
    { id: 5, name: "Products", path: "/gallery/products" },
    { id: 6, name: "Extras", path: "/gallery/extras" },
    { id: 7, name: "Users", path: "/gallery/users" },
    { id: 8, name: "Restaurant", path: "/gallery/restaurant" },
    { id: 9, name: "Deliveryman", path: "/gallery/deliveryman" },
    { id: 10, name: "shop-tags", path: "/gallery/shop-tags" }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Gallery</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {folders.map((folder) => (
          <a 
            key={folder.id}
            href={folder.path}
            className="flex flex-col items-center p-6 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <Folder className="w-16 h-16 text-gray-600 mb-3" />
            <span className="text-center text-gray-800 font-medium">{folder.name}</span>
          </a>
        ))}
      </div>
      
      <div className="mt-4 text-center text-gray-500 text-sm">
        Restroman support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 