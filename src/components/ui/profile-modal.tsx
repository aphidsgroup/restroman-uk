"use client"

import { useState } from "react"
import { X, Calendar } from "lucide-react"

interface ProfileModalProps {
  onClose: () => void
}

function ProfileModal({ onClose }: ProfileModalProps) {
  const [profileData, setProfileData] = useState({
    firstName: "Owner",
    lastName: "Durai",
    phone: "998911902696",
    email: "owner@durai.com",
    birthday: "2023-05-24",
    gender: "Male",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the data to your backend
    console.log('Profile data to save:', profileData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <div className="p-6 flex items-center justify-between border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Edit profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Avatar</h3>
            <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center">
              <div className="text-3xl mb-2">+</div>
              <span>Upload</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2">
                <span className="text-red-500">*</span> First name
              </label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2">
                <span className="text-red-500">*</span> Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2">
                <span className="text-red-500">*</span> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2">
                <span className="text-red-500">*</span> Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2">
                <span className="text-red-500">*</span> Birthday
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="birthday"
                  value={profileData.birthday}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block mb-2">
                <span className="text-red-500">*</span> Gender
              </label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2">Password confirmation</label>
              <input
                type="password"
                name="confirmPassword"
                value={profileData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileModal 