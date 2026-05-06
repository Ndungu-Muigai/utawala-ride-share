import { Link } from "react-router-dom"
import Carpool from "../../assets/Carpool.png"

const HomePage = () => 
{
    return (
        <section className="relative min-h-screen bg-[#0D0B08] text-[#F5F0E8] flex items-center overflow-hidden font-sans">

            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage: "linear-gradient(rgba(245,240,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px",}} />

            {/* Blue glow top-right */}
            <div className="absolute -top-24 -right-24 w-150 h-150 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,104,216,0.2) 0%, transparent 70%)" }} />

            {/* Blue glow bottom-left */}
            <div className="absolute -bottom-12 left-[10%] w-100 h-100 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(59,104,216,0.1) 0%, transparent 70%)" }} />

            <div className="relative z-10 w-full max-w-300 mx-auto px-6 py-4 md:py-0 grid md:grid-cols-2 gap-16 items-center">
                {/* Left: Copy */}
                <div>
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] uppercase text-[#3b68d8] mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b68d8] animate-pulse" />
                        Utawala · Nairobi
                    </div>

                    {/* Headline */}
                    <h1 className="text-[clamp(2.4rem,4vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight mb-6">
                        Smarter rides,<br />
                        <span className="text-[#3b68d8] relative inline-block">
                        cheaper fares
                        <span className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-[#3b68d8] opacity-40" />
                        </span>,<br />
                        every commute.
                    </h1>

                    {/* Body */}
                    <p className="text-[1.05rem] leading-[1.75] text-[rgba(245,240,232,0.55)] mb-10 max-w-105">
                        Connect with trusted drivers on your daily route out of Utawala.
                        Skip the chaos, split the cost, and ride on your own schedule.
                    </p>

                    {/* CTA */}
                    <div className="mb-12">
                        <Link to="/login" className="inline-flex items-center gap-2.5 bg-[#3b68d8] text-white text-[0.95rem] font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-[#3b68d8] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)] group"
                        >Get started</Link>
                    </div>

                    {/* Trust strip */}
                    <div className="flex items-center gap-3">
                        <div className="flex">
                        {["JM", "AK", "BN", "+"].map((label, i) => (
                            <span key={i} className="w-7.5 h-7.5 rounded-full bg-[#3b68d8] border-2 border-[#0D0B08] flex items-center justify-center text-[10px] font-bold text-white" style={{ marginLeft: i === 0 ? 0 : "-8px" }} >
                            {label}</span>
                        ))}
                        </div>
                        <div className="text-[0.8rem] leading-snug text-[rgba(245,240,232,0.4)]">
                            <span className="block text-[rgba(245,240,232,0.7)] font-medium">200+ daily commuters</span> Safe · Verified · Affordable
                        </div>
                    </div>
                </div>

                {/* Right: Visual */}
                <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-115">

                        {/* Blue glow behind card */}
                        <div className="absolute -inset-5 rounded-4xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(59,104,216,0.2) 0%, transparent 70%)" }} />

                        {/* Floating stat — top left */}
                        <div className="absolute top-0 left-0 z-20 hidden md:flex items-center gap-2.5 bg-[rgba(20,18,12,0.9)] backdrop-blur-md border border-[rgba(245,240,232,0.1)] rounded-2xl px-4 py-3">
                            <div className="w-9 h-9 rounded-[10px] bg-[rgba(59,104,216,0.15)] flex items-center justify-center text-lg shrink-0">🛣️</div>
                            <div>
                                <div className="text-[11px] text-[rgba(245,240,232,0.4)] mb-0.5">Avg. savings</div>
                                <div className="text-[15px] font-bold text-[#F5F0E8] tracking-tight">Ksh 180/day</div>
                            </div>
                        </div>

                        {/* Main image card */}
                        <div className="relative bg-[rgba(245,240,232,0.04)] border border-[rgba(245,240,232,0.08)] rounded-[28px] overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                            <img src={Carpool} alt="People sharing a ride in Utawala" className="w-full block object-contain"/>
                        </div>

                        {/* Floating stat — bottom right */}
                        <div className="absolute bottom-0 right-0 z-20 flex items-center gap-2.5 bg-[rgba(20,18,12,0.9)] backdrop-blur-md border border-[rgba(245,240,232,0.1)] rounded-2xl px-4 py-3">
                            <div className="w-9 h-9 rounded-[10px] bg-[rgba(59,104,216,0.15)] flex items-center justify-center text-lg shrink-0">⭐</div>
                            <div>
                                <div className="text-[11px] text-[rgba(245,240,232,0.4)] mb-0.5">Average Driver rating</div>
                                <div className="text-[15px] font-bold text-[#F5F0E8] tracking-tight">4.6 / 5.0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage