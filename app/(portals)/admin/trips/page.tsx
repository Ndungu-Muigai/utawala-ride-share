"use client"

import { useMemo, useState, useRef } from "react"
import Link from "next/link"
import { createPortal } from "react-dom"
import { Clock, Search, MoreVertical, Eye, CheckCircle, X, } from "lucide-react"

type TripStatus = "Completed" | "Ongoing" | "Cancelled"

type Trip = {
  id: string
  driver: string
  car: string
  from: string
  to: string
  fare: string
  status: TripStatus
  date: string
}

const TRIPS: Trip[] = [
    {
        id: "#TRP-001",
        driver: "James Otieno",
        car: "KCB 123A",
        from: "Westlands",
        to: "CBD",
        fare: "KES 1200",
        status: "Completed",
        date: "2026-06-10",
    },
    {
        id: "#TRP-002",
        driver: "Amina Hassan",
        car: "KDA 456B",
        from: "Kilimani",
        to: "Upperhill",
        fare: "KES 850",
        status: "Ongoing",
        date: "2026-06-11",
    },
    {
        id: "#TRP-003",
        driver: "Brian Otieno",
        car: "KDB 789C",
        from: "Karen",
        to: "CBD",
        fare: "KES 1500",
        status: "Cancelled",
        date: "2026-06-12",
    },
]

const statusStyle: Record<TripStatus, string> = 
{
  Completed: "bg-emerald-50 text-emerald-700",
  Ongoing: "bg-blue-50 text-blue-700",
  Cancelled: "bg-red-50 text-red-700",
}

/* ACTION MENU  */
function ActionMenu({ trip }: { trip: Trip }) 
{
    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null)
    const [pos, setPos] = useState({ top: 0, right: 0 })

    const toggle = () => 
    {
        if (btnRef.current) 
        {
            const rect = btnRef.current.getBoundingClientRect()
            setPos({top: rect.bottom + window.scrollY + 6, right: window.innerWidth - rect.right, })
        }
        setOpen(v => !v)
    }

    // Strip the leading "#" so the URL is /admin/trips/TRP-001
    const tripId = trip.id.replace("#", "")

    return (
        <div className="relative">
            <button ref={btnRef} onClick={toggle} className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
                <MoreVertical size={15} />
            </button>

            {
                open &&
                    createPortal(
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

                        <div style={{ top: pos.top, right: pos.right }} className="fixed z-20 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                            <Link  href={`/admin/trips/${tripId}`} onClick={() => setOpen(false)} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <Eye size={14} />
                                View trip details
                            </Link>
                        </div>
                    </>,
                    document.body
                )
            }
        </div>
    )
}

/* PAGE  */
const TripsPage = () => 
{
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState<"All" | TripStatus>("All")

    const filtered = useMemo(() => 
    {
        const q = search.toLowerCase()

        return TRIPS.filter(t => 
        {
            const matchSearch = t.id.toLowerCase().includes(q) || t.driver.toLowerCase().includes(q) || t.car.toLowerCase().includes(q)

            const matchFilter = filter === "All" || t.status === filter

            return matchSearch && matchFilter
        })
    }, [search, filter])

    const stats = [
        { label: "Total Trips",value: TRIPS.length, icon: Clock, color: "bg-blue-50 text-blue-600" },
        { label: "Completed", value: TRIPS.filter(t => t.status === "Completed").length, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
        { label: "Ongoing", value: TRIPS.filter(t => t.status === "Ongoing").length, icon: Clock, color: "bg-amber-50 text-amber-600" },
        { label: "Cancelled", value: TRIPS.filter(t => t.status === "Cancelled").length, icon: X, color: "bg-red-50 text-red-600" },
    ]

    return (
        <div className="px-4 pb-6">

            {/* Header */}
            <div className="mb-3">
                <h1 className="text-3xl font-bold text-gray-900">Trips</h1>
                <p className="text-gray-500 text-sm mt-1">
                Monitor ride activity and trip history
                </p>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                {
                    stats.map((s) => 
                    {
                        const Icon = s.icon
                        return (
                            <div key={s.label} className="bg-white border border-gray-300 rounded-xl p-4 hover:shadow-sm transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                                        <p className="text-xs uppercase tracking-wide text-gray-500 mt-1">{s.label}</p>
                                    </div>
                                    <div className={`p-2.5 rounded-lg ${s.color}`}>
                                        <Icon size={18} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* TABLE CARD */}
            <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">

                {/* Toolbar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-900">All Trips</h2>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">
                        {filtered.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search trips..." className="pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400 w-52 text-gray-700" />
                        </div>

                        {/* Filters */}
                        {
                            (["All", "Completed", "Ongoing", "Cancelled"] as const).map((f) => (
                                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                                    {f}
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="text-left px-6 py-3">Trip ID</th>
                                <th className="text-left px-6 py-3">Date</th>
                                <th className="text-left px-6 py-3">Driver</th>
                                <th className="text-left px-6 py-3">Car</th>
                                <th className="text-left px-6 py-3">Route</th>
                                <th className="text-left px-6 py-3">Fare</th>
                                <th className="text-left px-6 py-3">Status</th>
                                <th className="px-6 py-3" />
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                        {
                            filtered.length === 0 
                            ? 
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">No trips match your search.</td>
                                </tr>
                            : 
                                filtered.map((trip) => (
                                    <tr key={trip.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-3 text-xs font-mono text-gray-500">{trip.id}</td>
                                        <td className="px-6 py-3 text-gray-600">{trip.date}</td>
                                        <td className="px-6 py-3 font-medium text-gray-900">{trip.driver}</td>
                                        <td className="px-6 py-3 text-gray-600 font-mono">{trip.car}</td>
                                        <td className="px-6 py-3 text-gray-500 text-xs">{trip.from} → {trip.to}</td>
                                        <td className="px-6 py-3 font-semibold text-gray-900">{trip.fare}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[trip.status]}`}>{trip.status}</span>
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <ActionMenu trip={trip} />
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

export default TripsPage