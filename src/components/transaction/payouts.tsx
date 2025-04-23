"use client"

import React, { useState } from 'react'
import { Plus, Eye } from 'lucide-react'

interface Payout {
  client: string
  price: string
  status: 'Accepted' | 'Pending' | 'Canceled'
  cause: string
  createdAt: string
}

export default function Payouts() {
  const [payouts, setPayouts] = useState<Payout[]>([
    { client: 'wok2 admin', price: '$ 12.00', status: 'Pending', cause: '21212', createdAt: '11-03-2025 18:44' }
  ])
  const [activeTab, setActiveTab] = useState('all')
  
  const filteredPayouts = payouts.filter(payout => {
    if (activeTab === 'all') return true
    if (activeTab === 'accepted') return payout.status === 'Accepted'
    if (activeTab === 'pending') return payout.status === 'Pending'
    if (activeTab === 'canceled') return payout.status === 'Canceled'
    return true
  })

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header with Add Payout button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Payouts</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} />
            Add payout
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`py-2 px-6 rounded-l-md ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`py-2 px-6 ${activeTab === 'accepted' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted
          </button>
          <button
            className={`py-2 px-6 ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`py-2 px-6 rounded-r-md ${activeTab === 'canceled' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('canceled')}
          >
            Canceled
          </button>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left font-medium">Client</th>
                <th className="p-3 text-left font-medium">Price</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Cause</th>
                <th className="p-3 text-left font-medium">Created at</th>
                <th className="p-3 text-left font-medium">Answer</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{payout.client}</td>
                  <td className="p-3">{payout.price}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        payout.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                        payout.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payout.status}
                      </span>
                      {payout.status === 'Pending' && <span className="ml-2 text-gray-500">✏️</span>}
                    </div>
                  </td>
                  <td className="p-3">{payout.cause}</td>
                  <td className="p-3">{payout.createdAt}</td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <ul className="flex items-center gap-1">
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">&lt;</button></li>
              <li><button className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center">1</button></li>
              <li><button className="w-8 h-8 border rounded flex items-center justify-center">&gt;</button></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        Restroman support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 