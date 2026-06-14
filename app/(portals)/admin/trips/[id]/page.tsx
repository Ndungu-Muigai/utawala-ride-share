"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Car, Users, MapPin, Clock, CreditCard, Star, AlertTriangle, CheckCircle, X, } from "lucide-react"

// Types 

type TripStatus = "Completed" | "Ongoing" | "Cancelled"

interface TripDetail {
    id: string
    status: TripStatus
    date: string
    time: string
    duration: string
    distance: string

    passengers: {
        id: string
        name: string
        email: string
        phone: string
        rating: number | null
        review: string | null
    }[]

    driver: {
        id: string
        name: string
        phone: string
        vehicle: string
        plate: string
        rating: number
    }

    route: {
        from: string
        fromAddress: string
        to: string
        toAddress: string
    }

    fare: {
        base: string
        distance: string
        surge: string
        total: string
        method: string
    }

    rating: number | null
    review: string | null
    cancellationReason: string | null
}

// Mock data 

const TRIP: TripDetail = {
    id: "TRP-001",
    status: "Completed",
    date: "2026-06-10",
    time: "08:14 AM",
    duration: "22 min",
    distance: "6.4 km",

    passengers: [
        {
            id: "usr_1001",
            name: "Mary Muthoni",
            email: "mary@example.com",
            phone: "+254 712 345 678",
            rating: 5,
            review: "Very smooth ride, driver was on time.",
        },
        {
            id: "usr_1002",
            name: "John Kamau",
            email: "john@example.com",
            phone: "+254 723 111 222",
            rating: 4,
            review: "Good ride, slightly delayed pickup.",
        }
    ],
    driver: {
        id: "d1",
        name: "James Mwangi",
        phone: "+254 712 345 678",
        vehicle: "Toyota Fielder",
        plate: "KCB 123A",
        rating: 4.92,
    },

    route: {
        from: "Westlands",
        fromAddress: "Sarit Centre, Westlands, Nairobi",
        to: "CBD",
        toAddress: "Kenyatta Avenue, Nairobi CBD",
    },

    fare: {
        base: "KSh 150",
        distance: "KSh 960",
        surge: "KSh 0",
        total: "KSh 1,200",
        method: "M-Pesa",
    },

    rating: 5,
    review: "Very smooth ride, driver was on time and professional.",
    cancellationReason: null,
}

// Constants 

const statusStyle: Record<TripStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Ongoing:   "bg-blue-50 text-blue-700",
  Cancelled: "bg-red-50 text-red-700",
}

const statusDot: Record<TripStatus, string> = {
  Completed: "bg-emerald-500",
  Ongoing:   "bg-blue-500",
  Cancelled: "bg-red-500",
}

// Sub-components 

function StatusPill({ status }: { status: TripStatus }) 
{
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyle[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status]}`} />
            {status}
        </span>
    )
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) 
{
    return (
        <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                <Icon size={15} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
            </div>
            <div className="px-6 py-4">{children}</div>
        </div>
    )
}

function DetailRow({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) 
{
    return (
        <div className="flex items-start justify-between gap-4 py-2.5 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium shrink-0 pt-0.5">{label}</span>
            <span className={`text-sm text-gray-800 text-right ${mono ? "font-mono" : "font-medium"}`}>{value}</span>
        </div>
    )
}

// Main page 

export default function TripDetailPage() 
{
    const [toast, setToast] = useState<{ message: string; type: "success" | "danger" } | null>(null)

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
            <div className="py-3">
                <button onClick={()=> router.back()} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 hover:underline transition-colors">
                    <ArrowLeft size={14} />
                    Back
                </button>
            </div>

            {/* Trip header */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 mb-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                            <h1 className="text-2xl font-bold text-gray-900">#{TRIP.id}</h1>
                            <StatusPill status={TRIP.status} />
                        </div>
                        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                <Clock size={13} className="text-gray-400" />
                                {TRIP.date} · {TRIP.time}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                <Car size={13} className="text-gray-400" />
                                {TRIP.duration}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                <MapPin size={13} className="text-gray-400" />
                                {TRIP.distance}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Route banner */}
            <div className="bg-white border border-gray-300 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-4 flex-wrap">
                    {/* From */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Pickup</p>
                        <p className="font-semibold text-gray-900">{TRIP.route.from}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{TRIP.route.fromAddress}</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div className="w-px h-8 bg-gray-200" />
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                    </div>

                    {/* To */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Drop-off</p>
                        <p className="font-semibold text-gray-900">{TRIP.route.to}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{TRIP.route.toAddress}</p>
                    </div>
                </div>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

                {/* Passengers */}
                    <SectionCard title="Passengers" icon={Users}>
                        <div className="space-y-4">
                            {
                                TRIP.passengers.map(p => (
                                    <div key={p.id} className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                                            {p.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900">{p.name}</p>
                                            <p className="text-xs text-gray-400">{p.email}</p>
                                            <p className="text-xs text-gray-400">{p.phone}</p>
                                        </div>
                                        <Link href={`/admin/users/${p.id}`} className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium">View profile</Link>
                                    </div>
                                ))
                            }
                        </div>
                    </SectionCard>

                {/* Driver */}
                <SectionCard title="Driver" icon={Car}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                        {TRIP.driver.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{TRIP.driver.name}</p>
                            <div className="flex items-center gap-1 text-amber-500 mt-0.5">
                                <Star size={11} fill="currentColor" />
                                <span className="text-xs font-semibold text-gray-600">{TRIP.driver.rating}</span>
                            </div>
                        </div>
                        <Link href={`/admin/drivers/${TRIP.driver.id}`} className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors shrink-0">View profile</Link>
                    </div>
                    <DetailRow label="Phone" value={TRIP.driver.phone} />
                    <DetailRow label="Vehicle" value={TRIP.driver.vehicle} />
                    <DetailRow label="Plate" value={TRIP.driver.plate} mono />
                </SectionCard>

                {/* Fare breakdown */}
                <SectionCard title="Fare Breakdown" icon={CreditCard}>
                    <DetailRow label="Base fare" value={TRIP.fare.base} />
                    <DetailRow label="Distance charge" value={TRIP.fare.distance} />
                    <DetailRow label="Surge" value={TRIP.fare.surge} />
                    <DetailRow label="Payment method" value={TRIP.fare.method} />
                    <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
                        <span className="text-sm font-semibold text-gray-700">Total</span>
                        <span className="text-lg font-bold text-gray-900">{TRIP.fare.total}</span>
                    </div>
                </SectionCard>

                <SectionCard title="Passenger Reviews" icon={Star}>
                    <div className="space-y-5">
                        {
                            TRIP.passengers.map((p) => (
                                <div key={p.id} className="border-b border-gray-50 pb-4 last:border-0">
                                    
                                    {/* Passenger header */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                {p.name.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                                        </div>

                                        {/* Rating */}
                                        {
                                            p.rating !== null && (
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star size={12} fill="currentColor" />
                                                    <span className="text-xs font-semibold text-gray-700">{p.rating}/5</span>
                                                </div>
                                            )
                                        }
                                    </div>

                                    {/* Review */}
                                    {
                                        p.review 
                                        ? 
                                            <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 italic">
                                                &quot;{p.review}&quot;
                                            </p>
                                        : 
                                            <p className="text-xs text-gray-400">No review submitted</p>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </SectionCard>
            </div>
        </div>
    )
}