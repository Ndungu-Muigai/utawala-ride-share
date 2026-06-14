"use client"

import Link from "next/link"

import { Car, DollarSign, Route, Users, Clock, Star, AlertCircle } from "lucide-react"

const AdminDashboard = () => 
{
    const stats = [
        {
            title: "Total Users",
            value: "1,000",
            change: "+12% this month",
            trending: "up",
            icon: Users,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Total Drivers",
            value: "500",
            change: "+5% this month",
            trending: "up",
            icon: Car,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Total Trips",
            value: "2,000",
            change: "+18% this month",
            trending: "up",
            icon: Route,
            color: "bg-violet-50 text-violet-600",
        },
        {
            title: "Total Earnings",
            value: "KES 100,000",
            change: "+9% this month",
            trending: "up",
            icon: DollarSign,
            color: "bg-amber-50 text-amber-600",
        },
    ]

    const recentTrips = [
        { id: "#TRP-001", user: "Alice Mwangi",   driver: "James Otieno",  from: "Westlands",    to: "CBD",          fare: "KES 1200", status: "Completed", },
        { id: "#TRP-002", user: "Brian Kamau",    driver: "Peter Njoroge", from: "Kilimani",     to: "Upperhill",    fare: "KES 850",  status: "Ongoing",},
    ]

    const topDrivers = [
        { name: "James Otieno",  trips: 120, rating: 4.9, earnings: "KES 1,200" },
        { name: "John Kamau",    trips: 75,  rating: 4.6, earnings: "KES 750" },
    ]

    const statusStyle: Record<string, string> = {
        Completed: "bg-emerald-50 text-emerald-700",
        Ongoing:   "bg-blue-50 text-blue-700",
        Cancelled: "bg-red-50 text-red-700",
    }

    return (
        <div className="px-4">

        {/* Header */}
        <div className="mb-1 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Super Admin</h1>
            <p className="text-gray-500 text-sm mt-1">System overview and management</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            {
                stats.map((stat) => 
                {
                    const Icon = stat.icon
                    return (
                        <div key={stat.title} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-px transition-all duration-200">
                            <div className="flex items-center justify-between gap-3">

                                {/* Left content */}
                                <div className="min-w-0">
                                    <p className="text-xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mt-1">{stat.title}</p>
                                </div>

                                {/* Right icon */}
                                <div className={`p-2 rounded-lg shrink-0 ${stat.color}`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Recent Trips — takes 2/3 width */}
            <div className="xl:col-span-2 bg-white border border-gray-300 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-900">Recent Trips</h2>
                    </div>
                    <Link href="/admin/trips" className="text-xs text-blue-600 hover:underline">View all</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="text-left px-6 py-3 font-medium">Trip ID</th>
                                <th className="text-left px-6 py-3 font-medium">User</th>
                                <th className="text-left px-6 py-3 font-medium">Driver</th>
                                <th className="text-left px-6 py-3 font-medium">Route</th>
                                <th className="text-left px-6 py-3 font-medium">Fare</th>
                                <th className="text-left px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {
                                recentTrips.map((trip) => (
                                    <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3.5 text-gray-400 text-xs font-mono">{trip.id}</td>
                                        <td className="px-6 py-3.5 font-medium text-gray-900">{trip.user}</td>
                                        <td className="px-6 py-3.5 text-gray-600">{trip.driver}</td>
                                        <td className="px-6 py-3.5 text-gray-500 text-xs">
                                        {trip.from} → {trip.to}
                                        </td>
                                        <td className="px-6 py-3.5 font-semibold text-gray-900">{trip.fare}</td>
                                        <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[trip.status]}`}>
                                            {trip.status}
                                        </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Drivers — takes 1/3 width */}
            <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
                    <div className="flex items-center gap-2">
                    <Star size={16} className="text-gray-400" />
                    <h2 className="text-sm font-semibold text-gray-900">Top Drivers</h2>
                    </div>
                    <Link href="/admin/drivers" className="text-xs text-blue-600 hover:underline">View all</Link>
                </div>
                <ul className="divide-y divide-gray-50">
                    {
                        topDrivers.map((driver, index) => (
                            <li key={driver.name} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                                <span className="text-xs font-bold text-gray-300 w-4">{index + 1}</span>
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                                    {
                                        driver.name.split(" ").map((n) => n[0]).join("")
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{driver.name}</p>
                                    <p className="text-xs text-gray-400">{driver.trips} trips · {driver.earnings}</p>
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={12} fill="currentColor" />
                                    <span className="text-xs font-semibold text-gray-700">{driver.rating}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                {/* Alert */}
                <div className="mx-4 mb-4 mt-2 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-red-600">2 drivers have low ratings and need review.</p>
                </div>
            </div>

        </div>
        </div>
    )
}

export default AdminDashboard