import { House, Car, DollarSign, Users, MapPin, History, User, LayoutDashboard } from "lucide-react";

export type NavLink = {
  name: string;
  href: string;
  icon: React.ReactElement;
};

export const navLinks: Record<"admin" | "driver" | "user", NavLink[]> = {
  admin: 
  [
    { name: "Dashboard", href: "/admin",         icon: <LayoutDashboard /> },
    { name: "Users",     href: "/admin/users",   icon: <Users /> },
    { name: "Drivers",   href: "/admin/drivers", icon: <Car /> },
    { name: "Trips",     href: "/admin/trips",   icon: <MapPin /> },
  ],
  driver: 
  [
    { name: "Dashboard", href: "/driver",          icon: <LayoutDashboard /> },
    { name: "My Trips",  href: "/driver/trips",    icon: <MapPin /> },
    { name: "Passengers",  href: "/driver/passengers", icon: <Users /> },
    { name: "Earnings",  href: "/driver/earnings", icon: <DollarSign /> },
  ],
  user: 
  [
    { name: "Dashboard", href: "/dashboard",         icon: <House /> },
    { name: "My Rides",  href: "/dashboard/rides",   icon: <Car /> },
    { name: "History",   href: "/dashboard/history", icon: <History /> },
    { name: "Profile",   href: "/dashboard/profile", icon: <User /> },
  ],
};