import { TextInput } from "./FormField"
import PasswordInput from "./PasswordInput"
import { inputCls, labelCls } from "./FormField"

const BasicInfoStep = ({ form, onChange, onNext, onBack }) => {
    const set = (field) => (e) => onChange(field, e.target.value)

    const valid =
        form.firstName && form.lastName &&
        form.email && form.phone &&
        form.password && form.password === form.confirmPassword

    return (
        <div className="space-y-5">
            <div className="grid grid-row lg:grid-cols-2 gap-4">
                <TextInput label="First name" placeholder="Jane" value={form.firstName} onChange={set("firstName")} />
                <TextInput label="Last name" placeholder="Muthoni" value={form.lastName} onChange={set("lastName")} />
            </div>

            <div className="grid grid-row lg:grid-cols-2 gap-4">
                <TextInput label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
                <div>
                    <label className={labelCls}>Phone number</label>
                    <div className="flex gap-2">
                        <div className="bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-3 py-3 text-sm text-[rgba(245,240,232,0.5)] shrink-0">
                            🇰🇪 +254
                        </div>
                        <input type="tel" placeholder="712 345 678" value={form.phone} onChange={set("phone")} className={`${inputCls} flex-1 min-w-0`} />
                    </div>
                </div>
            </div>
                

            <div className="grid grid-row lg:grid-cols-2 gap-4">
                <PasswordInput label="Password" placeholder="••••••••" value={form.password} onChange={set("password")} />
                <PasswordInput label="Confirm password" placeholder="••••••••" value={form.confirmPassword} onChange={set("confirmPassword")} />
            </div>

            {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-400">Passwords do not match</p>
            )}

            <div className="flex gap-3 pt-1">
                <button type="button" onClick={onBack} className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-[rgba(245,240,232,0.5)] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-all">
                    Back
                </button>
                <button type="button" onClick={onNext} disabled={!valid} className="flex-1 bg-[#3b68d8] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none">
                    Continue
                </button>
            </div>
        </div>
    )
}

export default BasicInfoStep