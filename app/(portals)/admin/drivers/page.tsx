/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Search, MoreVertical, Star, Car, AlertTriangle, X, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

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
interface Toast {
    id: number
    driverName: string
    status: "active" | "suspended"
}

//  Mock data
const DRIVERS: Driver[] = [
    { id: "d1",  name: "James Mwangi",    phone: "+254 712 345 678", vehicle: "Toyota Fielder",  plate: "KCB 123A", status: "active",    rating: 4.92, trips: 834, earnings: "KSh 412,000", joined: "Jan 2023" },
    { id: "d2",  name: "Amina Hassan",    phone: "+254 722 987 654", vehicle: "Nissan Note",     plate: "KDA 456B", status: "active",    rating: 4.78, trips: 612, earnings: "KSh 298,500", joined: "Mar 2023" },
    { id: "d3",  name: "Brian Otieno",    phone: "+254 733 111 222", vehicle: "Toyota Axio",     plate: "KDB 789C", status: "active",    rating: 4.65, trips: 490, earnings: "KSh 231,200", joined: "Jun 2023" },
    { id: "d4",  name: "Grace Wanjiku",   phone: "+254 700 444 555", vehicle: "Honda Fit",       plate: "KDD 321D", status: "active",    rating: 4.88, trips: 721, earnings: "KSh 364,800", joined: "Feb 2023" },
    { id: "d5",  name: "Peter Kamau",     phone: "+254 711 666 777", vehicle: "Mazda Demio",     plate: "KDE 654E", status: "suspended", rating: 3.90, trips: 203, earnings: "KSh 98,400",  joined: "Sep 2023" },
    { id: "d6",  name: "Linda Achieng",   phone: "+254 720 234 567", vehicle: "Toyota Vitz",     plate: "KDF 111F", status: "active",    rating: 4.55, trips: 389, earnings: "KSh 187,300", joined: "Apr 2023" },
    { id: "d7",  name: "Kevin Njoroge",   phone: "+254 701 345 678", vehicle: "Subaru Impreza",  plate: "KDG 222G", status: "active",    rating: 4.70, trips: 510, earnings: "KSh 243,100", joined: "May 2023" },
    { id: "d8",  name: "Faith Wambua",    phone: "+254 713 456 789", vehicle: "Honda Fit",       plate: "KDH 333H", status: "suspended", rating: 3.75, trips: 145, earnings: "KSh 67,200",  joined: "Oct 2023" },
    { id: "d9",  name: "Dennis Ochieng",  phone: "+254 724 567 890", vehicle: "Toyota Axio",     plate: "KDI 444I", status: "active",    rating: 4.83, trips: 678, earnings: "KSh 321,500", joined: "Feb 2023" },
    { id: "d10", name: "Rose Kimani",     phone: "+254 735 678 901", vehicle: "Nissan Tiida",    plate: "KDJ 555J", status: "active",    rating: 4.60, trips: 432, earnings: "KSh 204,800", joined: "Jul 2023" },
    { id: "d11", name: "Samuel Gitau",    phone: "+254 746 789 012", vehicle: "Mazda Axela",     plate: "KDK 666K", status: "active",    rating: 4.91, trips: 801, earnings: "KSh 389,600", joined: "Jan 2023" },
    { id: "d12", name: "Mary Ndung'u",    phone: "+254 757 890 123", vehicle: "Toyota Fielder",  plate: "KDL 777L", status: "suspended", rating: 3.60, trips: 98,  earnings: "KSh 44,100",  joined: "Nov 2023" },
    { id: "d13", name: "Victor Mutua",    phone: "+254 768 901 234", vehicle: "Nissan Note",     plate: "KDM 888M", status: "active",    rating: 4.74, trips: 563, earnings: "KSh 267,900", joined: "Mar 2023" },
    { id: "d14", name: "Caroline Chebet", phone: "+254 779 012 345", vehicle: "Toyota Passo",    plate: "KDN 999N", status: "active",    rating: 4.67, trips: 447, earnings: "KSh 212,600", joined: "Jun 2023" },
    { id: "d15", name: "Daniel Kipchoge", phone: "+254 790 123 456", vehicle: "Mazda Demio",     plate: "KDP 000P", status: "suspended", rating: 3.82, trips: 176, earnings: "KSh 81,700",  joined: "Aug 2023" },
]

const STATUS_FILTERS = ["All", "Active", "Suspended"] as const
type FilterType = (typeof STATUS_FILTERS)[number]

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100] as const

const statusStyle: Record<DriverStatus, string> =
{
    active:    "bg-emerald-50 text-emerald-700",
    suspended: "bg-red-50 text-red-700",
}

const statusDot: Record<DriverStatus, string> =
{
    active:    "bg-emerald-500",
    suspended: "bg-red-500",
}

