"use client"

import React, { useState } from "react"
import Link from "next/link"

interface OrderStatus {
  id: number
  status: string
  active: boolean
}

export default function OrderStatuses() {
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([
    { id: 1, status: "New", active: true },
    { id: 2, status: "Accepted", active: true },
    { id: 7, status: "Cooking", active: true },
    { id: 3, status: "Ready", active: true },
    { id: 4, status: "On a way", active: true },
    { id: 5, status: "Delivered", active: true },
    { id: 6, status: "Canceled", active: true },
  ])

  const toggleStatus = (id: number) => {
    setOrderStatuses(
      orderStatuses.map((status) =>
        status.id === id ? { ...status, active: !status.active } : status
      )
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col">
      <h1 className="text-2xl font-semibold mb-6">Order statuses</h1>
      
      <div className="bg-white rounded-lg shadow-sm flex-1">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderStatuses.map((status) => (
                <tr key={status.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {status.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {status.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={status.active}
                        onChange={() => toggleStatus(status.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-center py-4 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed">
              &laquo;
            </button>
            <button className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
              1
            </button>
            <button className="px-2 py-1 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed">
              &raquo;
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4 text-sm text-gray-600">
        Restroman Single support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 