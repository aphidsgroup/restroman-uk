"use client"

import React, { useState } from "react"
import { Search, Plus, Pencil, Trash2, List } from "lucide-react"

interface Discount {
  id: number;
  type: string;
  amount: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

export default function Discounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: 5, type: "Fix", amount: "$ 12.00", startDate: "14-03-2023", endDate: "14-03-2023", active: true },
    { id: 3, type: "Fix", amount: "$ 1.00", startDate: "01-05-2023", endDate: "31-05-2023", active: true },
    { id: 1, type: "Percent", amount: "$ 10.00", startDate: "27-04-2023", endDate: "06-05-2023", active: true },
  ]);

  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDiscounts(discounts.map(discount => discount.id));
    } else {
      setSelectedDiscounts([]);
    }
  };

  const handleSelectDiscount = (id: number) => {
    if (selectedDiscounts.includes(id)) {
      setSelectedDiscounts(selectedDiscounts.filter(discountId => discountId !== id));
    } else {
      setSelectedDiscounts([...selectedDiscounts, id]);
    }
  };

  const handleDeleteSelected = () => {
    setDiscounts(discounts.filter(discount => !selectedDiscounts.includes(discount.id)));
    setSelectedDiscounts([]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Discounts</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <Plus className="h-5 w-5" />
          Add discount
        </button>
      </div>
      
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
            selectedDiscounts.length > 0 
              ? 'bg-red-50 text-red-500 hover:bg-red-100' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={selectedDiscounts.length === 0}
          onClick={handleDeleteSelected}
        >
          <Trash2 className="h-4 w-4" />
          Delete selection
        </button>
        
        <button className="ml-2 p-2 border border-gray-200 rounded-md">
          <List className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 rounded"
                    onChange={handleSelectAll}
                    checked={selectedDiscounts.length === discounts.length && discounts.length > 0}
                  />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Type
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Amount
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Start date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  End date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Active
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.map((discount) => (
                <tr key={discount.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded"
                      checked={selectedDiscounts.includes(discount.id)}
                      onChange={() => handleSelectDiscount(discount.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {discount.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {discount.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {discount.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {discount.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {discount.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={discount.active}
                        onChange={() => {
                          setDiscounts(discounts.map(d => 
                            d.id === discount.id ? { ...d, active: !d.active } : d
                          ))
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 rounded-md text-gray-400 bg-white">
              &laquo;
            </button>
            <button className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
              1
            </button>
            <button className="px-2 py-1 rounded-md text-gray-600 bg-white">
              &raquo;
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-gray-500 text-sm">
        Restroman support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 