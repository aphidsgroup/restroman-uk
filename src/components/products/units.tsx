"use client"

import React, { useState } from "react"
import { Search, Plus, Pencil, Trash2, List } from "lucide-react"

interface Unit {
  id: number;
  title: string;
  position: string;
  active: boolean;
}

export default function Units() {
  const [units, setUnits] = useState<Unit[]>([
    { id: 5, title: "put", position: "after", active: true },
    { id: 4, title: "g", position: "after", active: true },
    { id: 3, title: "Kg", position: "after", active: true },
    { id: 2, title: "L", position: "after", active: true },
    { id: 1, title: "PCS", position: "after", active: true },
  ]);

  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUnits(units.map(unit => unit.id));
    } else {
      setSelectedUnits([]);
    }
  };

  const handleSelectUnit = (id: number) => {
    if (selectedUnits.includes(id)) {
      setSelectedUnits(selectedUnits.filter(unitId => unitId !== id));
    } else {
      setSelectedUnits([...selectedUnits, id]);
    }
  };

  const handleDeleteSelected = () => {
    setUnits(units.filter(unit => !selectedUnits.includes(unit.id)));
    setSelectedUnits([]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Units</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <Plus className="h-5 w-5" />
          Add unit
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
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
            selectedUnits.length > 0 
              ? 'bg-red-50 text-red-500 hover:bg-red-100' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={selectedUnits.length === 0}
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
                    checked={selectedUnits.length === units.length && units.length > 0}
                  />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Title
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Position
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
              {units.map((unit) => (
                <tr key={unit.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 rounded"
                      checked={selectedUnits.includes(unit.id)}
                      onChange={() => handleSelectUnit(unit.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {unit.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {unit.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {unit.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={unit.active}
                        onChange={() => {
                          setUnits(units.map(u => 
                            u.id === unit.id ? { ...u, active: !u.active } : u
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