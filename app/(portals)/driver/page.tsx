"use client"

import Link from "next/link"

import { Car, Wallet, Star, User, Clock3, Users, } from "lucide-react"

const DriverDashboard = () => 
{
    const stats = [
        {
            title: "Profile Completion",
            value: "85%",
            icon: User,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Driver Rating",
            value: "4.9",
            icon: Star,
            color: "bg-amber-50 text-amber-600",
        },
        {
            title: "Completed Trips",
            value: "248",
            icon: Car,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Total Earnings",
            value: "KES 52,400",
            icon: Wallet,
            color: "bg-violet-50 text-violet-600",
        },
    ]

    const recentTrips = [
        { id: "#TRP-104", passenger: "Faith Wanjiru", from: "Kilimani", to: "CBD", fare: "KES 650", status: "Completed" },
        { id: "#TRP-103", passenger: "Dennis Mutua", from: "Westlands", to: "Lavington", fare: "KES 480", status: "Completed" },
        { id: "#TRP-102", passenger: "Grace Achieng", from: "South B", to: "Upperhill", fare: "KES 720", status: "Ongoing" },
        { id: "#TRP-101", passenger: "Samuel Kiprono", from: "Ngong Road", to: "CBD", fare: "KES 550", status: "Cancelled" },
    ]

    const statusStyle: Record<string, string> = {
        Completed: "bg-emerald-50 text-emerald-700",
        Ongoing: "bg-blue-50 text-blue-700",
        Cancelled: "bg-red-50 text-red-700",
    }

    const recentPassengers = [
        { name: "Faith Wanjiru", trips: 6, rating: 4.8 },
        { name: "Dennis Mutua", trips: 3, rating: 4.6 },
        { name: "Grace Achieng", trips: 9, rating: 5.0 },
        { name: "Samuel Kiprono", trips: 2, rating: 4.4 },
    ]

    return (
        <div className="px-4 pb-3">

            {/* Header */}
            <div className="mb-3 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, Kevin</h1>
                <p className="text-gray-500 text-sm mt-1">Here&apos;s an overview of your driver account and activity</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-3 mt-3">
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

            {/* Recent Trips + Recent Passengers */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

                {/* Recent Trips — takes 2/3 width */}
                <div className="xl:col-span-2 bg-white border border-gray-300 rounded-xl overflow-hidden h-fit flex flex-col">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Clock3 size={16} className="text-gray-400" />
                            <h2 className="text-sm font-semibold text-gray-900">Recent Trips</h2>
                        </div>
                        <Link href="/driver/trips" className="text-xs text-blue-600 hover:underline">View all</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                    <th className="text-left px-6 py-3 font-medium">Trip ID</th>
                                    <th className="text-left px-6 py-3 font-medium">Passenger</th>
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
                                            <td className="px-6 py-3.5 font-medium text-gray-900">{trip.passenger}</td>
                                            <td className="px-6 py-3.5 text-gray-500 text-xs">{trip.from} → {trip.to}</td>
                                            <td className="px-6 py-3.5 font-semibold text-gray-900">{trip.fare}</td>
                                            <td className="px-6 py-3.5">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[trip.status]}`}>{trip.status}</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Passengers — takes 1/3 width */}
                <div className="bg-white border border-gray-300 rounded-xl overflow-hidden h-fit flex flex-col">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-gray-400" />
                            <h2 className="text-sm font-semibold text-gray-900">Recent Passengers</h2>
                        </div>
                        <Link href="/driver/passengers" className="text-xs text-blue-600 hover:underline">View all</Link>
                    </div>
                    <ul className="divide-y divide-gray-50">
                        {
                            recentPassengers.map(passenger => (
                                <li key={passenger.name} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                                        {
                                            passenger.name.split(" ").map((n) => n[0]).join("")
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{passenger.name}</p>
                                        <p className="text-xs text-gray-400">{passenger.trips} trips together</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <Star size={12} fill="currentColor" />
                                        <span className="text-xs font-semibold text-gray-700">{passenger.rating}</span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DriverDashboard