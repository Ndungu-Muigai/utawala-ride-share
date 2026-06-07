"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TabLink = ({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) => (
    <Link href={href} className={`flex-1 text-sm font-semibold py-2.5 rounded-lg text-center transition-all duration-200 ${active ? "bg-[#3b68d8] text-white shadow-[0_4px_12px_rgba(59,104,216,0.35)]" : "text-[rgba(245,240,232,0.4)] hover:text-[rgba(245,240,232,0.7)]"}`}>
        {children}
    </Link>
)

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#3b68d8] relative inline-block">
        {children}
        <span className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-[#3b68d8] opacity-40" />
    </span>
)

const headings = {
    login:    { title: <>Welcome <Highlight>back</Highlight></>,  sub: "Sign in to your account to continue" },
    register: { title: <>Join the <Highlight>ride</Highlight></>, sub: "Create an account and start saving on commutes" },
}

const AuthLayout = ({ children }: { children: React.ReactNode }) => 
{
    const pathname = usePathname()
    const tab = pathname.includes("register") ? "register" : "login"
    const { title, sub } = headings[tab]

    return (
        <section className="relative min-h-screen bg-[#0D0B08] text-[#F5F0E8] flex items-center justify-center overflow-hidden font-sans px-4">
            <div className={`relative z-10 w-full ${tab === "login" ? "max-w-md" : "max-w-4xl"} mx-auto transition-all duration-300`}>

                {/* Header */}
                <div className="text-center mb-2 bg-[#0D0B08] py-3 rounded-2xl">
                    <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
                    <p className="text-[rgba(245,240,232,0.45)] text-sm mt-2">{sub}</p>
                </div>

                {/* Card */}
                <div className="relative">
                    <div className="absolute -inset-4 rounded-[36px] pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,104,216,0.15) 0%, transparent 70%)" }} />
                    <div className="relative bg-[rgba(245,240,232,0.04)] border border-[rgba(245,240,232,0.08)] rounded-[28px] p-4">
                        <div className="flex bg-[rgba(245,240,232,0.05)] rounded-xl p-1 mb-6">
                            <TabLink href="/auth/login" active={tab === "login"}>Sign in</TabLink>
                            <TabLink href="/auth/register" active={tab === "register"}>Sign up</TabLink>
                        </div>
                        {children}
                    </div>
                </div>

            </div>
        </section>
    )
}



export default AuthLayout