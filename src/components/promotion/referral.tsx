"use client"

import React, { useState, ChangeEvent } from "react"
import { CalendarIcon } from "lucide-react"

interface ReferralData {
  title: string
  description: string
  senderPrice: number
  terms: string
  receiverPrice: number
  expiredAt: string
  image: File | null
}

export default function Referral() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'th' | 'tr'>('en')
  const [referralData, setReferralData] = useState<ReferralData>({
    title: '',
    description: '',
    senderPrice: 0,
    terms: '',
    receiverPrice: 0,
    expiredAt: '',
    image: null
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'senderPrice' || name === 'receiverPrice') {
      setReferralData({
        ...referralData,
        [name]: parseFloat(value) || 0
      })
    } else {
      setReferralData({
        ...referralData,
        [name]: value
      })
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setReferralData({
        ...referralData,
        image: file
      })
      
      // Create image preview
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    console.log('Saving referral data:', referralData)
    // Add API call to save data
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Header with language selection and save button */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-4 py-2 rounded ${
                selectedLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('th')}
              className={`px-4 py-2 rounded ${
                selectedLanguage === 'th' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Thai
            </button>
            <button
              onClick={() => setSelectedLanguage('tr')}
              className={`px-4 py-2 rounded ${
                selectedLanguage === 'tr' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Turkish
            </button>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>

        {/* Form content */}
        <div className="p-4">
          <div className="grid gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={referralData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={referralData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Sender Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sender Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="senderPrice"
                value={referralData.senderPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Terms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Terms
              </label>
              <textarea
                name="terms"
                value={referralData.terms}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Receiver Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receiver Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="receiverPrice"
                value={referralData.receiverPrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Expired At */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expired At <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="expiredAt"
                value={referralData.expiredAt}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 object-contain border rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        Restroman support team <span className="text-blue-500">123456789</span>
      </div>
    </div>
  )
} 