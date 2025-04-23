"use client"

import React, { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const weekData = [
  { name: "Thu", value: 5000 },
  { name: "Fri", value: 3000 },
  { name: "Sat", value: 5000 },
  { name: "Sun", value: 2000 },
  { name: "Mon", value: 20000 },
]

const monthData = [
  { name: "Week 1", value: 15000 },
  { name: "Week 2", value: 20000 },
  { name: "Week 3", value: 25000 },
  { name: "Week 4", value: 18000 },
]

const yearData = [
  { name: "Jan", value: 65000 },
  { name: "Feb", value: 50000 },
  { name: "Mar", value: 75000 },
  { name: "Apr", value: 85000 },
  { name: "May", value: 100000 },
  { name: "Jun", value: 95000 },
]

function SalesChart() {
  const [timePeriod, setTimePeriod] = useState("week")
  
  // Get the appropriate data based on selected time period
  const getChartData = () => {
    switch(timePeriod) {
      case "month": return monthData;
      case "year": return yearData;
      default: return weekData;
    }
  }

  // Get total sales based on time period
  const getTotalSales = () => {
    switch(timePeriod) {
      case "month": return "78,000.00";
      case "year": return "470,000.00";
      default: return "33,777.96";
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Total sales overview</h3>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <h4 className="text-2xl font-bold text-primary">$ {getTotalSales()}</h4>
            <span className="text-sm text-gray-500">Total sales</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
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

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={getChartData()}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 'dataMax + 5000']}
              ticks={[0, 5000, 10000, 15000, 20000, 25000]}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#0ea5e9" 
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesChart 