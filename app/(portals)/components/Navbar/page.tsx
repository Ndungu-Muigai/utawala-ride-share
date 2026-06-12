"use client"

import { Bell, Menu, MessageCircle, X } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

interface NavbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    user: string;
    notifications: number;
    messages: number;
}
const Navbar = ({ sidebarOpen, setSidebarOpen, user, notifications, messages}: NavbarProps) => 
{
    return ( 
        <nav className="navbar bg-[#0d163f] text-[#F5F0E8] shadow-sm p-2">
            <div className="navbar-start flex-1 px-3">
                <button className="btn btn-ghost btn-square bg-inherit hover:outline-0 hover:border-0 hover:scale-105" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {
                        sidebarOpen 
                        ? 
                            <X size={24} /> 
                        : 
                            <Menu size={24} />
                    }
                </button>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                {/* Notification Icon */}
                <div className="indicator">
                    <span className="indicator-item badge badge-soft badge-sm text-white">
                        {notifications > 9 ? "9+" : notifications}
                    </span>
                    <button className="btn btn-ghost btn-circle">
                        <Bell size={20} />
                    </button>
                </div>

                {/* Message Icon */}
                <div className="indicator">
                    <span className="indicator-item badge badge-soft badge-sm text-white">
                        {messages > 9 ? "9+" : messages}
                    </span>
                    <button className="btn btn-ghost btn-circle">
                        <MessageCircle size={20} />
                    </button>
                </div>

                {/* Profile Section */}
                <Link href="/dashboard/profile" className="flex flex-col items-center hover:opacity-80 transition-opacity" title="Profile">
                    <div className="avatar">
                        <div className="w-10 rounded-full ring ring-gray-700 ring-offset-1 ring-offset-gray-900">
                            <Image src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User" width={300} height={300}/>
                        </div>
                    </div>
                    <div className="mt-1 text-center">
                        <p className="text-[11px]">{user || " "}</p>
                    </div>
                </Link>

            </div>
        </nav>
    )
}
 
export default Navbar