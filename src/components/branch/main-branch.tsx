"use client"

import React from "react"
import { Pencil } from "lucide-react"

export default function MainBranch() {
  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My restaurant</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <Pencil className="h-5 w-5" />
          Restaurant edit
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-4 border-b md:border-b md:border-r border-gray-200">
            <div className="font-medium text-gray-500 mb-2">Restaurant name</div>
            <div>Main branch</div>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="font-medium text-gray-500 mb-2">Restaurant address</div>
            <div>86CV+M93, Tashkent, Uzbekistan</div>
          </div>
          
          <div className="p-4 border-b md:border-r border-gray-200">
            <div className="font-medium text-gray-500 mb-2">Phone</div>
            <div>12023401032</div>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="font-medium text-gray-500 mb-2">Tax</div>
            <div>1 %</div>
          </div>
          
          <div className="p-4 border-b md:border-r border-gray-200">
            <div className="font-medium text-gray-500 mb-2">Background image</div>
            <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
              <img src="/restaurant-bg.jpg" alt="Background" className="h-full w-full object-cover" />
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="font-medium text-gray-500 mb-2">Logo image</div>
            <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
              <img src="/restaurant-logo.jpg" alt="Logo" className="h-full w-full object-cover" />
            </div>
          </div>
          
          <div className="p-4 md:border-r border-gray-200">
            <div className="font-medium text-gray-500 mb-2">Open</div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={true} className="sr-only peer" readOnly />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
          
          <div className="p-4">
            <div className="font-medium text-gray-500 mb-2">Wallet</div>
            <div>$ 0.00</div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4 text-sm text-gray-600">
        Restroman Single support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 