import Payouts from '@/components/transaction/payouts'
import Sidebar from '@/components/layout/sidebar'

export default function PayoutsPage() {
  return (
    <main className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-screen overflow-hidden border-r bg-white">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64">
        <Payouts />
      </div>
    </main>
  )
} 