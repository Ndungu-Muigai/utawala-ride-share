"use client"

import { useMemo, useState, useRef } from "react"
import Link from "next/link"
import { createPortal } from "react-dom"
import {
    Clock,
    Search,
    MoreVertical,
    Eye,
    CheckCircle,
    X,
    Users,
} from "lucide-react"

type TripStatus = "Completed" | "Ongoing" | "Cancelled"

type RoutePassenger = {
    name: string
    fare: string
    status: TripStatus
}

type Route = {
    id: string
    from: string
    to: string
    date: string
    seats: number
    status: TripStatus
    passengers: RoutePassenger[]
}

// TODO: replace with API call — GET /api/driver/routes
const ROUTES: Route[] = [
    {
        id: "#RT-118",
        from: "Kilimani",
        to: "CBD",
        date: "2026-06-20",
        seats: 4,
        status: "Completed",
        passengers: [
            { name: "Faith Wanjiru", fare: "KES 650", status: "Completed" },
            { name: "Dennis Mutua", fare: "KES 480", status: "Completed" },
            { name: "Grace Achieng", fare: "KES 520", status: "Completed" },
            { name: "Samuel Kiprono", fare: "KES 600", status: "Completed" },
        ],
    },
    {
        id: "#RT-117",
        from: "Westlands",
        to: "Lavington",
        date: "2026-06-20",
        seats: 4,
        status: "Ongoing",
        passengers: [
            { name: "Mercy Njeri", fare: "KES 480", status: "Ongoing" },
            { name: "Brian Otieno", fare: "KES 450", status: "Ongoing" },
        ],
    },
    {
        id: "#RT-116",
        from: "South B",
        to: "Upperhill",
        date: "2026-06-20",
        seats: 4,
        status: "Ongoing",
        passengers: [
            { name: "Linet Adhiambo", fare: "KES 720", status: "Ongoing" },
            { name: "Victor Mwangi", fare: "KES 680", status: "Cancelled" },
            { name: "Esther Wambui", fare: "KES 700", status: "Ongoing" },
        ],
    },
    {
        id: "#RT-115",
        from: "Ngong Road",
        to: "CBD",
        date: "2026-06-19",
        seats: 4,
        status: "Cancelled",
        passengers: [
            { name: "Kevin Omondi", fare: "KES 550", status: "Cancelled" },
        ],
    },
    {
        id: "#RT-114",
        from: "Karen",
        to: "Westlands",
        date: "2026-06-19",
        seats: 4,
        status: "Completed",
        passengers: [
            { name: "Purity Chebet", fare: "KES 980", status: "Completed" },
            { name: "Allan Kiptoo", fare: "KES 920", status: "Completed" },
            { name: "Faith Wanjiru", fare: "KES 950", status: "Completed" },
        ],
    },
]

const statusStyle: Record<TripStatus, string> = 
{
    Completed: "bg-emerald-50 text-emerald-700",
    Ongoing: "bg-blue-50 text-blue-700",
    Cancelled: "bg-red-50 text-red-700",
}

/* ACTION MENU  */
function ActionMenu({ route }: { route: Route }) 
{
    const [open, setOpen] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null)
    const [pos, setPos] = useState({ top: 0, right: 0 })

    const toggle = () => 
    {
        if (btnRef.current) 
        {
            const rect = btnRef.current.getBoundingClientRect()
            setPos({ top: rect.bottom + window.scrollY + 6, right: window.innerWidth - rect.right })
        }
        setOpen(v => !v)
    }

    // Strip the leading "#" so the URL is /driver/trips/RT-118
    const routeId = route.id.replace("#", "")

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
                            <Link href={`/driver/trips/${routeId}`} onClick={() => setOpen(false)} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
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
const DriverTrips = () => 
{
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState<"All" | TripStatus>("All")

    const filtered = useMemo(() => 
    {
        const q = search.toLowerCase()

        return ROUTES.filter(r => 
        {
            const matchSearch =
                r.id.toLowerCase().includes(q) ||
                r.from.toLowerCase().includes(q) ||
                r.to.toLowerCase().includes(q)

            const matchFilter = filter === "All" || r.status === filter

            return matchSearch && matchFilter
        })
    }, [search, filter])

    const stats = [
        { label: "Total Routes", value: ROUTES.length, icon: Clock, color: "bg-blue-50 text-blue-600" },
        { label: "Completed", value: ROUTES.filter(r => r.status === "Completed").length, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
        { label: "Ongoing", value: ROUTES.filter(r => r.status === "Ongoing").length, icon: Clock, color: "bg-amber-50 text-amber-600" },
        { label: "Cancelled", value: ROUTES.filter(r => r.status === "Cancelled").length, icon: X, color: "bg-red-50 text-red-600" },
    ]

    return (
        <div className="px-4 pb-6">

            {/* Header */}
            <div className="mb-3">
                <h1 className="text-3xl font-bold text-gray-900">Trips</h1>
                <p className="text-gray-500 text-sm mt-1">
                Routes you&apos;ve created and their booking status
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
                        <h2 className="text-sm font-semibold text-gray-900">All Routes</h2>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">
                        {filtered.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search routes..." className="pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400 w-52 text-gray-700" />
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
                                <th className="text-left px-6 py-3">Route ID</th>
                                <th className="text-left px-6 py-3">Date</th>
                                <th className="text-left px-6 py-3">Route</th>
                                <th className="text-left px-6 py-3">Seats</th>
                                <th className="text-left px-6 py-3">Status</th>
                                <th className="px-6 py-3" />
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                        {
                            filtered.length === 0 
                            ? 
                                <tr>
                                    <td colSpan={6} className="p-6 text-center text-gray-400 text-sm">No routes match your search.</td>
                                </tr>
                            : 
                                filtered.map(route => (
                                    <tr key={route.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-3 text-xs font-mono text-gray-500">{route.id}</td>
                                        <td className="px-6 py-3 text-gray-600">{route.date}</td>
                                        <td className="px-6 py-3 text-gray-500 text-xs">{route.from} → {route.to}</td>
                                        <td className="px-6 py-3 text-gray-600">
                                            <span className="inline-flex items-center gap-1">
                                                <Users size={12} className="text-gray-400" />
                                                {route.passengers.length}/{route.seats}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[route.status]}`}>{route.status}</span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <ActionMenu route={route} />
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

export default DriverTrips