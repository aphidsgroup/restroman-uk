"use client"

import React from "react"
import Sidebar from "@/components/layout/sidebar"
import Referral from "@/components/promotion/referral"

export default function ReferralPage() {
  return (
    <main className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-screen overflow-hidden border-r bg-white">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64">
        <Referral />
      </div>
    </main>
  )
} 