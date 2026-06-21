"use client" 

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { ArrowLeft, MapPin, Users, Wallet, Star, Percent, Phone, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"

type TripStatus = "Completed" | "Ongoing" | "Cancelled"

type RoutePassenger = {
    name: string
    phone: string
    pickupPoint: string
    fare: string
    status: TripStatus | "Boarded" | "No-Show"
    rating?: number
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

const INITIAL_ROUTES: Record<string, Route> = {
    "RT-118": {
        id: "#RT-118",
        from: "Kilimani",
        to: "CBD",
        date: "2026-06-20",
        seats: 4,
        status: "Completed",
        passengers: [
            { name: "Faith Wanjiru", phone: "+254 712 345 678", pickupPoint: "Yaya Centre", fare: "KES 650", status: "Completed", rating: 4.8 },
            { name: "Dennis Mutua", phone: "+254 722 987 654", pickupPoint: "Chaka Road", fare: "KES 480", status: "Completed", rating: 4.6 },
            { name: "Grace Achieng", phone: "+254 733 555 111", pickupPoint: "Lenana Road", fare: "KES 520", status: "Completed", rating: 5.0 },
            { name: "Samuel Kiprono", phone: "+254 701 222 333", pickupPoint: "Dennis Pritt", fare: "KES 600", status: "Completed", rating: 4.4 },
        ],
    },
    "RT-117": {
        id: "#RT-117",
        from: "Westlands",
        to: "Lavington",
        date: "2026-06-20",
        seats: 4,
        status: "Ongoing",
        passengers: [
            { name: "Mercy Njeri", phone: "+254 711 444 777", pickupPoint: "Sarit Centre", fare: "KES 480", status: "Ongoing", rating: 4.7 },
            { name: "Brian Otieno", phone: "+254 720 888 999", pickupPoint: "Rhapta Road", fare: "KES 450", status: "Ongoing", rating: 4.9 },
        ],
    },
    "RT-116": {
        id: "#RT-116",
        from: "South B",
        to: "Upperhill",
        date: "2026-06-20",
        seats: 4,
        status: "Ongoing",
        passengers: [
            { name: "Linet Adhiambo", phone: "+254 731 111 222", pickupPoint: "Capital Centre", fare: "KES 720", status: "Ongoing", rating: 4.5 },
            { name: "Victor Mwangi", phone: "+254 724 333 444", pickupPoint: "Mombasa Road Flyover", fare: "KES 680", status: "Cancelled", rating: 4.2 },
            { name: "Esther Wambui", phone: "+254 715 666 777", pickupPoint: "Bellevue", fare: "KES 700", status: "Ongoing", rating: 4.9 },
        ],
    },
}

const statusStyle: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Ongoing: "bg-blue-50 text-blue-700 border border-blue-200",
    Boarded: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    "No-Show": "bg-amber-50 text-amber-700 border border-amber-200",
    Cancelled: "bg-red-50 text-red-700 border border-red-200",
}

const initials = (name: string) => name.split(" ").map((n) => n[0]).join("")

const TripDetailsPage = () => 
{
    const params = useParams<{ id: string }>()
    const [routesData, setRoutesData] = useState<Record<string, Route>>(INITIAL_ROUTES)
    const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null)
    
    const route = routesData[params.id]

    const router = useRouter()

    // Auto-clear toast banner alert timeout hook
    useEffect(() => {
        if (!toast) return
        const timer = setTimeout(() => setToast(null), 3500)
        return () => clearTimeout(timer)
    }, [toast])

    // Handler to manipulate live trip controls
    const updateTripStatus = (newStatus: TripStatus) => {
        if (!route) return
        setRoutesData(prev => ({...prev, [params.id]: { ...route, status: newStatus }}))
        
        if (newStatus === "Completed") {
            setToast({ message: `Trip ${route.id} successfully completed!`, type: "success" })
        }
    }

    // Handler to modify passenger manifest attendance live
    const updatePassengerStatus = (passengerName: string, newStatus: RoutePassenger["status"]) => {
        if (!route) return
        const updatedPassengers = route.passengers.map(p => p.name === passengerName ? { ...p, status: newStatus } : p)
        setRoutesData(prev => ({...prev, [params.id]: { ...route, passengers: updatedPassengers }}))
        
        if (newStatus === "Boarded") {
            setToast({ message: `${passengerName} marked as picked up / boarded!`, type: "success" })
        } else if (newStatus === "No-Show") {
            setToast({ message: `${passengerName} marked as a no-show.`, type: "info" })
        }
    }

    if (!route) {
        return (
            <div className="px-4 py-12 max-w-7xl mx-auto">
                <button onClick={()=> router.back()} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4">
                    <ArrowLeft size={14} />
                    Back
                </button>
                <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center shadow-xs">
                    <AlertTriangle className="mx-auto text-amber-500 mb-3" size={28} />
                    <p className="text-sm font-medium text-gray-900">Route profile absent</p>
                    <p className="text-xs text-gray-400 mt-1">This specific log has been cleared or transferred.</p>
                </div>
            </div>
        )
    }

    const validPassengers = route.passengers.filter((p) => p.status !== "Cancelled" && p.status !== "No-Show")
    const totalEarnings = validPassengers.reduce((sum, p) => sum + Number(p.fare.replace(/[^0-9]/g, "")), 0)
    
    const ratedPassengers = route.passengers.filter((p) => p.rating !== undefined)
    const avgRating = ratedPassengers.length ? (ratedPassengers.reduce((sum, p) => sum + (p.rating || 0), 0) / ratedPassengers.length).toFixed(1) : "—"

    const completionRate = route.passengers.length ? Math.round((route.passengers.filter((p) => p.status === "Completed" || p.status === "Boarded").length / route.passengers.length) * 100) : 0

    return (
        <div className="px-4 mb-3 space-y-4 antialiased bg-gray-50/30 min-h-screen relative">
            
            {/* Custom Interactive Toast Alert UI Banner */}
            {
                toast && (
                    <div className="fixed bottom-5 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 bg-white min-w-70 md:min-w-85">
                        {
                            toast.type === "success" 
                            ? 
                                <CheckCircle className="text-emerald-500 shrink-0" size={18} />
                            
                            : 
                                <Info className="text-blue-500 shrink-0" size={18} />
                        }
                        <p className="text-xs font-semibold text-gray-800">{toast.message}</p>
                        <button onClick={() => setToast(null)} className="ml-auto text-gray-400 hover:text-gray-600 font-bold text-xs pl-2">
                            ✕
                        </button>
                    </div>
                )
            }

            {/* Top Navigation Bar Header */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-700 via-indigo-950 to-blue-950 p-6 text-white shadow-md">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="flex justify-between items-center mb-4">
                    <Link href="/driver/trips" className="inline-flex items-center gap-1 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-colors uppercase">
                        <ArrowLeft size={12} />
                        Back
                    </Link>

                    {/* INTERACTIVE COMPONENT: Real-time Trip Actions */}
                    <div className="flex gap-2 z-10">
                        {
                            route.status === "Ongoing" && (
                                <button onClick={() => updateTripStatus("Completed")} className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-xs">
                                    <CheckCircle size={14} /> Complete trip
                                </button>
                            )
                        }
                        {
                            route.status === "Cancelled" && (
                                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                                    Ride Cancelled
                                </span>
                            )
                        }
                    </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black tracking-tight">{route.id}</h1>
                            <span className={`px-3 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase border border-white/10 ${route.status === "Ongoing" ? "bg-blue-500 text-white animate-pulse" : "bg-white/10 text-slate-200"}`}>
                                {route.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <MapPin size={14} className="text-blue-400" />
                            <span className="font-medium text-white">{route.from}</span>
                            <span className="text-slate-500">→</span>
                            <span>{route.to}</span>
                        </div>
                    </div>

                    <div className="text-left sm:text-right bg-white/5 border border-white/10 p-3 rounded-xl min-w-40">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Est. Payout</p>
                        <p className="text-2xl font-bold tracking-tight text-emerald-400 mt-0.5">
                            KES {totalEarnings.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stat-Card Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200/80 p-4 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg Rating</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{avgRating}</h3>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                        <Star size={18} fill="currentColor" />
                    </div>
                </div>

                <div className="bg-white border border-gray-200/80 p-4 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completion</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{completionRate}%</h3>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                        <Percent size={18} />
                    </div>
                </div>

                <div className="bg-white border border-gray-200/80 p-4 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Occupancy</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{route.passengers.length} / {route.seats}</h3>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                        <Users size={18} />
                    </div>
                </div>

                <div className="bg-white border border-gray-200/80 p-4 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Net Yield</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">KES {totalEarnings.toLocaleString()}</h3>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                        <Wallet size={18} />
                    </div>
                </div>
            </div>

            {/* Dynamic Stop Progress Tracker Container */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">Progress Flow & Checkpoints</h3>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
                    <div className="absolute hidden md:block left-4 right-4 top-3.75 h-0.5 bg-gray-100 z-0" />
                    
                    <div className="flex items-center gap-3 z-10 bg-white pr-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold ring-4 ring-blue-50 shrink-0">
                            S
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Start Point</p>
                            <p className="text-sm font-semibold text-gray-900">{route.from}</p>
                        </div>
                    </div>

                    {
                        route.passengers.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-3 z-10 bg-white px-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${p.status === "Boarded" || p.status === "Completed" ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-50 text-gray-400 border-gray-200" }`}>
                                    {idx + 1}
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">Waypoint</p>
                                    <p className="text-xs font-semibold text-gray-900">{p.pickupPoint}</p>
                                </div>
                            </div>
                        ))
                    }

                    <div className="flex items-center gap-3 z-10 bg-white pl-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold ring-4 ring-emerald-50 shrink-0">
                            D
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Destination</p>
                            <p className="text-sm font-semibold text-gray-900">{route.to}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Passenger Grid/Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-gray-900 tracking-tight">Passengers</h2>
                        <span className="text-xs font-bold bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-600">
                            {route.passengers.length} Booked
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                                <th className="px-6 py-3.5">Passenger Identity & Pickup Point</th>
                                <th className="px-6 py-3.5">Rating</th>
                                <th className="px-6 py-3.5">Fare Amount</th>
                                <th className="px-6 py-3.5">Attendance Status</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {
                                route.passengers.map(p => (
                                    <tr key={p.name} className="hover:bg-gray-50/40 transition-colors group">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0 uppercase">
                                                    {initials(p.name)}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{p.name}</p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                                        <MapPin size={11} className="shrink-0 text-slate-300" />
                                                        <span>{p.pickupPoint}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            {
                                                p.rating 
                                                ? 
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50/60 border border-amber-100 text-amber-800 text-xs font-bold">
                                                        <Star size={11} fill="currentColor" className="text-amber-500" />
                                                        {p.rating}
                                                    </span>
                                                : 
                                                    <span className="text-xs text-gray-300">—</span>
                                            }
                                        </td>
                                        <td className="px-6 py-3.5 font-bold text-slate-900">{p.fare}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[10px] ${statusStyle[p.status]}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {
                                                    route.status === "Ongoing" && p.status === "Ongoing" && (
                                                        <>
                                                            <button onClick={() => updatePassengerStatus(p.name, "Boarded")} title="Mark Boarded" className="p-1.5 border border-gray-200 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors">
                                                                <CheckCircle size={13} />
                                                            </button>
                                                            <button onClick={() => updatePassengerStatus(p.name, "No-Show")} title="Mark No Show" className="p-1.5 border border-gray-200 text-amber-600 rounded-md hover:bg-amber-50 transition-colors">
                                                                <XCircle size={13} />
                                                            </button>
                                                        </>
                                                    )
                                                }
                                                <Link href={`tel:${p.phone}`} title={`Call ${p.name}`} className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 text-gray-400 hover:bg-white hover:text-blue-600 hover:border-blue-200 hover:shadow-xs transition-all">
                                                    <Phone size={13} />
                                                </Link>
                                            </div>
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

export default TripDetailsPage