"use client"

import React, { useState } from "react"
import { PlusIcon, SearchIcon } from "lucide-react"

interface Story {
  id: number
  image: string
  product: string
}

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const [selectedStories, setSelectedStories] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const selectAllStories = () => {
    if (selectedStories.length === stories.length) {
      setSelectedStories([])
    } else {
      setSelectedStories(stories.map(story => story.id))
    }
  }

  const selectStory = (id: number) => {
    if (selectedStories.includes(id)) {
      setSelectedStories(selectedStories.filter(storyId => storyId !== id))
    } else {
      setSelectedStories([...selectedStories, id])
    }
  }

  const deleteSelectedStories = () => {
    setStories(stories.filter(story => !selectedStories.includes(story.id)))
    setSelectedStories([])
  }

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Stories</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
          <PlusIcon className="h-5 w-5" />
          Add story
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search"
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
              className={`px-3 py-1.5 rounded-md ${selectedStories.length > 0 ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              onClick={deleteSelectedStories}
              disabled={selectedStories.length === 0}
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
                    checked={selectedStories.length === stories.length && stories.length > 0}
                    onChange={selectAllStories}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No stories found
                  </td>
                </tr>
              ) : (
                stories.map(story => (
                  <tr key={story.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input 
                        type="checkbox"
                        checked={selectedStories.includes(story.id)}
                        onChange={() => selectStory(story.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{story.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
                        <img src={story.image} alt="Story" className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{story.product}</td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 text-center text-gray-500 text-sm">
        Restroman support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 