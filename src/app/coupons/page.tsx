"use client"

import React from "react"
import Sidebar from "@/components/layout/sidebar"
import Coupons from "@/components/promotion/coupons"

export default function CouponsPage() {
  return (
    <main className="flex min-h-screen">
      <div className="fixed top-0 left-0 bottom-0 w-[240px]" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <Sidebar />
      </div>
      <div className="flex-1 ml-[240px]">
        <Coupons />
      </div>
    </main>
  )
} 