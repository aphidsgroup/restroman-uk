"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, ChevronDown, LogOut, Edit } from "lucide-react"
import OrderStats from "./order-stats"
import OrderCharts from "./order-charts"
import SalesChart from "./sales-chart"
import TodoList from "./todo-list"
import TopProducts from "./top-products"
import TopCustomers from "./top-customers"
import ProfileModal from "../ui/profile-modal"
import LanguageModal from "../ui/language-modal"
import NotificationPanel from "../ui/notification-panel"

function Dashboard() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [language, setLanguage] = useState("en")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const languageRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLButtonElement>(null)

  // Get language display code
  const getLanguageDisplay = () => {
    switch(language) {
      case "en": return "EN"
      case "fr": return "FR"
      case "es": return "ES"
      case "de": return "DE"
      case "ru": return "RU"
      default: return "EN"
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    // Logout logic would go here
    console.log("Logging out...")
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    console.log("Language changed to:", newLanguage)
  }

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome, Owner Durai</h1>
          <p className="text-sm text-gray-500">Monitor your business performance and data</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            ref={notificationRef}
            onClick={toggleNotifications}
            className="p-2 rounded-full hover:bg-gray-100 relative"
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-amber-400 rounded-full"></span>
          </button>
          <div className="relative" ref={languageRef}>
            <button 
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <span className="text-sm font-medium">{getLanguageDisplay()}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <span className="text-sm text-right">
                <span className="block font-medium text-gray-700">Owner Durai</span>
                <span className="text-xs text-gray-500">Admin</span>
              </span>
              <div className="h-10 w-10 rounded-full bg-blue-500 overflow-hidden">
                <img 
                  src="https://ui-avatars.com/api/?name=Owner+Durai&background=4F46E5&color=fff" 
                  alt="Owner Durai" 
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <OrderStats />
      
      <div className="grid grid-cols-2 gap-6 mt-8">
        <OrderCharts />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Order status statistics</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-2xl font-bold">14</span>
                  <span className="text-sm text-gray-500">Orders</span>
                </div>
              </div>
              {/* This would be the donut chart from recharts */}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600">New</span>
              <span className="ml-auto font-medium">10</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-600">Out</span>
              <span className="ml-auto font-medium">0</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Delivered</span>
              <span className="ml-auto font-medium">2</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
              <span className="text-sm text-gray-600">Accepted</span>
              <span className="ml-auto font-medium">0</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-300 mr-2"></div>
              <span className="text-sm text-gray-600">Ready</span>
              <span className="ml-auto font-medium">0</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">Canceled</span>
              <span className="ml-auto font-medium">2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <SalesChart />
        <TodoList />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <TopProducts />
        <TopCustomers />
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Restroman Single support team 123456789
      </footer>

      {isProfileModalOpen && (
        <ProfileModal 
          onClose={() => setIsProfileModalOpen(false)} 
        />
      )}

      {isLanguageModalOpen && (
        <LanguageModal 
          onClose={() => setIsLanguageModalOpen(false)}
          onSave={handleLanguageChange}
          selectedLanguage={language}
        />
      )}

      {isNotificationOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30">
          <NotificationPanel onClose={() => setIsNotificationOpen(false)} />
        </div>
      )}
    </div>
  )
}

export default Dashboard 