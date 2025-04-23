"use client"

import React, { useState } from "react"
import { PlusIcon } from "lucide-react"

interface Banner {
  id: number
  image: string
  active: boolean
  createdAt: string
}

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 5,
      image: "/banner-1.jpg",
      active: true,
      createdAt: "14-06-2023 10:11"
    },
    {
      id: 4,
      image: "/banner-2.jpg",
      active: true,
      createdAt: "28-04-2023 16:16"
    },
    {
      id: 2,
      image: "/banner-3.jpg",
      active: true,
      createdAt: "20-04-2023 00:36"
    }
  ])
  const [selectedBanners, setSelectedBanners] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("Published")

  const tabs = ["Published", "Deleted at"]

  const selectAllBanners = () => {
    if (selectedBanners.length === banners.length) {
      setSelectedBanners([])
    } else {
      setSelectedBanners(banners.map(banner => banner.id))
    }
  }

  const selectBanner = (id: number) => {
    if (selectedBanners.includes(id)) {
      setSelectedBanners(selectedBanners.filter(bannerId => bannerId !== id))
    } else {
      setSelectedBanners([...selectedBanners, id])
    }
  }

  const toggleActive = (id: number) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, active: !banner.active } : banner
    ))
  }

  const deleteSelectedBanners = () => {
    setBanners(banners.filter(banner => !selectedBanners.includes(banner.id)))
    setSelectedBanners([])
  }

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Banners</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <PlusIcon className="h-5 w-5" />
          Add banner
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1.5 rounded-md ${selectedBanners.length > 0 ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              onClick={deleteSelectedBanners}
              disabled={selectedBanners.length === 0}
            >
              Delete selection
            </button>
          </div>
        </div>
        
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left">
                  <input 
                    type="checkbox" 
                    checked={selectedBanners.length === banners.length && banners.length > 0}
                    onChange={selectAllBanners}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {banners.map(banner => (
                <tr key={banner.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input 
                      type="checkbox"
                      checked={selectedBanners.includes(banner.id)}
                      onChange={() => selectBanner(banner.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{banner.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
                      <img src={banner.image} alt="Banner" className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={banner.active} 
                        onChange={() => toggleActive(banner.id)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{banner.createdAt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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