"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Shield, Star, Car, AlertTriangle, CheckCircle, Clock, X, Ban } from "lucide-react"

//  Types 
type UserStatus = "active" | "suspended"

interface TripRecord {
  id: string
  date: string
  driver: string
  from: string
  to: string
  fare: string
  rating: number | null
  status: "completed" | "cancelled"
}

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  location: string
  status: UserStatus
  createdAt: string
  totalTrips: number
  cancelledTrips: number
  totalSpent: string
  avgRating: number
  recentTrips: TripRecord[]
  flags: string[]
}

//  Mock data 
const USER: UserProfile = {
  id: "usr_1001",
  name: "Mary Muthoni",
  email: "mary@example.com",
  phone: "+254 712 345 678",
  location: "Westlands, Nairobi",
  status: "active",
  createdAt: "2026-05-12",
  totalTrips: 47,
  cancelledTrips: 3,
  totalSpent: "KSh 28,450",
  avgRating: 4.6,
  flags: [],
  recentTrips: [
    {
      id: "trp_8821",
      date: "2026-06-12",
      driver: "James Mwangi",
      from: "Westlands",
      to: "CBD",
      fare: "KSh 350",
      rating: 5,
      status: "completed",
    },
    {
      id: "trp_8790",
      date: "2026-06-10",
      driver: "Grace Wanjiku",
      from: "Kilimani",
      to: "Westlands",
      fare: "KSh 420",
      rating: 4,
      status: "completed",
    },
    {
      id: "trp_8754",
      date: "2026-06-08",
      driver: "Dennis Ochieng",
      from: "Westlands",
      to: "Upperhill",
      fare: "KSh 610",
      rating: null,
      status: "cancelled",
    },
    {
      id: "trp_8701",
      date: "2026-06-05",
      driver: "Samuel Gitau",
      from: "CBD",
      to: "Westlands",
      fare: "KSh 390",
      rating: 5,
      status: "completed",
    },
    {
      id: "trp_8640",
      date: "2026-06-01",
      driver: "Amina Hassan",
      from: "Westlands",
      to: "Karen",
      fare: "KSh 980",
      rating: 4,
      status: "completed",
    },
  ],
}

//  Constants 
const statusStyle: Record<UserStatus, string> = 
{
  active: "bg-emerald-50 text-emerald-700",
  suspended: "bg-red-50 text-red-700",
}

const statusDot: Record<UserStatus, string> = 
{
  active: "bg-emerald-500",
  suspended: "bg-red-500",
}

//  Sub-components
function StatusPill({ status }: { status: UserStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyle[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status]}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, iconColor,}: { icon: React.ElementType; label: string; value: string; sub?: string; iconColor: string}) 
{
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-px transition-all duration-200">
        <div className="flex items-start justify-between gap-3">
            {/* Left content */}
            <div className="min-w-0">
                <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mt-1">{label}</p>
            </div>
            {/* Right icon */}
            <div className={`p-2 rounded-lg shrink-0 ${iconColor}`}>
                <Icon size={16} />
            </div>
        </div>
    </div>
  )
}

