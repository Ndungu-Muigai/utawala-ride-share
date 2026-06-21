/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { notFound, useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Phone, Calendar, Wallet, Repeat, TrendingUp } from "lucide-react"

//  Types
interface TripRecord {
    id: string
    date: string
    pickup: string
    dropoff: string
    fare: string
    status: "Completed" | "Cancelled"
}

interface PassengerProfile {
    id: string
    name: string
    phone: string
    joined: string
    tripsWithDriver: number
    totalFaresPaid: string
    avgFare: string
    trips: TripRecord[]
}

//  Mock data — in a real app this would come from a fetch/DB call keyed on params.id
const PASSENGERS: Record<string, PassengerProfile> = {
    "PAS-881": {
        id: "PAS-881",
        name: "Faith Mutua",
        phone: "+254 722 987 654",
        joined: "Mar 2024",
        tripsWithDriver: 14,
        totalFaresPaid: "KES 6,180",
        avgFare: "KES 441",
        trips: [
            { id: "T-1042", date: "18 Jun 2026", pickup: "Westlands",  dropoff: "CBD",        fare: "KES 480", status: "Completed" },
            { id: "T-1031", date: "14 Jun 2026", pickup: "Kilimani",   dropoff: "Karen",      fare: "KES 720", status: "Completed" },
            { id: "T-1019", date: "09 Jun 2026", pickup: "CBD",        dropoff: "Westlands",  fare: "KES 410", status: "Completed" },
            { id: "T-1003", date: "02 Jun 2026", pickup: "Lavington",  dropoff: "CBD",        fare: "KES 390", status: "Cancelled" },
            { id: "T-0988", date: "27 May 2026", pickup: "CBD",        dropoff: "Kilimani",   fare: "KES 350", status: "Completed" },
            { id: "T-0975", date: "20 May 2026", pickup: "CBD",        dropoff: "Karen",      fare: "KES 690", status: "Completed" },
            { id: "T-0960", date: "13 May 2026", pickup: "Karen",      dropoff: "CBD",        fare: "KES 670", status: "Completed" },
            { id: "T-0944", date: "06 May 2026", pickup: "CBD",        dropoff: "Westlands",  fare: "KES 420", status: "Completed" },
            { id: "T-0930", date: "29 Apr 2026", pickup: "Westlands",  dropoff: "Lavington",  fare: "KES 380", status: "Completed" },
            { id: "T-0915", date: "22 Apr 2026", pickup: "Lavington",  dropoff: "CBD",        fare: "KES 400", status: "Cancelled" },
            { id: "T-0899", date: "15 Apr 2026", pickup: "CBD",        dropoff: "Kilimani",   fare: "KES 360", status: "Completed" },
            { id: "T-0884", date: "08 Apr 2026", pickup: "Kilimani",   dropoff: "CBD",        fare: "KES 370", status: "Completed" },
            { id: "T-0870", date: "01 Apr 2026", pickup: "CBD",        dropoff: "Westlands",  fare: "KES 410", status: "Completed" },
            { id: "T-0855", date: "25 Mar 2026", pickup: "Westlands",  dropoff: "CBD",        fare: "KES 430", status: "Completed" },
        ],
    },
    "PAS-304": {
        id: "PAS-304",
        name: "David Ochieng",
        phone: "+254 733 123 456",
        joined: "Jul 2024",
        tripsWithDriver: 6,
        totalFaresPaid: "KES 2,840",
        avgFare: "KES 473",
        trips: [
            { id: "T-2210", date: "17 Jun 2026", pickup: "CBD",             dropoff: "South B",         fare: "KES 520", status: "Completed" },
            { id: "T-2188", date: "10 Jun 2026", pickup: "Industrial Area", dropoff: "CBD",             fare: "KES 460", status: "Completed" },
            { id: "T-2160", date: "03 Jun 2026", pickup: "CBD",             dropoff: "South B",         fare: "KES 510", status: "Completed" },
            { id: "T-2131", date: "26 May 2026", pickup: "South B",         dropoff: "CBD",             fare: "KES 470", status: "Completed" },
            { id: "T-2098", date: "18 May 2026", pickup: "CBD",             dropoff: "Industrial Area", fare: "KES 440", status: "Cancelled" },
            { id: "T-2075", date: "11 May 2026", pickup: "CBD",             dropoff: "South B",         fare: "KES 500", status: "Completed" },
        ],
    },
    "PAS-192": {
        id: "PAS-192",
        name: "Aminah Yusuf",
        phone: "+254 701 456 789",
        joined: "May 2026",
        tripsWithDriver: 1,
        totalFaresPaid: "KES 650",
        avgFare: "KES 650",
        trips: [
            { id: "T-3301", date: "12 Jun 2026", pickup: "Eastleigh", dropoff: "CBD", fare: "KES 650", status: "Completed" },
        ],
    },
    "PAS-445": {
        id: "PAS-445",
        name: "John Mwangi",
        phone: "+254 715 555 222",
        joined: "Jan 2025",
        tripsWithDriver: 3,
        totalFaresPaid: "KES 1,170",
        avgFare: "KES 390",
        trips: [
            { id: "T-4410", date: "15 Jun 2026", pickup: "Ngong Road", dropoff: "CBD",        fare: "KES 410", status: "Completed" },
            { id: "T-4392", date: "28 May 2026", pickup: "CBD",        dropoff: "Ngong Road", fare: "KES 390", status: "Completed" },
            { id: "T-4371", date: "10 May 2026", pickup: "Ngong Road", dropoff: "Karen",      fare: "KES 380", status: "Completed" },
        ],
    },
    "PAS-210": {
        id: "PAS-210",
        name: "Grace Achieng",
        phone: "+254 721 444 555",
        joined: "Sep 2024",
        tripsWithDriver: 8,
        totalFaresPaid: "KES 3,920",
        avgFare: "KES 490",
        trips: [
            { id: "T-5521", date: "19 Jun 2026", pickup: "Kileleshwa", dropoff: "CBD",         fare: "KES 510", status: "Completed" },
            { id: "T-5503", date: "13 Jun 2026", pickup: "CBD",        dropoff: "Kileleshwa",  fare: "KES 480", status: "Completed" },
            { id: "T-5480", date: "06 Jun 2026", pickup: "Kileleshwa", dropoff: "Westlands",   fare: "KES 500", status: "Completed" },
            { id: "T-5452", date: "29 May 2026", pickup: "Westlands",  dropoff: "Kileleshwa",  fare: "KES 470", status: "Completed" },
            { id: "T-5419", date: "21 May 2026", pickup: "CBD",        dropoff: "Kileleshwa",  fare: "KES 460", status: "Cancelled" },
            { id: "T-5390", date: "14 May 2026", pickup: "Kileleshwa", dropoff: "CBD",         fare: "KES 490", status: "Completed" },
            { id: "T-5362", date: "07 May 2026", pickup: "CBD",        dropoff: "Westlands",   fare: "KES 510", status: "Completed" },
            { id: "T-5340", date: "30 Apr 2026", pickup: "Westlands",  dropoff: "Kileleshwa",  fare: "KES 480", status: "Completed" },
        ],
    },
    "PAS-603": {
        id: "PAS-603",
        name: "Peter Kamau",
        phone: "+254 734 888 111",
        joined: "Feb 2024",
        tripsWithDriver: 11,
        totalFaresPaid: "KES 5,400",
        avgFare: "KES 491",
        trips: [
            { id: "T-6630", date: "20 Jun 2026", pickup: "Embakasi", dropoff: "CBD",      fare: "KES 540", status: "Completed" },
            { id: "T-6611", date: "15 Jun 2026", pickup: "CBD",      dropoff: "Embakasi", fare: "KES 520", status: "Completed" },
            { id: "T-6584", date: "08 Jun 2026", pickup: "Embakasi", dropoff: "JKIA",     fare: "KES 600", status: "Completed" },
            { id: "T-6550", date: "30 May 2026", pickup: "JKIA",     dropoff: "Embakasi", fare: "KES 580", status: "Completed" },
            { id: "T-6517", date: "22 May 2026", pickup: "CBD",      dropoff: "Embakasi", fare: "KES 510", status: "Completed" },
            { id: "T-6490", date: "15 May 2026", pickup: "CBD",      dropoff: "Embakasi", fare: "KES 500", status: "Completed" },
            { id: "T-6462", date: "08 May 2026", pickup: "Embakasi", dropoff: "CBD",      fare: "KES 530", status: "Completed" },
            { id: "T-6431", date: "01 May 2026", pickup: "CBD",      dropoff: "JKIA",     fare: "KES 610", status: "Completed" },
            { id: "T-6405", date: "24 Apr 2026", pickup: "JKIA",     dropoff: "CBD",      fare: "KES 590", status: "Cancelled" },
            { id: "T-6378", date: "17 Apr 2026", pickup: "Embakasi", dropoff: "CBD",      fare: "KES 520", status: "Completed" },
            { id: "T-6350", date: "10 Apr 2026", pickup: "CBD",      dropoff: "Embakasi", fare: "KES 540", status: "Completed" },
        ],
    },
    "PAS-712": {
        id: "PAS-712",
        name: "Mercy Wanjiku",
        phone: "+254 705 222 333",
        joined: "Apr 2026",
        tripsWithDriver: 2,
        totalFaresPaid: "KES 950",
        avgFare: "KES 475",
        trips: [
            { id: "T-7701", date: "16 Jun 2026", pickup: "Roysambu", dropoff: "CBD",       fare: "KES 500", status: "Completed" },
            { id: "T-7680", date: "05 Jun 2026", pickup: "CBD",      dropoff: "Roysambu",  fare: "KES 450", status: "Cancelled" },
        ],
    },
}

const tripStatusStyle: Record<TripRecord["status"], string> =
{
    Completed: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
}

const tripStatusDot: Record<TripRecord["status"], string> =
{
    Completed: "bg-emerald-500",
    Cancelled: "bg-red-500",
}

const PAGE_SIZE_OPTIONS = [5, 10, 20] as const

//  Pagination component
const Pagination = ({ page, totalPages, pageSize, onPage, onPageSize }: { page: number, totalPages: number, pageSize: number, onPage: (page: number) => void, onPageSize: (size: number) => void }) =>
{
    const getPages = (): (number | "…")[] =>
    {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
        if (page <= 4)              return [1, 2, 3, 4, 5, "…", totalPages]
        if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        return [1, "…", page - 1, page, page + 1, "…", totalPages]
    }

    return (
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-gray-100 flex-wrap gap-y-2">
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Rows per page</span>
                <select value={pageSize} onChange={(e) => onPageSize(Number(e.target.value))} className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-600 outline-none focus:border-blue-400 bg-white">
                    {
                        PAGE_SIZE_OPTIONS.map(n =>
                            <option key={n} value={n}>{n}</option>
                        )
                    }
                </select>
            </div>

            <div className="flex items-center gap-1">
                <button onClick={() => onPage(page - 1)} disabled={page === 1} className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft size={14} />
                </button>

                {
                    getPages().map((p, i) =>
                        p === "…"
                            ?
                                <span key={`ellipsis-${i}`} className="px-1.5 text-xs text-gray-400 select-none">…</span>
                            :
                                <button key={p} onClick={() => onPage(p as number)} className={`min-w-7 h-7 rounded-md text-xs font-medium transition-colors ${p === page ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}>
                                    {p}
                                </button>
                    )
                }

                <button onClick={() => onPage(page + 1)} disabled={page === totalPages} className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    )
}

// NOTE: in Next.js 15+, `params` is a Promise. In a Client Component it must be
// unwrapped with React's `use()` hook (you can't make a Client Component async).
const DriverPassenger = ({ params }: { params: Promise<{ id: string }> }) =>
{
    const router = useRouter()
    const { id } = use(params)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    // Reset to page 1 when viewing a different passenger or changing page size
    useEffect(() => { setPage(1) }, [id, pageSize])

    const passenger = PASSENGERS[id]

    if (!passenger) notFound()

    const totalPages    = Math.max(1, Math.ceil(passenger.trips.length / pageSize))
    const safePage       = Math.min(page, totalPages)
    const paginatedTrips = passenger.trips.slice((safePage - 1) * pageSize, safePage * pageSize)

    const initials = passenger.name.split(" ").map((n) => n[0]).join("")

    const stats = [
        { title: "Total Trips",      value: String(passenger.tripsWithDriver), icon: Repeat,     color: "bg-blue-50 text-blue-600"     },
        { title: "Total Fares Paid", value: passenger.totalFaresPaid,          icon: Wallet,      color: "bg-emerald-50 text-emerald-600" },
        { title: "Avg Fare / Trip",  value: passenger.avgFare,                 icon: TrendingUp,  color: "bg-amber-50 text-amber-500"   },
    ]

    return (
        <div className="px-4 pb-2">

            {/* Back link */}
            <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-1 py-3 hover:underline">
                <ChevronLeft size={14} />
                Back
            </button>

            {/* Profile header */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 mb-3 flex flex-wrap items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold shrink-0">
                    {initials}
                </div>

                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl font-bold text-gray-900">{passenger.name}</h1>
                        <span className="text-xs font-mono text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
                            {passenger.id}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1.5">
                            <Phone size={13} />
                            {passenger.phone}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            Joined {passenger.joined}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                {
                    stats.map((stat) =>
                    {
                        const Icon = stat.icon
                        return (
                            <div key={stat.title} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-px transition-all duration-200">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mt-1">{stat.title}</p>
                                    </div>
                                    <div className={`p-2 rounded-lg shrink-0 ${stat.color}`}>
                                        <Icon size={20} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Trip history */}
            <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-900">Trip History</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="text-left px-6 py-3 font-medium">Date</th>
                                <th className="text-left px-6 py-3 font-medium">Route</th>
                                <th className="text-left px-6 py-3 font-medium">Fare</th>
                                <th className="text-left px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {
                                paginatedTrips.map((trip) => (
                                    <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3.5 text-gray-700">{trip.date}</td>
                                        <td className="px-6 py-3.5 text-gray-700">
                                            {trip.pickup} <span className="text-gray-300">→</span> {trip.dropoff}
                                        </td>
                                        <td className="px-6 py-3.5 font-semibold text-gray-900">{trip.fare}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${tripStatusStyle[trip.status]}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${tripStatusDot[trip.status]}`} />
                                                {trip.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <Pagination page={safePage} totalPages={totalPages} pageSize={pageSize} onPage={setPage} onPageSize={setPageSize} />
            </div>
        </div>
    )
}

export default DriverPassenger