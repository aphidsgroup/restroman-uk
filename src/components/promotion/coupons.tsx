"use client"

import React, { useState } from "react"
import { PlusIcon } from "lucide-react"

interface Coupon {
  id: number
  title: string
  name: string
  type: string
  price: string
  quantity: number
  expiredAt: string
}

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 9,
      title: "Samsung",
      name: "coupon",
      type: "Fix",
      price: "$ 33.00",
      quantity: 33,
      expiredAt: "05-04-2025"
    }
  ])
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([])

  const selectAllCoupons = () => {
    if (selectedCoupons.length === coupons.length) {
      setSelectedCoupons([])
    } else {
      setSelectedCoupons(coupons.map(coupon => coupon.id))
    }
  }

  const selectCoupon = (id: number) => {
    if (selectedCoupons.includes(id)) {
      setSelectedCoupons(selectedCoupons.filter(couponId => couponId !== id))
    } else {
      setSelectedCoupons([...selectedCoupons, id])
    }
  }

  const deleteSelectedCoupons = () => {
    setCoupons(coupons.filter(coupon => !selectedCoupons.includes(coupon.id)))
    setSelectedCoupons([])
  }

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Coupons</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <PlusIcon className="h-5 w-5" />
          Add coupon
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1.5 rounded-md ${selectedCoupons.length > 0 ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              onClick={deleteSelectedCoupons}
              disabled={selectedCoupons.length === 0}
            >
              Delete selection
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left">
                  <input 
                    type="checkbox" 
                    checked={selectedCoupons.length === coupons.length && coupons.length > 0}
                    onChange={selectAllCoupons}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expired at</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map(coupon => (
                <tr key={coupon.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input 
                      type="checkbox"
                      checked={selectedCoupons.includes(coupon.id)}
                      onChange={() => selectCoupon(coupon.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{coupon.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{coupon.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{coupon.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{coupon.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{coupon.price}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{coupon.quantity}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">{coupon.expiredAt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="px-4 py-3 flex items-center justify-between border-t">
            <div className="flex-1 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                <span className="font-semibold text-blue-600">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-gray-500 text-sm">
        Restroman support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 