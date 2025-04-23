"use client"

import React, { useState } from "react"

const weekCustomers = [
  {
    id: 1,
    name: "User Demo",
    phone: "12685856685",
    orders: 1,
    total: 17.20
  },
  {
    id: 2,
    name: "Branch1 Githublt",
    phone: "99891902691",
    orders: 1,
    total: 16.36
  }
]

const monthCustomers = [
  {
    id: 1,
    name: "John Smith",
    phone: "12685856123",
    orders: 8,
    total: 142.80
  },
  {
    id: 2,
    name: "Emma Johnson",
    phone: "99891902345",
    orders: 5,
    total: 98.50
  },
  {
    id: 3,
    name: "Michael Davis",
    phone: "12685856789",
    orders: 4,
    total: 86.75
  }
]

const yearCustomers = [
  {
    id: 1,
    name: "David Wilson",
    phone: "12685856111",
    orders: 45,
    total: 892.50
  },
  {
    id: 2,
    name: "Sarah Brown",
    phone: "99891902222",
    orders: 38,
    total: 745.20
  },
  {
    id: 3,
    name: "Robert Taylor",
    phone: "12685856333",
    orders: 32,
    total: 634.85
  }
]

function TopCustomers() {
  const [timePeriod, setTimePeriod] = useState("week")

  // Get customers based on selected time period
  const getCustomers = () => {
    switch(timePeriod) {
      case "month": return monthCustomers;
      case "year": return yearCustomers;
      default: return weekCustomers;
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Top customers</h3>
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
        {getCustomers().map((customer) => (
          <div key={customer.id} className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
              {customer.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{customer.name}</h4>
              <p className="text-sm text-gray-500">{customer.phone}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$ {customer.total.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Orders: {customer.orders}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCustomers 