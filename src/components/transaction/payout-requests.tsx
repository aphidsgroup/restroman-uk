"use client"

import React, { useState } from 'react'
import { Eye } from 'lucide-react'

interface PayoutRequest {
  id: number
  client: string
  price: string
  status: 'Paid' | 'Processed' | 'Rejected' | 'Canceled'
  note: string
  createdAt: string
}

export default function PayoutRequests() {
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([
    { id: 56, client: 'Hojiakbar Mahmudov', price: '$ 177.28', status: 'Paid', note: 'Payment Order #1182 via Wallet', createdAt: '15-03-2025 18:19' },
    { id: 55, client: 'Hojiakbar Mahmudov', price: '$ 3.18', status: 'Paid', note: 'Payment Order #1173 via Wallet', createdAt: '15-03-2025 13:47' },
    { id: 54, client: 'Hojiakbar Mahmudov', price: '$ 7.02', status: 'Paid', note: 'Payment Order #1171 via Wallet', createdAt: '15-03-2025 13:42' },
    { id: 53, client: 'Hojiakbar Mahmudov', price: '$ 5.70', status: 'Paid', note: 'Payment Order #1170 via Wallet', createdAt: '15-03-2025 13:40' },
    { id: 52, client: 'User Demo', price: '$ 9.53', status: 'Paid', note: 'Payment Order #1165 via Wallet', createdAt: '15-03-2025 12:23' },
    { id: 51, client: 'User Demo', price: '$ 5.13', status: 'Paid', note: 'Payment Order #1164 via Wallet', createdAt: '15-03-2025 12:20' },
    { id: 47, client: 'Hojiakbar Mahmudov', price: '$ 1.82', status: 'Paid', note: 'Payment Order #1153 via Wallet', createdAt: '12-03-2025 14:11' },
    { id: 45, client: 'Hojiakbar Mahmudov', price: '$ 5.00', status: 'Paid', note: 'Teri Jimenez', createdAt: '07-03-2025 13:36' }
  ])
  const [activeTab, setActiveTab] = useState('all')
  
  const filteredPayouts = payoutRequests.filter(payout => {
    if (activeTab === 'all') return true
    if (activeTab === 'processed') return payout.status === 'Processed'
    if (activeTab === 'paid') return payout.status === 'Paid'
    if (activeTab === 'rejected') return payout.status === 'Rejected'
    if (activeTab === 'canceled') return payout.status === 'Canceled'
    return true
  })

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium">Payout requests</h1>
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
            className={`py-2 px-6 ${activeTab === 'processed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('processed')}
          >
            Processed
          </button>
          <button
            className={`py-2 px-6 ${activeTab === 'paid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('paid')}
          >
            Paid
          </button>
          <button
            className={`py-2 px-6 ${activeTab === 'rejected' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
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
                <th className="p-3 text-left font-medium">ID</th>
                <th className="p-3 text-left font-medium">Client</th>
                <th className="p-3 text-left font-medium">Price</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Note</th>
                <th className="p-3 text-left font-medium">Created at</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{payout.id}</td>
                  <td className="p-3">{payout.client}</td>
                  <td className="p-3">{payout.price}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      payout.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      payout.status === 'Processed' ? 'bg-blue-100 text-blue-800' :
                      payout.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="p-3">{payout.note}</td>
                  <td className="p-3">{payout.createdAt}</td>
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