//  Toast component
const ToastAlert = ({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) =>
{
    useEffect(() =>
    {
        const timer = setTimeout(() => onDismiss(toast.id), 3000)
        return () => clearTimeout(timer)
    }, [toast.id, onDismiss])

    const isSuspended = toast.status === "suspended"

    return (
        <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg w-80 animate-in slide-in-from-right-4 fade-in duration-300 ${isSuspended ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
            <div className={`mt-0.5 shrink-0 p-1.5 rounded-lg ${isSuspended ? "bg-red-100" : "bg-emerald-100"}`}>
                {isSuspended ? <AlertTriangle size={13} className="text-red-600" /> : <CheckCircle size={13} className="text-emerald-600" />}
            </div>

            <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isSuspended ? "text-red-700" : "text-emerald-700"}`}>
                    {isSuspended ? "Driver Suspended" : "Driver Reinstated"}
                </p>
                <p className={`text-xs mt-0.5 ${isSuspended ? "text-red-500" : "text-emerald-500"}`}>
                    {isSuspended ? `${toast.driverName} has been suspended.` : `${toast.driverName}'s account has been reinstated.`}
                </p>
            </div>

            <button onClick={() => onDismiss(toast.id)} className={`shrink-0 p-0.5 rounded hover:bg-black/10 transition-colors ${isSuspended ? "text-red-400" : "text-emerald-400"}`}>
                <X size={13} />
            </button>
        </div>
    )
}

//  Action menu
const ActionMenu = ({ driver, onStatusChange }: { driver: Driver; onStatusChange: (id: string, status: DriverStatus) => void }) =>
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

    type Action = { label: string; href?: string; status?: DriverStatus; danger?: boolean }
    const actions: Action[] = [
        { label: "View profile", href: `/admin/drivers/${driver.id}` },
        driver.status !== "active"    ? { label: "Reinstate driver", status: "active"    } : null,
        driver.status !== "suspended" ? { label: "Suspend driver",   status: "suspended", danger: true } : null,
    ].filter(Boolean) as Action[]

    return (
        <div className="relative">
            <button ref={btnRef} onClick={handleOpen} className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <MoreVertical size={15} />
            </button>
            {open && createPortal(
                <>
                    <div onClick={() => setOpen(false)} className="fixed inset-0 z-10" />
                    <div style={{ top: coords.top, right: coords.right }} className="fixed z-20 bg-white border border-gray-200 rounded-lg shadow-lg min-w-40 overflow-hidden">
                        {
                            actions.map((a) =>
                                a.href 
                                ? 
                                    <Link key={a.label} href={a.href} onClick={() => setOpen(false)} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-700">
                                        {a.label}
                                    </Link>
                                : 
                                    <button key={a.label} onClick={() => { if (a.status) onStatusChange(driver.id, a.status); setOpen(false) }} className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${a.danger ? "text-red-600" : "text-gray-700"}`}>
                                        {a.label}
                                    </button>
                                
                            )
                        }
                    </div>
                </>,
                document.body
            )}
        </div>
    )
}

//  Pagination component
const Pagination = ({ page, totalPages, pageSize, onPage, onPageSize }: {page: number, totalPages: number, pageSize: number, onPage: (page: number) => void, onPageSize: (size: number) => void }) =>
{
    const getPages = (): (number | "…")[] =>
    {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
        if (page <= 4)             return [1, 2, 3, 4, 5, "…", totalPages]
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

//  Main page
const DriversPage = () =>
{
    const [drivers, setDrivers]     = useState<Driver[]>(DRIVERS)
    const [search, setSearch]       = useState("")
    const [filter, setFilter]       = useState<FilterType>("All")
    const [toasts, setToasts]       = useState<Toast[]>([])
    const [page, setPage]           = useState(1)
    const [pageSize, setPageSize]   = useState(5)

    const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

    const handleSetActive = (id: string) =>
    {
        const driver = drivers.find(d => d.id === id)
        setDrivers((prev) => prev.map((d) => d.id === id ? { ...d, status: "active" } : d))
        if (driver) setToasts((prev) => [{ id: Date.now(), driverName: driver.name, status: "active" }, ...prev])
    }

    const handleSuspend = (id: string) =>
    {
        // TODO: await api.patch(`/drivers/${id}/status`, { status: "suspended" })
        const driver = drivers.find(d => d.id === id)
        setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, status: "suspended" } : d)))
        if (driver) setToasts((prev) => [{ id: Date.now(), driverName: driver.name, status: "suspended" }, ...prev])
    }

    const handleStatusChange = (id: string, status: DriverStatus) =>
    {
        if (status === "active")    handleSetActive(id)
        if (status === "suspended") handleSuspend(id)
    }

    const filtered = drivers.filter(d =>
    {
        const q = search.toLowerCase()
        const matchSearch = d.name.toLowerCase().includes(q) || d.plate.toLowerCase().includes(q) || d.phone.includes(search)
        const matchFilter = filter === "All" || d.status === filter.toLowerCase()
        return matchSearch && matchFilter
    })

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
    const safePage   = Math.min(page, totalPages)
    const paginated  = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

    // Reset to page 1 when search, filter, or pageSize changes
    useEffect(() => { setPage(1) }, [search, filter, pageSize])

    const suspendedCount = drivers.filter(d => d.status === "suspended").length
    const avgRating      = (drivers.reduce((s, d) => s + d.rating, 0) / drivers.length).toFixed(2)

    const stats = [
        { title: "Total Drivers", value: String(drivers.length), change: "+5% this month",    icon: Car,           color: "bg-emerald-50 text-emerald-600" },
        { title: "Suspended",     value: String(suspendedCount), change: "Needs review",       icon: AlertTriangle, color: "bg-red-50 text-red-500"         },
        { title: "Avg Rating",    value: avgRating,              change: "Across all drivers", icon: Star,          color: "bg-amber-50 text-amber-500"     },
    ]

    return (
        <div className="px-4 pb-6">

            {/* Toast stack */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
                {toasts.map((toast) => (
                    <ToastAlert key={toast.id} toast={toast} onDismiss={dismissToast} />
                ))}
            </div>

            {/* Header */}
            <div className="mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Drivers</h1>
                <p className="text-gray-500 text-sm mt-1">Manage and monitor all registered drivers</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-3">
                {
                    stats.map((stat) =>
                    {
                        const Icon = stat.icon
                        return (
                            <div key={stat.title} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-px transition-all duration-200">
                                <div className="flex items-center justify-between gap-3">
                                    {/* Left: text */}
                                    <div className="min-w-0">
                                        <p className="text-xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mt-1">{stat.title}</p>
                                    </div>
                                    {/* Right: icon */}
                                    <div className={`p-2 rounded-lg shrink-0 ${stat.color}`}>
                                        <Icon size={20} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Table card */}
            <div className="bg-white border border-gray-300 rounded-xl overflow-visible">
                {/* Table toolbar */}
                <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 flex-wrap">
                    <h2 className="text-sm font-semibold text-gray-900">All Drivers</h2>
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="relative">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search drivers…" className="pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 w-52 text-gray-700 placeholder-gray-400" />
                        </div>
                        {/* Filter */}
                        <div className="flex flex-wrap gap-2">
                            {
                                STATUS_FILTERS.map((item) => (
                                    <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === item ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                                        {item}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                                <th className="text-left px-6 py-3 font-medium">Driver</th>
                                <th className="text-left px-6 py-3 font-medium">Vehicle</th>
                                <th className="text-left px-6 py-3 font-medium">Status</th>
                                <th className="text-left px-6 py-3 font-medium">Rating</th>
                                <th className="text-left px-6 py-3 font-medium">Trips</th>
                                <th className="text-left px-6 py-3 font-medium">Earnings</th>
                                <th className="text-left px-6 py-3 font-medium">Joined</th>
                                <th className="px-6 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {
                                paginated.length === 0
                                ? 
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">No drivers match your search.</td>
                                    </tr>
                                : 
                                    paginated.map((driver) => (
                                        <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                                            {/* Driver */}
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                                                        {driver.name.split(" ").map((n) => n[0]).join("")}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{driver.name}</p>
                                                        <p className="text-xs text-gray-400">{driver.phone}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Vehicle */}
                                            <td className="px-6 py-3.5">
                                                <p className="text-gray-700">{driver.vehicle}</p>
                                                <p className="text-xs text-gray-400 font-mono">{driver.plate}</p>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[driver.status]}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[driver.status]}`} />
                                                    {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                                                </span>
                                            </td>

                                            {/* Rating */}
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star size={12} fill="currentColor" />
                                                    <span className="text-xs font-semibold text-gray-700">{driver.rating}</span>
                                                </div>
                                            </td>

                                            {/* Trips */}
                                            <td className="px-6 py-3.5 text-gray-700">{driver.trips.toLocaleString()}</td>

                                            {/* Earnings */}
                                            <td className="px-6 py-3.5 font-semibold text-gray-900">{driver.earnings}</td>

                                            {/* Joined */}
                                            <td className="px-6 py-3.5 text-gray-400 text-xs">{driver.joined}</td>

                                            {/* Actions */}
                                            <td className="px-6 py-3.5">
                                                <ActionMenu driver={driver} onStatusChange={handleStatusChange} />
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

export default DriversPage