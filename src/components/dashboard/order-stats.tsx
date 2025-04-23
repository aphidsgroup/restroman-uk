"use client"

import React, { useState } from "react"
import { 
  ChevronRight, 
  ShoppingBag, 
  PlusCircle, 
  CheckCircle, 
  Truck, 
  Package, 
  XCircle
} from "lucide-react"
import Link from "next/link"

function OrderStats() {
  const [timePeriod, setTimePeriod] = useState("week") // week, month, year

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-end items-center mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg overflow-hidden p-1">
          <button 
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${timePeriod === 'week' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setTimePeriod('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${timePeriod === 'month' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setTimePeriod('month')}
          >
            Month
          </button>
          <button 
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${timePeriod === 'year' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setTimePeriod('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
          <h3 className="text-base font-medium text-gray-500">Total orders</h3>
          <p className="text-4xl font-bold mt-2 mb-8">16</p>
          <div className="absolute right-5 top-5">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <div className="relative mt-8">
            <Link href="/orders" className="flex items-center text-blue-500 hover:underline text-sm">
              <span>All orders</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
          <h3 className="text-base font-medium text-gray-500">New orders</h3>
          <p className="text-4xl font-bold mt-2">10</p>
          <div className="absolute right-5 top-5">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <PlusCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
          <h3 className="text-base font-medium text-gray-500">Accepted orders</h3>
          <p className="text-4xl font-bold mt-2">0</p>
          <div className="absolute right-5 top-5">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
          <h3 className="text-base font-medium text-gray-500">Ready orders</h3>
          <p className="text-4xl font-bold mt-2">0</p>
          <div className="absolute right-5 top-5">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <Link href="/orders" className="block w-full">
            <button className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              All orders
            </button>
          </Link>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
          <h3 className="text-base font-medium text-gray-500">Out for delivery orders</h3>
          <p className="text-4xl font-bold mt-2">0</p>
          <div className="absolute right-5 top-5">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Truck className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
          <h3 className="text-base font-medium text-gray-500">Delivered orders</h3>
          <p className="text-4xl font-bold mt-2 text-blue-500">2</p>
          <div className="absolute right-5 top-5">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Package className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative">
          <h3 className="text-base font-medium text-gray-500">Cancelled orders</h3>
          <p className="text-4xl font-bold mt-2 text-red-500">2</p>
          <div className="absolute right-5 top-5">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStats 