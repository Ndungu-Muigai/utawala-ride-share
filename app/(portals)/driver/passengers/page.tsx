/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react"

//  Types
interface PassengerRecord {
    id: string
    name: string
    phone: string
    tripsWithDriver: number
    totalFaresPaid: string
}

//  Mock data
const PASSENGERS: PassengerRecord[] = [
    { id: "PAS-881", name: "Faith Mutua",    phone: "+254 722 987 654", tripsWithDriver: 14, totalFaresPaid: "KES 6,180" },
    { id: "PAS-304", name: "David Ochieng",  phone: "+254 733 123 456", tripsWithDriver: 6,  totalFaresPaid: "KES 2,840" },
    { id: "PAS-192", name: "Aminah Yusuf",   phone: "+254 701 456 789", tripsWithDriver: 1,  totalFaresPaid: "KES 650"   },
    { id: "PAS-445", name: "John Mwangi",    phone: "+254 715 555 222", tripsWithDriver: 3,  totalFaresPaid: "KES 1,170" },
    { id: "PAS-210", name: "Grace Achieng",  phone: "+254 721 444 555", tripsWithDriver: 8,  totalFaresPaid: "KES 3,920" },
    { id: "PAS-603", name: "Peter Kamau",    phone: "+254 734 888 111", tripsWithDriver: 11, totalFaresPaid: "KES 5,400" },
    { id: "PAS-712", name: "Mercy Wanjiku",  phone: "+254 705 222 333", tripsWithDriver: 2,  totalFaresPaid: "KES 950"   },
]

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100] as const

//  Action menu
const PassengerActionMenu = ({ passenger }: { passenger: PassengerRecord }) =>
{
    const [open, setOpen] = useState(false)
    const [coords, setCoords] = useState({ top: 0, right: 0 })
    const btnRef = useRef<HTMLButtonElement>(null)

    const handleOpen = () =>
    {
        if (btnRef.current)
        {
            const rect = btnRef.current.getBoundingClientRect()
            setCoords({
                top: rect.bottom + window.scrollY + 4,
                right: window.innerWidth - rect.right,
            })
        }
        setOpen((v) => !v)
    }

    return (
        <div className="relative">
            <button ref={btnRef} onClick={handleOpen} className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <MoreVertical size={15} />
            </button>
            {
                open && createPortal(
                    <>
                        <div onClick={() => setOpen(false)} className="fixed inset-0 z-10" />
                        <div style={{ top: coords.top, right: coords.right }} className="fixed z-20 bg-white border border-gray-200 rounded-lg shadow-lg min-w-40 overflow-hidden">
                            <Link href={`/driver/passengers/${passenger.id}`} onClick={() => setOpen(false)} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-700">
                                View profile
                            </Link>
                        </div>
                    </>,
                    document.body
                )
            }
        </div>
    )
}

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
            {/* Rows per page */}
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

            {/* Page controls */}
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

//  Main component
const DriversPassengers = () =>
{
    const [search, setSearch]     = useState("")
    const [page, setPage]         = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const filtered = useMemo(() =>
    {
        const q = search.toLowerCase()
        return PASSENGERS.filter(p => p.name.toLowerCase().includes(q) || p.phone.includes(search) || p.id.toLowerCase().includes(q))
    }, [search])

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
    const safePage    = Math.min(page, totalPages)
    const paginated   = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

    // Reset to page 1 when search or page size changes
    useEffect(() => { setPage(1) }, [search, pageSize])

    return (
        <div className="px-4 pb-6">

            {/* Header */}
            <div className="mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Rider Directory</h1>
                <p className="text-gray-500 text-sm mt-1">Historical log of passengers serviced by this operator</p>
            </div>

            {/* Table card */}
            <div className="bg-white border border-gray-300 rounded-xl overflow-visible">
                {/* Table toolbar */}
                <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 flex-wrap">
                    <h2 className="text-sm font-semibold text-gray-900">All Passengers</h2>
                    {/* Search */}
                    <div className="relative">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search passengers…" className="pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 w-52 text-gray-700 placeholder-gray-400" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="text-left px-6 py-3 font-medium">Passenger</th>
                                <th className="text-left px-6 py-3 font-medium">Trips</th>
                                <th className="text-left px-6 py-3 font-medium">Total Fares</th>
                                <th className="px-6 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {
                                paginated.length === 0
                                ?
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">No passengers match your search.</td>
                                    </tr>
                                :
                                    paginated.map((passenger) => (
                                        <tr key={passenger.id} className="hover:bg-gray-50 transition-colors">
                                            {/* Passenger */}
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                                                        {passenger.name.split(" ").map((n) => n[0]).join("")}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{passenger.name}</p>
                                                        <p className="text-xs text-gray-400">
                                                            {passenger.phone} · <span className="font-mono">{passenger.id}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Trips */}
                                            <td className="px-6 py-3.5 text-gray-700">
                                                {passenger.tripsWithDriver} {passenger.tripsWithDriver === 1 ? "trip" : "trips"}
                                            </td>

                                            {/* Fares */}
                                            <td className="px-6 py-3.5 font-semibold text-gray-900">{passenger.totalFaresPaid}</td>

                                            {/* Actions */}
                                            <td className="px-6 py-3.5">
                                                <PassengerActionMenu passenger={passenger} />
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination page={safePage} totalPages={totalPages} pageSize={pageSize} onPage={setPage} onPageSize={setPageSize} />
            </div>
        </div>
    )
}

export default DriversPassengers