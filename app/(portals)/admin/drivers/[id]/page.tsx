"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Car, Phone, Calendar, MapPin, TrendingUp, AlertTriangle, CheckCircle, Navigation, Clock, Trash2, } from "lucide-react"

//  Types 
type DriverStatus = "active" | "suspended"

interface Driver {
    id: string
    name: string
    phone: string
    vehicle: string
    plate: string
    status: DriverStatus
    rating: number
    trips: number
    earnings: string
    joined: string
}

interface TripRecord {
    id: string
    date: string
    from: string
    to: string
    fare: string
    distance: string
    status: "completed" | "cancelled"
}

//  Fixed mock data 
const DRIVER: Driver = {
    id:       "d1",
    name:     "James Mwangi",
    phone:    "+254 712 345 678",
    vehicle:  "Toyota Fielder",
    plate:    "KCB 123A",
    status:   "active",
    rating:   4.92,
    trips:    834,
    earnings: "KSh 412,000",
    joined:   "Jan 2023",
}

const TRIPS: TripRecord[] = [
    { id: "t1", date: "12 Jun 2026", from: "Westlands",  to: "CBD",        fare: "KSh 420", distance: "6.2 km",  status: "completed" },
    { id: "t2", date: "11 Jun 2026", from: "Kilimani",   to: "Upperhill",  fare: "KSh 310", distance: "4.1 km",  status: "completed" },
    { id: "t3", date: "11 Jun 2026", from: "Lavington",  to: "Westlands",  fare: "KSh 280", distance: "3.8 km",  status: "cancelled" },
    { id: "t4", date: "10 Jun 2026", from: "Karen",      to: "Ngong Road", fare: "KSh 650", distance: "9.4 km",  status: "completed" },
    { id: "t5", date: "10 Jun 2026", from: "CBD",        to: "South B",    fare: "KSh 390", distance: "5.5 km",  status: "completed" },
]

//  Helpers 
const statusBadge: Record<DriverStatus, string> = {
    active:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
    suspended: "bg-red-50 text-red-700 border border-red-200",
}
const statusDot: Record<DriverStatus, string> = {
    active:    "bg-emerald-500",
    suspended: "bg-red-500",
}

//  Sub-components 
const StatCard = ({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub?: string }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gray-50 text-gray-500 shrink-0">
            <Icon size={16} />
        </div>
        <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{value}</p>
            {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
    </div>
)

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
        <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
)

//  Page 
export default function DriverProfilePage()
{
    const router = useRouter()
    const [driver, setDriver]           = useState<Driver>(DRIVER)
    // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const initials   = driver.name.split(" ").map((n) => n[0]).join("")
    const isSuspended = driver.status === "suspended"

    //Function to handle driver status change (active/suspended)
    const handleStatusChange = (status: DriverStatus) =>
    {
        // TODO: await api.patch(`/drivers/${driver.id}/status`, { status })
        setDriver((prev) => ({ ...prev, status }))
    }

    //Function to handle driver deletion (currently commented out)
    // const handleDelete = () =>
    // {
    //     // TODO: await api.delete(`/drivers/${driver.id}`)
    //     router.push("/admin/drivers")
    // }

    return (
        <div className="px-3">

            {/* Back nav */}
            <div className="py-2">
                <Link href="/admin/drivers" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-500 hover:underline transition-colors">
                    <ArrowLeft size={14} />
                    All drivers
                </Link>
            </div>

            {/* Header card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold shrink-0">
                            {initials}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{driver.name}</h1>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="flex items-center gap-1 text-sm text-gray-400">
                                    <Phone size={12} />
                                    {driver.phone}
                                </span>
                                <span className="text-gray-200">·</span>
                                <span className="flex items-center gap-1 text-sm text-gray-400">
                                    <Calendar size={12} />
                                    Joined {driver.joined}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusBadge[driver.status]}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[driver.status]}`} />
                            {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                        </span>

                        {
                            isSuspended 
                            ? 
                                <button onClick={() => handleStatusChange("active")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                                    <CheckCircle size={12} />
                                    Reinstate
                                </button>
                            : 
                                <button onClick={() => handleStatusChange("suspended")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
                                    <AlertTriangle size={12} />
                                    Suspend
                                </button>
                        }
                    </div>
                </div>
            </div>

            {/* Stat cards  */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <StatCard icon={Star}       label="Rating"       value={String(driver.rating)} sub="Out of 5.0" />
                <StatCard icon={Navigation} label="Total trips"  value={driver.trips.toLocaleString()} sub="All time" />
                <StatCard icon={TrendingUp} label="Earnings"     value={driver.earnings} sub="All time" />
                <StatCard icon={Calendar}   label="Member since" value={driver.joined} />
            </div>

            {/* Details + Vehicle  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Contact details</h2>
                    <InfoRow label="Full name" value={driver.name} />
                    <InfoRow label="Phone"     value={driver.phone} />
                    <InfoRow label="Driver ID" value={driver.id.toUpperCase()} />
                    <InfoRow label="Status"    value={driver.status.charAt(0).toUpperCase() + driver.status.slice(1)} />
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Vehicle</h2>
                    <div className="flex items-center gap-3 py-3 border-b border-gray-50">
                        <div className="p-2 rounded-lg bg-gray-50 text-gray-400 shrink-0">
                            <Car size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{driver.vehicle}</p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{driver.plate}</p>
                        </div>
                    </div>
                    <InfoRow label="Make & model" value={driver.vehicle} />
                    <InfoRow label="Plate"        value={driver.plate} />
                </div>
            </div>

            {/* Recent trips */}
            <div className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-900">Recent trips</h2>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{TRIPS.length}</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wide">
                                <th className="text-left px-5 py-3 font-medium">Date</th>
                                <th className="text-left px-5 py-3 font-medium">From</th>
                                <th className="text-left px-5 py-3 font-medium">To</th>
                                <th className="text-left px-5 py-3 font-medium">Distance</th>
                                <th className="text-left px-5 py-3 font-medium">Fare</th>
                                <th className="text-left px-5 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {
                                TRIPS.map((trip) => (
                                    <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap">{trip.date}</td>
                                        <td className="px-5 py-3">
                                            <span className="flex items-center gap-1 text-gray-700">
                                                <MapPin size={11} className="text-gray-300 shrink-0" />
                                                {trip.from}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="flex items-center gap-1 text-gray-700">
                                                <MapPin size={11} className="text-blue-400 shrink-0" />
                                                {trip.to}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-xs text-gray-500 font-mono">{trip.distance}</td>
                                        <td className="px-5 py-3 font-semibold text-gray-900">{trip.fare}</td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                trip.status === "completed"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}>
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

            {/* Danger zone  */}
            {/* <div className="bg-white border border-red-100 rounded-xl p-5">
                <h2 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">Danger zone</h2>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Delete this driver</p>
                        <p className="text-xs text-gray-400 mt-0.5">Permanently removes the driver and all associated data. This cannot be undone.</p>
                    </div>
                    {
                        showDeleteConfirm 
                        ? 
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-red-500 font-medium">Are you sure?</span>
                                <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleDelete} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors">
                                    Yes, delete
                                </button>
                            </div>
                        : 
                            <button onClick={() => setShowDeleteConfirm(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
                                <Trash2 size={12} />
                                Delete driver
                            </button>
                    }
                </div>
            </div> */}
        </div>
    )
}