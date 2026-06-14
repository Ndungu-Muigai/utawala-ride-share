/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { AlertTriangle, Users, Star, Search, MoreVertical, ChevronLeft, ChevronRight, X, CheckCircle, } from "lucide-react"

// Types 
type UserStatus = "active" | "suspended"
interface AdminUser {
  id: string
  name: string
  email: string
  role: "passenger"
  status: UserStatus
  createdAt: string
}
interface Toast {
  id: number
  userName: string
  status: UserStatus
}

// Mock data 
const USERS: AdminUser[] = [
  {
    id: "usr_1001",
    name: "Mary Muthoni",
    email: "mary@example.com",
    role: "passenger",
    status: "active",
    createdAt: "2026-05-12",
  },
  {
    id: "usr_1002",
    name: "Kevin Otieno",
    email: "kevin@example.com",
    role: "passenger",
    status: "active",
    createdAt: "2026-05-20",
  },
  {
    id: "usr_1003",
    name: "Amina Hassan",
    email: "amina@example.com",
    role: "passenger",
    status: "suspended",
    createdAt: "2026-06-01",
  },
]

// Constants 

const STATUS_FILTERS = ["All", "Active", "Suspended"] as const
type FilterType = (typeof STATUS_FILTERS)[number]

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100] as const

const statusStyle: Record<UserStatus, string> = {
  active: "bg-emerald-50 text-emerald-700",
  suspended: "bg-red-50 text-red-700",
}

const statusDot: Record<UserStatus, string> = {
  active: "bg-emerald-500",
  suspended: "bg-red-500",
}

// Toast 

const ToastAlert = ({ toast, onDismiss,}: { toast: Toast; onDismiss: (id: number) => void }) => {
  useEffect(() => 
  {
    const timer = setTimeout(() => onDismiss(toast.id), 3000)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  const isSuspended = toast.status === "suspended"

  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg w-80 animate-in slide-in-from-right-4 fade-in duration-300 ${isSuspended ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
      <div className={`mt-0.5 shrink-0 p-1.5 rounded-lg ${isSuspended ? "bg-red-100" : "bg-emerald-100"}`}>
        {
          isSuspended 
          ? 
            <AlertTriangle size={13} className="text-red-600" />
          : 
            <CheckCircle size={13} className="text-emerald-600" />
        }
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${isSuspended ? "text-red-700" : "text-emerald-700"}`}>
          {
            isSuspended 
            ? 
              "User Suspended" 
            : 
              "User Reactivated"
          }
        </p>
        <p className={`text-xs mt-0.5 ${isSuspended ? "text-red-500" : "text-emerald-500"}`}>
          {
            isSuspended
            ? 
              `${toast.userName}'s account has been suspended.`
            : 
              `${toast.userName}'s account has been reactivated.`
          }
        </p>
      </div>

      <button onClick={() => onDismiss(toast.id)} className={`shrink-0 p-0.5 rounded hover:bg-black/10 transition-colors ${isSuspended ? "text-red-400" : "text-emerald-400"}`}>
        <X size={13} />
      </button>
    </div>
  )
}

// Action menu 
const ActionMenu = ({user, onStatusChange,}: {user: AdminUser; onStatusChange: (id: string, status: UserStatus) => void }) => 
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

  type Action = {
    label: string
    href?: string
    onClick?: () => void
    danger?: boolean
  }

  const actions: Action[] = [
    { label: "View profile", href: `/admin/users/${user.id}` },
    user.status !== "active"
      ? 
        {
          label: "Enable user",
          onClick: () => onStatusChange(user.id, "active"),
        }
      : 
        null,
    user.status !== "suspended"
      ? 
        {
          label: "Suspend user",
          onClick: () => onStatusChange(user.id, "suspended"),
          danger: true,
        }
      : 
        null,
  ].filter(Boolean) as Action[]

  return (
    <div className="relative">
      <button ref={btnRef} onClick={handleOpen} className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
        <MoreVertical size={15} />
      </button>

      {
        open &&
        createPortal(
          <>
            <div onClick={() => setOpen(false)} className="fixed inset-0 z-10" />
            <div style={{ top: coords.top, right: coords.right }} className="fixed z-20 bg-white border border-gray-200 rounded-lg shadow-lg min-w-44 overflow-hidden">
              {
                actions.map((a) =>
                  a.href ? 
                    <Link key={a.label} href={a.href} onClick={() => setOpen(false)} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-700">
                      {a.label}
                    </Link>
                  : 
                    <button key={a.label} onClick={() => { a.onClick?.(); setOpen(false)}} className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${a.danger ? "text-red-600" : "text-gray-700"}`}>
                      {a.label}
                    </button>
                  
                )
              }
            </div>
          </>,
          document.body
        )
      }
    </div>
  )
}

// Pagination 

const Pagination = ({page, totalPages, pageSize, onPage, onPageSize,
}: {page: number; totalPages: number; pageSize: number; onPage: (page: number) => void; onPageSize: (size: number) => void }) => 
{
  const getPages = (): (number | "…")[] => 
  {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages]
    if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, "…", page - 1, page, page + 1, "…", totalPages]
  }

  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-gray-100 flex-wrap gap-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Rows per page</span>
        <select value={pageSize} onChange={(e) => onPageSize(Number(e.target.value))} className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-600 outline-none focus:border-blue-400 bg-white">
          {
            PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))
          }
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={() => onPage(page - 1)} disabled={page === 1} className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft size={14} />
        </button>

        {
          getPages().map((p, i) =>
            p === "…" ? 
              <span key={`ellipsis-${i}`} className="px-1.5 text-xs text-gray-400 select-none">
                …
              </span>
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

// Main page 

export default function UsersPage() 
{
  const [users, setUsers] = useState<AdminUser[]>(USERS)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterType>("All")
  const [toasts, setToasts] = useState<Toast[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const handleEnable = (id: string) => 
  {
    const user = users.find((u) => u.id === id)
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: "active" } : u)))
    if (user) setToasts((prev) => [{ id: Date.now(), userName: user.name, status: "active" }, ...prev])
  }

  const handleDisable = (id: string) => 
  {
    const user = users.find((u) => u.id === id)
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: "suspended" } : u)))
    if (user) setToasts((prev) => [{ id: Date.now(), userName: user.name, status: "suspended" }, ...prev])
  }

  const handleStatusChange = (id: string, status: UserStatus) => 
  {
    if (status === "active") handleEnable(id)
    if (status === "suspended") handleDisable(id)
  }

  const filtered = users.filter((u) => 
  {
    const q = search.toLowerCase()
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q)
    const matchFilter = filter === "All" || (filter === "Active" && u.status === "active") || (filter === "Suspended" && u.status === "suspended")
    return matchSearch && matchFilter
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  useEffect(() => setPage(1), [search, filter, pageSize])

  const suspendedCount = users.filter((u) => u.status === "suspended").length
  const engagementAvg = (users.reduce((s, u) => s + (u.status === "active" ? 4.2 : 2.8), 0) / users.length).toFixed(2)

  const stats = [
    {
      title: "Total Users",
      value: String(users.length),
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Suspended",
      value: String(suspendedCount),
      icon: AlertTriangle,
      color: "bg-red-50 text-red-500",
    },
    {
      title: "Engagement",
      value: engagementAvg,
      icon: Star,
      color: "bg-amber-50 text-amber-500",
    },
  ]

  return (
    <div className="px-4 pb-4">
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
        {
          toasts.map((toast) => (
            <ToastAlert key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))
        }
      </div>

      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and monitor all registered users</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-3">
        {
          stats.map((stat) => 
          {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="bg-white border border-gray-300 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  
                  {/* Left: text */}
                  <div>
                    <p className="text-xl font-bold text-gray-900 leading-tight">{stat.value}</p>
                    <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wide mt-1">{stat.title} </p>
                  </div>
                  {/* Right: icon */}
                  <div className={`p-2 rounded-lg shrink-0 ${stat.color}`}>
                    <Icon size={16} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

      {/* Table card */}
      <div className="bg-white border border-gray-300 rounded-xl overflow-visible">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 flex-wrap">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">All Users</h2>
            <span className="ml-1 text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
              {filtered.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users…" className="pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 w-52 text-gray-700 placeholder-gray-400" />
            </div>

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
                <th className="text-left px-6 py-3 font-medium">User</th>
                <th className="text-left px-6 py-3 font-medium">Role</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-left px-6 py-3 font-medium">Joined</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {
                paginated.length === 0 
                ? 
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                      No users match your search.
                    </td>
                  </tr>
                : 
                  paginated.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      {/* User */}
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                          Passenger
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[user.status]}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statusDot[user.status]}`}
                          />
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-3.5 text-gray-400 text-xs">{user.createdAt}</td>

                      {/* Actions */}
                      <td className="px-6 py-3.5">
                        <ActionMenu user={user} onStatusChange={handleStatusChange} />
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination page={safePage} totalPages={totalPages} pageSize={pageSize} onPage={setPage} onPageSize={(size) => {setPageSize(size); setPage(1)}} />
      </div>
    </div>
  )
}