"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface NotificationPanelProps {
  onClose: () => void
}

function NotificationPanel({ onClose }: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Add a small delay before attaching the event listener to prevent immediate closure
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div 
      ref={panelRef}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
      style={{ boxShadow: "-4px 0 15px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">Notifications</h2>
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 ml-auto text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
          <button 
            className="ml-2 text-sm text-gray-500 hover:text-gray-800"
            onClick={() => console.log('Clear notifications')}
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="p-4 h-full flex flex-col items-center justify-center text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        </div>
        <p className="text-gray-500">No Data</p>
      </div>
    </div>
  )
}

export default NotificationPanel 