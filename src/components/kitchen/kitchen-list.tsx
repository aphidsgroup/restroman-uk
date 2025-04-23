"use client"

import React, { useState } from "react"
import { PlusIcon, SearchIcon } from "lucide-react"

interface Kitchen {
  id: number
  title: string
  translations: { en: boolean }
  active: boolean
}

export default function KitchenList() {
  const [kitchens, setKitchens] = useState<Kitchen[]>([
    {
      id: 3,
      title: "Bar",
      translations: { en: true },
      active: true
    },
    {
      id: 2,
      title: "Pastry",
      translations: { en: true },
      active: true
    }
  ])
  const [selectedKitchens, setSelectedKitchens] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const selectAllKitchens = () => {
    if (selectedKitchens.length === kitchens.length) {
      setSelectedKitchens([])
    } else {
      setSelectedKitchens(kitchens.map(kitchen => kitchen.id))
    }
  }

  const selectKitchen = (id: number) => {
    if (selectedKitchens.includes(id)) {
      setSelectedKitchens(selectedKitchens.filter(kitchenId => kitchenId !== id))
    } else {
      setSelectedKitchens([...selectedKitchens, id])
    }
  }

  const toggleActive = (id: number) => {
    setKitchens(kitchens.map(kitchen => 
      kitchen.id === id ? { ...kitchen, active: !kitchen.active } : kitchen
    ))
  }

  const deleteSelectedKitchens = () => {
    setKitchens(kitchens.filter(kitchen => !selectedKitchens.includes(kitchen.id)))
    setSelectedKitchens([])
  }

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Kitchens</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <PlusIcon className="h-5 w-5" />
          Add kitchen
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <SearchIcon className="h-5 w-5" />
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1.5 rounded-md ${selectedKitchens.length > 0 ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              onClick={deleteSelectedKitchens}
              disabled={selectedKitchens.length === 0}
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
                    checked={selectedKitchens.length === kitchens.length && kitchens.length > 0}
                    onChange={selectAllKitchens}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Translations</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kitchens.map(kitchen => (
                <tr key={kitchen.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input 
                      type="checkbox"
                      checked={selectedKitchens.includes(kitchen.id)}
                      onChange={() => selectKitchen(kitchen.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{kitchen.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{kitchen.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">EN</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={kitchen.active} 
                        onChange={() => toggleActive(kitchen.id)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </td>
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