//  Main page 
const UserProfilePage = () => 
{
    const [user, setUser] = useState<UserProfile>(USER)
    const [toast, setToast] = useState<{ message: string; type: "success" | "danger" } | null>(null)

    const showToast = (message: string, type: "success" | "danger") => 
    {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    const handleDisable = () => 
    {
        setUser((u) => ({ ...u, status: "suspended" }))
        showToast("User has been suspended.", "danger")
    }

    const handleEnable = () => 
    {
        setUser((u) => ({ ...u, status: "active" }))
        showToast("User has been enabled.", "success")
    }

    const cancelRate = user.totalTrips > 0 ? ((user.cancelledTrips / user.totalTrips) * 100).toFixed(0) : "0"

    const router = useRouter()

    return (
        <div className="px-4 pb-10">
            {/* Toast */}
            {
                toast && (
                    <div className="fixed bottom-6 right-6 z-50">
                        <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg w-80 ${toast.type === "danger" ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
                            <div className={`mt-0.5 shrink-0 p-1.5 rounded-lg ${toast.type === "danger" ? "bg-red-100" : "bg-emerald-100"}`}>
                            {
                                toast.type === "danger" 
                                ? 
                                    <AlertTriangle size={13} className="text-red-600" />
                                : 
                                    <CheckCircle size={13} className="text-emerald-600" />
                            }
                            </div>
                            <p className={`flex-1 text-sm font-medium ${toast.type === "danger" ? "text-red-700" : "text-emerald-700"}`}>{toast.message}</p>
                            <button onClick={() => setToast(null)} className={`shrink-0 p-0.5 rounded hover:bg-black/10 transition-colors ${toast.type === "danger" ? "text-red-400" : "text-emerald-400"}`}>
                                <X size={13} />
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Back nav */}
            <div className="py-2">
                <button onClick={()=> router.back()} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 hover:underline transition-colors">
                    <ArrowLeft size={14} />
                    Back
                </button>
            </div>

            {/* Profile header */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 mb-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold shrink-0">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        {/* Name + meta */}
                        <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                <StatusPill status={user.status} />
                                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                Passenger
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-x-16 gap-y-1 mt-2">
                                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                    <Mail size={13} className="text-gray-400" />
                                    {user.email}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                    <Phone size={13} className="text-gray-400" />
                                    {user.phone}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                    <MapPin size={13} className="text-gray-400" />
                                    {user.location}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                    <Calendar size={13} className="text-gray-400" />
                                    Joined {user.createdAt}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        {
                            user.status === "active" 
                            ? 
                                <button onClick={handleDisable} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
                                    <Ban size={14} />
                                    Disable user
                                </button>
                            : 
                                <button onClick={handleEnable} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                                    <CheckCircle size={14} />
                                    Enable user
                                </button>
                        }
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                <StatCard icon={Car} label="Total Trips" value={String(user.totalTrips)} iconColor="bg-blue-50 text-blue-600" />
                <StatCard icon={Shield} label="Total Spent" value={user.totalSpent} iconColor="bg-emerald-50 text-emerald-600" />
                <StatCard icon={Star} label="Avg Rating Given" value={String(user.avgRating)} iconColor="bg-amber-50 text-amber-500" />
                <StatCard icon={AlertTriangle} label="Cancel Rate" value={`${cancelRate}%`} iconColor="bg-red-50 text-red-500" />
            </div>

            {/* Recent trips */}
            <div className="bg-white border border-gray-300 rounded-xl overflow-visible">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-900">Recent Trips</h2>
                        <span className="ml-1 text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                        {user.recentTrips.length}
                        </span>
                    </div>
                    <Link href={`/admin/users/${user.id}/trips`} className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors">View all</Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="text-left px-6 py-3 font-medium">Trip ID</th>
                                <th className="text-left px-6 py-3 font-medium">Date</th>
                                <th className="text-left px-6 py-3 font-medium">Driver</th>
                                <th className="text-left px-6 py-3 font-medium">Route</th>
                                <th className="text-left px-6 py-3 font-medium">Fare</th>
                                <th className="text-left px-6 py-3 font-medium">Rating</th>
                                <th className="text-left px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                        {
                            user.recentTrips.map((trip) => (
                                <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3.5 font-mono text-xs text-gray-400">{trip.id}</td>

                                    <td className="px-6 py-3.5 text-gray-500 text-xs">{trip.date}</td>

                                    <td className="px-6 py-3.5">
                                        <p className="font-medium text-gray-900">{trip.driver}</p>
                                    </td>

                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-1.5 text-gray-700">
                                            <span>{trip.from}</span>
                                            <span className="text-gray-300">→</span>
                                            <span>{trip.to}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-3.5 font-semibold text-gray-900">{trip.fare}</td>

                                    <td className="px-6 py-3.5">
                                        {
                                            trip.rating !== null 
                                            ? 
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star size={12} fill="currentColor" />
                                                    <span className="text-xs font-semibold text-gray-700">{trip.rating}</span>
                                                </div>
                                            : 
                                                <span className="text-xs text-gray-300">—</span>
                                        }
                                    </td>

                                    <td className="px-6 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${trip.status === "completed" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${trip.status === "completed" ? "bg-emerald-500" : "bg-red-400"}`} />
                                            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage