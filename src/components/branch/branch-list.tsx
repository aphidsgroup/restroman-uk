"use client"

import React, { useState } from "react"
import { PlusIcon, SearchIcon } from "lucide-react"

interface Branch {
  id: number
  title: string
  translations: { en: boolean }
  logo: string
  background: string
  seller: string
  open: boolean
  status: string
}

export default function BranchList() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 505,
      title: "Bareilly",
      translations: { en: true },
      logo: "/branch-logo.jpg",
      background: "/branch-bg.jpg",
      seller: "wok2 admin",
      open: true,
      status: "Approved"
    },
    {
      id: 504,
      title: "USA Branch",
      translations: { en: true },
      logo: "/branch-logo.jpg",
      background: "/branch-bg.jpg",
      seller: "wok admin",
      open: true,
      status: "Approved"
    },
    {
      id: 502,
      title: "Central Branch",
      translations: { en: true },
      logo: "/branch-logo.jpg",
      background: "/branch-bg.jpg",
      seller: "Branch1 Githubit",
      open: false,
      status: "Approved"
    },
    {
      id: 501,
      title: "Main branch",
      translations: { en: true },
      logo: "/branch-logo.jpg",
      background: "/branch-bg.jpg",
      seller: "Owner Githubit",
      open: true,
      status: "Approved"
    }
  ])
  const [selectedBranches, setSelectedBranches] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("All")

  const tabs = ["All", "New", "Approved", "Rejected", "Deleted at"]

  const selectAllBranches = () => {
    if (selectedBranches.length === branches.length) {
      setSelectedBranches([])
    } else {
      setSelectedBranches(branches.map(branch => branch.id))
    }
  }

  const selectBranch = (id: number) => {
    if (selectedBranches.includes(id)) {
      setSelectedBranches(selectedBranches.filter(branchId => branchId !== id))
    } else {
      setSelectedBranches([...selectedBranches, id])
    }
  }

  const deleteSelectedBranches = () => {
    setBranches(branches.filter(branch => !selectedBranches.includes(branch.id)))
    setSelectedBranches([])
  }

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Branches</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <PlusIcon className="h-5 w-5" />
          Add branch
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
              className={`px-3 py-1.5 rounded-md ${selectedBranches.length > 0 ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              onClick={deleteSelectedBranches}
              disabled={selectedBranches.length === 0}
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
                    checked={selectedBranches.length === branches.length && branches.length > 0}
                    onChange={selectAllBranches}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Translations</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Background</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {branches.map(branch => (
                <tr key={branch.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input 
                      type="checkbox"
                      checked={selectedBranches.includes(branch.id)}
                      onChange={() => selectBranch(branch.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{branch.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{branch.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">EN</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
                      <img src={branch.logo} alt="Logo" className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
                      <img src={branch.background} alt="Background" className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{branch.seller}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${branch.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {branch.open ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center w-fit">
                      {branch.status}
                      <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </td>
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