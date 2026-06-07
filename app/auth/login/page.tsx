"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

const LoginPage = () => 
{
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: "", password: "" })

    const handleSubmit = async () => 
    {
        setLoading(true)

        //Checking if the email is an email
        if (!form.email.includes("@")) 
        {
            // TODO: Show error message
            setLoading(false)
            return
        }

        // TODO: wire up auth
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Fields */}
            <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />

            <div>
                <Field label="Password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} suffix=
                {
                    <button type="button" onClick={() => setShowPassword(s => !s)} className="text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.6)] transition-colors">
                        {
                            showPassword 
                            ? 
                                <EyeOff size={18} /> 
                            : 
                                <Eye size={18} />
                        }
                    </button>
                } />
                <div className="text-right">
                    <Link href="/forgot-password" className="text-xs text-[rgba(245,240,232,0.35)] hover:text-[#3b68d8] transition-colors">
                        Forgot password?
                    </Link>
                </div>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={loading || !form.email || !form.password} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#3b68d8] hover:bg-[#4f7ae0] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-[0_4px_16px_rgba(59,104,216,0.35)] transition-all duration-200">
                {
                    loading 
                    ? 
                        <Loader2 size={18} className="animate-spin" /> 
                    : 
                        <>
                            Sign in
                        </>
                }
            </button>

        </div>
    )
}

const Field = ({ label, type, placeholder, value, onChange, suffix }: { label: string, type: string, placeholder: string, value: string, onChange: (v: string) => void, suffix?: React.ReactNode }) => (
    <div className="mb-2">
        <label className="text-xs font-medium text-[rgba(245,240,232,0.45)] tracking-wide uppercase">{label}</label>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] focus-within:border-[rgba(59,104,216,0.6)] focus-within:bg-[rgba(59,104,216,0.04)] transition-all duration-200">
            <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="flex-1 bg-transparent text-sm text-[#F5F0E8] placeholder:text-[rgba(245,240,232,0.2)] outline-none" required/>
            {suffix}
        </div>
    </div>
)

export default LoginPage