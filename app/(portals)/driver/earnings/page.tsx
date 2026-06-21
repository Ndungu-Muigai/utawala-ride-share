"use client"

import { useState } from "react"
import { TrendingUp, Calendar, DollarSign, Download, Landmark, Wallet, Percent } from "lucide-react"

// Types
interface EarningSummary 
{
    totalGross: string
    platformCommission: string
    netPayout: string
    withdrawableBalance: string
}

interface PayoutRecord 
{
    id: string
    date: string
    amount: string
    method: "Bank Transfer" | "M-Pesa"
    reference: string
    status: "Processed" | "Pending"
}

// Mock Data
const SUMMARY: EarningSummary = 
{
    totalGross: "KSh 528,200",
    platformCommission: "KSh 116,200", // e.g., 22%
    netPayout: "KSh 412,000",
    withdrawableBalance: "KSh 14,500",
}

const PAYOUTS: PayoutRecord[] = 
[
    { id: "p1", date: "15 Jun 2026", amount: "KSh 42,000", method: "M-Pesa", reference: "TLX98273H", status: "Processed" },
    { id: "p2", date: "08 Jun 2026", amount: "KSh 38,500", method: "Bank Transfer", reference: "BK-00912", status: "Processed" },
    { id: "p3", date: "01 Jun 2026", amount: "KSh 51,000", method: "M-Pesa", reference: "TLX47102J", status: "Processed" },
    { id: "p4", date: "25 May 2026", amount: "KSh 33,200", method: "M-Pesa", reference: "TLX11244M", status: "Processed" },
]

// Sub-components
const MetricCard = ({ icon: Icon, label, value, sub, highlight = false }: { icon: React.ElementType; label: string; value: string; sub?: string; highlight?: boolean }) => (
    <div className={`border rounded-xl p-5 flex items-start gap-4 bg-white ${highlight ? 'border-blue-200 ring-2 ring-blue-500/5' : 'border-gray-200'}`}>
        <div className={`p-2.5 rounded-lg shrink-0 ${highlight ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
            <Icon size={18} />
        </div>
        <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
            {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
    </div>
)

const DriversEarnings = () => 
{
    const [payouts] = useState<PayoutRecord[]>(PAYOUTS)
    const [summary] = useState<EarningSummary>(SUMMARY)

    return (
        <div className="px-3">
            {/* Header / Actions */}
            <div className="flex items-center justify-between py-2 flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Earnings Financial Portal</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Track lifetime gross revenues, payout history, and platform balances.</p>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm">
                    <Download size={13} />
                    Export Financials (.CSV)
                </button>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                <MetricCard icon={TrendingUp} label="Gross Bookings" value={summary.totalGross} sub="Total passenger fares accrued" />
                <MetricCard icon={Percent} label="Platform Fee" value={summary.platformCommission} sub="Standard 22% marketplace cut" />
                <MetricCard icon={Wallet} label="Net Driver Payouts" value={summary.netPayout} sub="Disbursed to driver to date" />
                <MetricCard icon={DollarSign} label="Withdrawable Balance" value={summary.withdrawableBalance} sub="Available clear funds" highlight={true} />
            </div>

            {/* Historic Disbursals Ledger */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-4">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Landmark size={14} className="text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-900">Payout Ledger History</h2>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{payouts.length} cycles</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50/70 text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100">
                                <th className="text-left px-5 py-3 font-medium">Clearance Date</th>
                                <th className="text-left px-5 py-3 font-medium">Disbursal Type</th>
                                <th className="text-left px-5 py-3 font-medium">Reference Code</th>
                                <th className="text-left px-5 py-3 font-medium">Settlement Amount</th>
                                <th className="text-left px-5 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {payouts.map((payout) => (
                                <tr key={payout.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-gray-300" />
                                            {payout.date}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 font-medium text-gray-700">{payout.method}</td>
                                    <td className="px-5 py-3.5 text-xs font-mono text-gray-400">{payout.reference}</td>
                                    <td className="px-5 py-3.5 font-bold text-gray-900">{payout.amount}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100`}>
                                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                            {payout.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DriversEarnings