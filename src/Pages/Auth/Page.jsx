import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const AuthPage = () => 
{
    const [tab, setTab] = useState("login")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <section className="relative min-h-screen bg-[#0D0B08] text-[#F5F0E8] flex items-center justify-center overflow-hidden font-sans px-4 py-6 md:py-0">

            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(245,240,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

            {/* Blue glow top-right */}
            <div className="absolute -top-24 -right-24 w-150 h-150 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,104,216,0.2) 0%, transparent 70%)" }} />

            {/* Blue glow bottom-left */}
            <div className="absolute -bottom-12 left-[10%] w-100 h-100 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,104,216,0.1) 0%, transparent 70%)" }} />

            <div className={`relative z-10 w-full transition-all duration-500 ease-in-out ${tab === "login" ? "max-w-xl" : "max-w-3xl"}`}>

                {/* Logo / brand */}
                <div className="text-center mb-1">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {
                            tab === "login" 
                            ? 
                                <>Welcome <span className="text-[#3b68d8] relative inline-block">back<span className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-[#3b68d8] opacity-40" /></span></>
                            : 
                                <>Join the <span className="text-[#3b68d8] relative inline-block">ride<span className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-[#3b68d8] opacity-40" /></span></>
                        }
                    </h1>
                    <p className="text-[rgba(245,240,232,0.45)] text-sm mt-2">
                        {
                            tab === "login"
                            ? 
                                "Sign in to your account to continue"
                            : 
                                "Create an account and start saving on commutes"
                        }
                    </p>
                </div>

                {/* Card */}
                <div className="relative">
                    {/* Card glow */}
                    <div className="absolute -inset-4 rounded-[36px] pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,104,216,0.15) 0%, transparent 70%)" }} />

                    <div className="relative bg-[rgba(245,240,232,0.04)] border border-[rgba(245,240,232,0.08)] rounded-[28px] p-8">

                        {/* Tabs */}
                        <div className="flex bg-[rgba(245,240,232,0.05)] rounded-xl p-1 mb-8">
                            <button onClick={() => setTab("login")} className={`flex-1 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 ${tab === "login" ? "bg-[#3b68d8] text-white shadow-[0_4px_12px_rgba(59,104,216,0.35)]" : "text-[rgba(245,240,232,0.4)] hover:text-[rgba(245,240,232,0.7)]" }`}>Sign in</button>
                            <button onClick={() => setTab("register")} className={`flex-1 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 ${tab === "register" ? "bg-[#3b68d8] text-white shadow-[0_4px_12px_rgba(59,104,216,0.35)]" : "text-[rgba(245,240,232,0.4)] hover:text-[rgba(245,240,232,0.7)]"}`}>Sign up</button>
                        </div>

                        {/* ── LOGIN FORM ── */}
                        {
                            tab === "login" && 
                            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">Email</label>
                                    <input type="email" placeholder="you@example.com" className="w-full bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all" />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all pr-11"/>
                                        <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.7)] transition-colors">
                                            {
                                                showPassword 
                                                ? 
                                                    <FaEyeSlash className="w-5 h-5" /> 
                                                : 
                                                    <FaEye className="w-5 h-5" />
                                            }
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <label className="flex items-center text-sm text-[rgba(245,240,232,0.3)]">
                                            <input type="checkbox" className="form-checkbox h-4 w-4 text-[#3b68d8] focus:ring-[#3b68d8] border-[rgba(245,240,232,0.08)] bg-[rgba(245,240,232,0.05)]" />
                                            <span className="ml-2">Remember me</span>
                                        </label>
                                        <a href="#" className="text-sm text-[#3b68d8] hover:underline">Forgot password?</a>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-[#3b68d8] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)] mt-2">Sign in</button>

                                <p className="text-center text-sm text-[rgba(245,240,232,0.3)] pt-1">
                                    Don't have an account?{" "}
                                    <button type="button" onClick={() => setTab("register")} className="text-[#3b68d8] hover:underline font-medium">Sign up</button>
                                </p>
                            </form>
                        }

                        {/* ── REGISTER FORM ── */}
                        {
                            tab === "register" && 
                            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">First name</label>
                                        <input type="text" placeholder="Jane" className="w-full bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">Last name</label>
                                        <input type="text" placeholder="Muthoni" className="w-full bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">Email</label>
                                        <input type="email" placeholder="you@example.com" className="w-full bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">Phone number</label>
                                        <div className="flex gap-2">
                                            <div className="bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-3 py-3 text-sm text-[rgba(245,240,232,0.5)] shrink-0">🇰🇪 +254</div>
                                            <input type="tel" placeholder="712 345 678" className="flex-1 min-w-0 bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">Password</label>
                                        <div className="relative">
                                            <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all pr-11"/>
                                            <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.7)] transition-colors">
                                                {
                                                    showPassword 
                                                    ? 
                                                        <FaEyeSlash className="w-5 h-5" /> 
                                                    : 
                                                        <FaEye className="w-5 h-5" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">Confirm password</label>
                                        <div className="relative">
                                            <input type={showConfirm ? "text" : "password"} placeholder="••••••••" className="w-full bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all pr-11"/>
                                            <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.7)] transition-colors">
                                                {
                                                    showConfirm 
                                                    ? 
                                                        <FaEyeSlash className="w-5 h-5" /> 
                                                    : 
                                                        <FaEye className="w-5 h-5" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-[#3b68d8] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)] mt-2">Create account</button>

                                <p className="text-center text-xs text-[rgba(245,240,232,0.3)]">
                                    Already have an account?{" "}
                                    <button type="button" onClick={() => setTab("login")} className="text-[#3b68d8] hover:underline font-medium">Sign in</button>
                                </p>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthPage