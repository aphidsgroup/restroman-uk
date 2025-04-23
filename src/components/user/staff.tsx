"use client"

import React, { useState } from 'react'
import { Search, Edit, Eye, MessageCircle } from 'lucide-react'

interface Staff {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
}

export default function StaffAdminUsers() {
  const [staff, setStaff] = useState<Staff[]>([
    { id: 103, firstName: 'Owner', lastName: 'Githubit', email: 'owner@githubit.com', role: 'Admin' },
    { id: 101, firstName: 'Admin', lastName: 'Admin', email: 'admin@githubit.com', role: 'Admin' }
  ])
  const [selectedStaff, setSelectedStaff] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('admin')
  
  const handleSelectAll = () => {
    if (selectedStaff.length === staff.length) {
      setSelectedStaff([])
    } else {
      setSelectedStaff(staff.map(user => user.id))
    }
  }
  
  const handleSelectStaff = (id: number) => {
    if (selectedStaff.includes(id)) {
      setSelectedStaff(selectedStaff.filter(staffId => staffId !== id))
    } else {
      setSelectedStaff([...selectedStaff, id])
    }
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium">Staff & admin users</h1>
        </div>
        
        {/* Search */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by id, name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b mb-4">
          <div className="flex gap-4">
            <button
              className={`py-2 px-4 ${activeTab === 'admin' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-500'}`}
              onClick={() => setActiveTab('admin')}
            >
              Admin
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'seller' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-500'}`}
              onClick={() => setActiveTab('seller')}
            >
              Seller
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'moderator' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-500'}`}
              onClick={() => setActiveTab('moderator')}
            >
              Moderator
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'manager' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-500'}`}
              onClick={() => setActiveTab('manager')}
            >
              Manager
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'cook' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-500'}`}
              onClick={() => setActiveTab('cook')}
            >
              Cook
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'deliveryman' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-500'}`}
              onClick={() => setActiveTab('deliveryman')}
            >
              Deliveryman
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'waiter' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-500'}`}
              onClick={() => setActiveTab('waiter')}
            >
              Waiter
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'deleted' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-500'}`}
              onClick={() => setActiveTab('deleted')}
            >
              Deleted at
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStaff.length === staff.length && staff.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="p-3 text-left font-medium">ID</th>
                <th className="p-3 text-left font-medium">First name</th>
                <th className="p-3 text-left font-medium">Last name</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Role</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedStaff.includes(user.id)}
                      onChange={() => handleSelectStaff(user.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Eye size={16} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <MessageCircle size={16} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                        <Edit size={16} />
                      </button>
                    </div>
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