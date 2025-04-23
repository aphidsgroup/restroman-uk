"use client"

import React, { useState } from "react"
import Image from "next/image"

const weekProducts = [
  {
    id: 1,
    name: "California Roll",
    image: "/california-roll.jpg",
    sales: 1
  },
  {
    id: 2,
    name: "Chilli Cheese Hot Dog",
    image: "/hot-dog.jpg",
    sales: 1
  },
  {
    id: 3,
    name: "Cobb Salad",
    image: "/cobb-salad.jpg", 
    sales: 1
  }
]

const monthProducts = [
  {
    id: 1,
    name: "Classic Burger",
    image: "/burger.jpg",
    sales: 45
  },
  {
    id: 2,
    name: "Caesar Salad",
    image: "/caesar-salad.jpg",
    sales: 38
  },
  {
    id: 3,
    name: "Pepperoni Pizza",
    image: "/pizza.jpg", 
    sales: 32
  }
]

const yearProducts = [
  {
    id: 1,
    name: "Margherita Pizza",
    image: "/margherita.jpg",
    sales: 523
  },
  {
    id: 2,
    name: "Beef Burger",
    image: "/beef-burger.jpg",
    sales: 490
  },
  {
    id: 3,
    name: "Grilled Chicken",
    image: "/grilled-chicken.jpg", 
    sales: 456
  }
]

function TopProducts() {
  const [timePeriod, setTimePeriod] = useState("week")

  // Get products based on selected time period
  const getProducts = () => {
    switch(timePeriod) {
      case "month": return monthProducts;
      case "year": return yearProducts;
      default: return weekProducts;
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Top selling products</h3>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>5 / Page</span>
          <div className="flex items-center ml-4 gap-2 text-sm">
            <button 
              className={`px-4 py-1 rounded-md ${timePeriod === 'week' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setTimePeriod('week')}
            >
              Week
            </button>
            <button 
              className={`px-4 py-1 rounded-md ${timePeriod === 'month' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setTimePeriod('month')}
            >
              Month
            </button>
            <button 
              className={`px-4 py-1 rounded-md ${timePeriod === 'year' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setTimePeriod('year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {getProducts().map((product) => (
          <div key={product.id} className="flex items-center">
            <div className="w-16 h-12 bg-gray-100 rounded-md overflow-hidden relative mr-3">
              <div className="w-16 h-12 bg-gray-200 flex items-center justify-center text-gray-400">
                <span className="text-xs">Image</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{product.name}</h4>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Sales: {product.sales}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopProducts 