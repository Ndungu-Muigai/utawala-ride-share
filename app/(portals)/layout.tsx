/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import Navbar from "./components/Navbar/page"
import Sidebar from "./components/Sidebar/Sidebar"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const PortalLayout = ({ children }: { children: React.ReactNode }) => 
{
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [role, setRole] = useState<"admin" | "driver" | "user">("user") // This should ideally come from user authentication data
    const [user, setUser] = useState("Samuel Muigai")
    const [notifications, setNotifications] = useState(42)
    const [messages, setMessages] = useState(10)

    //Closing the sidebar once the URL changes
    const pathName = usePathname()
    useEffect(()=> setSidebarOpen(false),[pathName])

    return ( 
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role} />

            {/* Main content */}
            <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${sidebarOpen ? "lg:ml-56" : "lg:ml-20"} ml-0`}>
                {/* Navbar */}
                <div className="fixed top-0 left-0 right-0 z-30">
                    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} notifications={notifications} messages={messages} />
                </div>

                {/* Scrollable main content */}
                <main className="flex-1 mt-16 overflow-auto bg-gray-50 pt-5">
                    {children}
                </main>
            </div>            
        </div>
    )
}
 
export default PortalLayout