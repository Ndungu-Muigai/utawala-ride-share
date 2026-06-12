/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, LogOut } from "lucide-react"
import Swal from "sweetalert2"
import { navLinks } from "./nav-links"

type Role = "admin" | "driver" | "user"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  role: Role
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, role }: SidebarProps) => 
{
    const sidebarRef = useRef<HTMLDivElement | null>(null)
    const pathname = usePathname()

    // Close sidebar when clicking outside
    useEffect(() => 
    {
        const handleClickOutside = (event: MouseEvent) => 
        {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) 
            {
                setSidebarOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [sidebarRef])

    const isActiveLink = (href: string) => pathname === href

    const logout = () => 
    {
        Swal.fire({
        title: "Logout",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
        })
        .then((result) => 
        {
            if (result.isConfirmed) 
            {
                localStorage.removeItem("userToken")
                Swal.fire(
                {
                    title: "Logged out",
                    text: "You have been logged out successfully.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                })
                .then(() => 
                {
                    window.location.href = "/auth/login"
                })
            }
        })
    }

    const links = navLinks[role]

    return (
        <aside className="sidebar z-50" ref={sidebarRef}>
            <div className={`fixed top-19 left-0 h-[calc(100vh-64px)] bg-[#0d163f] text-[#F5F0E8]  z-40 transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0 w-56" : "-translate-x-full w-56"} lg:translate-x-0 ${sidebarOpen ? "lg:w-56" : "lg:w-20"} flex flex-col`}>
                {/* Logo */}
                <header className={`flex items-center py-4 ${sidebarOpen ? "justify-start px-4" : "justify-center"}`}>
                    {
                        sidebarOpen 
                        ? 
                            <div className="flex items-center gap-2">
                                <div className="bg-[#3b68d8] p-2 rounded-lg">
                                    <Car size={22} className="text-white" />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <p className="text-[#F5F0E8] font-bold text-base tracking-tight">RideApp</p>
                                    <span className="text-[#F5F0E8]/40 text-xs capitalize">{role} portal</span>
                                </div>
                            </div>
                        : 
                            <div className="bg-[#3b68d8] p-2 rounded-lg">
                                <Car size={22} className="text-white" />
                            </div>
                    }
                </header>

                <div className="flex-1 overflow-y-auto">
                    {/* Nav links — driven by role */}
                    <ul className="mt-2 space-y-1.5 lg:space-y-3">
                        {
                            links.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className={`flex items-center gap-3 text-sm font-medium rounded-md hover:bg-[#4665cc] transition-colors ${sidebarOpen ? "px-4 py-3" : "justify-center p-2"} ${isActiveLink(link.href) ? "bg-[#0d163f]" : ""}`} title={link.name}>
                                    {link.icon}
                                    {
                                        sidebarOpen && <span>{link.name}</span>
                                    }
                                </Link>
                            </li>
                            ))
                        }
                    </ul>

                    {/* Logout */}
                    <li className="mt-4 py-2 border-t border-gray-700 w-full">
                        <button onClick={logout} className={`flex items-center gap-3 p-4 rounded-lg w-full transition-all duration-200 hover:bg-[#4665cc] ${sidebarOpen ? "justify-start ml-0" : "justify-center"}`} title="Logout">
                            <LogOut size={20} />
                            {
                                sidebarOpen && <span className="flex-1 text-left">Logout</span>
                            }
                        </button>
                    </li>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar