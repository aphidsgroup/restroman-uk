"use client"

import React, { useState } from "react"
import { Search, Plus, Pencil, Trash2, List } from "lucide-react"

interface Addon {
  id: number;
  title: string;
  translations: string[];
  active: boolean;
  status: string;
}

export default function Addons() {
  const [addons, setAddons] = useState<Addon[]>([
    { id: 569, title: "Oreo", translations: ["EN"], active: true, status: "Pending" },
    { id: 567, title: "1234", translations: ["EN"], active: true, status: "Pending" },
  ]);

  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedAddons(addons.map(addon => addon.id));
    } else {
      setSelectedAddons([]);
    }
  };

  const handleSelectAddon = (id: number) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(addonId => addonId !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleDeleteSelected = () => {
    setAddons(addons.filter(addon => !selectedAddons.includes(addon.id)));
    setSelectedAddons([]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Addons</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <Plus className="h-5 w-5" />
          Add addon
        </button>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1"></div>
        
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title"
              className="px-9 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <button className="px-4 py-2 bg-blue-50 text-blue-500 rounded-md flex items-center gap-2 hover:bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>
          
          <button className="px-4 py-2 bg-green-50 text-green-500 rounded-md flex items-center gap-2 hover:bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Import
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b">
          <button 
            className={`px-6 py-2 border-b-2 ${activeTab === 'all' ? 'border-blue-500 text-blue-500 bg-blue-50' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`px-6 py-2 border-b-2 ${activeTab === 'published' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab('published')}
          >
            Published
          </button>
          <button 
            className={`px-6 py-2 border-b-2 ${activeTab === 'pending' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-6 py-2 border-b-2 ${activeTab === 'unpublished' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab('unpublished')}
          >
            Unpublished
          </button>
          <button 
            className={`px-6 py-2 border-b-2 ${activeTab === 'deleted' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab('deleted')}
          >
            Deleted at
          </button>
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
            selectedAddons.length > 0 
              ? 'bg-red-50 text-red-500 hover:bg-red-100' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={selectedAddons.length === 0}
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
                    checked={selectedAddons.length === addons.length && addons.length > 0}
                  />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Title
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Translations
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Active
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {addons.map((addon) => (
                <tr key={addon.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => handleSelectAddon(addon.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {addon.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {addon.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {addon.translations.map((lang) => (
                      <span 
                        key={lang}
                        className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mr-1"
                      >
                        {lang}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={addon.active}
                        onChange={() => {
                          setAddons(addons.map(a => 
                            a.id === addon.id ? { ...a, active: !a.active } : a
                          ))
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-blue-500 font-medium text-sm">{addon.status}</span>
                      <button className="ml-2 text-blue-500">
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
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