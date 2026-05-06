import { TextInput } from "./FormField"
import PasswordInput from "./PasswordInput"
import { useState } from "react"

const LoginForm = ({ onSwitchToRegister }) => {
    const [form, setForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)

    const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // TODO: wire up your login API call here
        await new Promise(r => setTimeout(r, 1200))
        setLoading(false)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <TextInput label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />

            <div>
                <PasswordInput label="Password" placeholder="••••••••" value={form.password} onChange={set("password")} />
                <div className="text-right mt-2">
                    <a href="#" className="text-xs text-[#3b68d8] hover:underline">Forgot password?</a>
                </div>
            </div>

            <button
                type="submit"
                disabled={!form.email || !form.password || loading}
                className="w-full bg-[#3b68d8] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
                {loading
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</>
                    : "Sign in"
                }
            </button>

            <p className="text-center text-xs text-[rgba(245,240,232,0.3)] pt-1">
                Don't have an account?{" "}
                <button type="button" onClick={onSwitchToRegister} className="text-[#3b68d8] hover:underline font-medium">
                    Sign up
                </button>
            </p>
        </form>
    )
}

export default LoginForm