"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Eye, EyeOff, Upload, X, Check } from "lucide-react"

//  Constants 
const CAR_DATA: Record<string, string[]> = {
    Toyota:     ["Corolla", "Camry", "Prius", "RAV4", "Land Cruiser", "Hilux", "Vitz", "Axio",  "Fielder", "Harrier", "Fortuner", "Probox", "Succeed", "Noah", "Voxy"],
    Nissan:     ["Note", "Tiida", "X-Trail", "Patrol", "Navara", "Juke", "Qashqai", "March", "Serena", "Bluebird"],
    Mazda:      ["Demio", "Atenza", "Axela", "CX-5", "BT-50", "MPV"],
    Mitsubishi: ["Outlander", "Pajero", "L200", "Colt", "Galant", "Eclipse Cross", "ASX"],
    Honda:      ["Fit", "Civic", "Accord", "CR-V", "HR-V", "Freed", "Stream", "Shuttle"],
    Subaru:     ["Forester", "Outback", "Impreza", "Legacy", "XV", "Exiga"],
    Suzuki:     ["Swift", "Alto", "Vitara", "Jimny", "Ertiga", "Baleno"],
    Isuzu:      ["D-Max", "MU-X", "NPR", "NMR", "FRR"],
    Volkswagen: ["Polo", "Golf", "Passat", "Tiguan", "Touareg"],
    Mercedes:   ["C-Class", "E-Class", "GLC", "ML", "Sprinter", "Viano"],
    BMW:        ["3 Series", "5 Series", "X3", "X5", "X6"],
    Ford:       ["Ranger", "Everest", "Explorer", "Focus", "Escape"],
    Hyundai:    ["Tucson", "Santa Fe", "i10", "i20", "Elantra", "Accent"],
    Kia:        ["Sportage", "Sorento", "Picanto", "Rio", "Stonic"],
    "Land Rover": ["Defender", "Discovery", "Range Rover", "Freelander"],
    Peugeot:    ["208", "308", "3008", "Partner", "Boxer"],
}
const PASSENGER_STEPS = ["Role", "Your info"]
const DRIVER_STEPS    = ["Role", "Your info", "Vehicle details", "Upload Documents"]

const EMPTY_FORM = 
{
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "",
    password: "", 
    confirmPassword: "",
    vehicleMake: "", 
    vehicleModel: "", 
    vehiclePlate: "",
    vehicleYear: "", 
    vehicleSeats: "", 
    vehicleType: "",
    license: null, 
    idFront: null, 
    idBack: null, 
    logbook: null,
}

//  Shared style tokens 
const labelCls = "block text-xs font-medium text-[rgba(245,240,232,0.45)] tracking-wide mb-1.5 uppercase"
const inputCls = "w-full border border-[rgba(245,240,232,0.08)] rounded-xl px-3 py-3 text-sm text-[#F5F0E8] placeholder:text-[rgba(245,240,232,0.2)] outline-none focus:border-[rgba(59,104,216,0.6)] focus:bg-[rgba(59,104,216,0.04)] transition-all duration-200 [color-scheme:dark]"
const backBtn  = "flex-1 py-3.5 rounded-xl text-sm font-semibold text-[rgba(245,240,232,0.5)] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-all"
const primaryBtn = (disabled: boolean) => `w-full flex-1 bg-[#3b68d8] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${disabled ? "opacity-30 cursor-not-allowed" : "hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)]"}`

//  Page 
const RegistrationPage = () => 
{
    const [step, setStep] = useState(1)
    const [role, setRole] = useState<"passenger" | "driver" | null>(null)
    const [form, setForm] = useState(EMPTY_FORM)
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const steps  = role === "driver" ? DRIVER_STEPS : PASSENGER_STEPS
    const update = (field: keyof typeof EMPTY_FORM, value: unknown) => setForm(p => ({ ...p, [field]: value }))

    const submit = async () => 
    {
        if (!role) return
        
        setLoading(true)
        const fd = new FormData()
        Object.entries(form).forEach(([k, v]) => v && fd.append(k, v))
        fd.append("role", role)
        
        // TODO: wire up API
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
        setDone(true)
    }

    if (done) return <SuccessScreen role={role!} />

    return (
        <div className="space-y-6">
            <StepIndicator steps={steps} current={step} />

            {
                step === 1 && step === 1 && <RoleStep role={role} onSelect={(id) => setRole(id as "passenger" | "driver")} onNext={() => setStep(2)} />

            }
            {
                step === 2 && <BasicInfoStep form={form} onChange={update} onBack={() => setStep(1)} onNext={() => setStep(3)} isPassenger={role === "passenger"} onSubmit={submit} loading={loading} />
                }
            {
                step === 3 && role === "driver" && <VehicleStep form={form} onChange={update} onBack={() => setStep(2)} onNext={() => setStep(4)} />
            }
            {
                step === 4 && role === "driver" && <DocumentsStep form={form} onChange={update} onBack={() => setStep(3)} onSubmit={submit} loading={loading} />
            }

            <p className="text-center text-xs text-[rgba(245,240,232,0.3)]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#3b68d8] hover:underline font-medium">Sign in</Link>
            </p>
        </div>
    )
}

//  Step 1: Role 
const roles = [
    {
        id: "passenger",
        title: "I'm a Passenger",
        desc: "Find and book rides on your daily route. Save money, skip the chaos.",
        perks: ["Book rides instantly", "Track your driver", "Pay via M-Pesa"],
    },
    {
        id: "driver",
        title: "I'm a Driver",
        desc: "Offer seats on your daily commute and earn on every trip you already take.",
        perks: ["Set your own schedule", "Earn per seat", "Verified passengers only"],
    },
]

const RoleStep = ({ role, onSelect, onNext }: {role: "passenger" | "driver" | null, onSelect: (id: "passenger" | "driver") => void, onNext: () => void}) =>
 (
    <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {
                roles.map(r => (
                    <button key={r.id} type="button" onClick={() => onSelect(r.id)}
                        className={`text-left p-5 rounded-xl border transition-all duration-200 space-y-3 ${role === r.id ? "border-[#3b68d8] bg-[rgba(59,104,216,0.1)]" : "border-[rgba(245,240,232,0.08)] bg-[rgba(245,240,232,0.03)] hover:border-[rgba(245,240,232,0.2)]"}`}>
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-sm font-semibold text-[#F5F0E8]">{r.title}</p>
                                <p className="text-xs text-[rgba(245,240,232,0.4)] mt-1 leading-relaxed">{r.desc}</p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 transition-all
                                ${role === r.id ? "border-[#3b68d8] bg-[#3b68d8]" : "border-[rgba(245,240,232,0.2)]"}`} />
                        </div>

                        <ul className="space-y-1.5">
                            {
                                r.perks.map(perk => (
                                    <li key={perk} className="flex items-center gap-2 text-xs text-[rgba(245,240,232,0.5)]">
                                        <Check size={11} className={role === r.id ? "text-[#3b68d8]" : "text-[rgba(245,240,232,0.2)]"} />
                                        {perk}
                                    </li>
                                ))
                            }
                        </ul>
                    </button>
                ))
            }
        </div>

        <button type="button" onClick={onNext} disabled={!role} className={primaryBtn(!role)}>
            Next
        </button>
    </div>
)

//  Step 2: Basic Info 
const BasicInfoStep = ({ form, onChange, onNext, onBack, isPassenger, onSubmit, loading }: {form: typeof EMPTY_FORM, onChange: (field: keyof typeof EMPTY_FORM, value: unknown) => void, onNext: () => void, onBack: () => void, isPassenger: boolean, onSubmit: () => void, loading: boolean}) =>
{
    const set = (field: string) => (e: { target: { value: unknown } }) => onChange(field, e.target.value)

    const valid = form.firstName && form.lastName && form.email &&
        form.phone && form.password && form.password === form.confirmPassword

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput label="First name" placeholder="Jane"    value={form.firstName} onChange={set("firstName")} />
                <TextInput label="Last name"  placeholder="Muthoni" value={form.lastName}  onChange={set("lastName")}  />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PasswordInput label="Password"         placeholder="••••••••" value={form.password}        onChange={set("password")}        />
                <PasswordInput label="Confirm password" placeholder="••••••••" value={form.confirmPassword} onChange={set("confirmPassword")} />
            </div>

            {
                form.password && form.confirmPassword && form.password !== form.confirmPassword && 
                    <p className="text-xs text-red-400 -mt-2">Passwords do not match</p>
            }

            {
                isPassenger && 
                    <p className="text-xs text-[rgba(245,240,232,0.4)] leading-relaxed -mt-1">
                        By creating an account, you agree to our{" "}
                        <a href="#" className="text-[#3b68d8] hover:underline">Terms of Service</a> and{" "}
                        <a href="#" className="text-[#3b68d8] hover:underline">Privacy Policy</a>.
                    </p>
            }

            <div className="flex gap-3 pt-1">
                <button type="button" onClick={onBack} className={backBtn}>Back</button>
                {
                isPassenger
                ? 
                    <button type="button" onClick={onSubmit} disabled={!valid || loading} className={primaryBtn(!valid || loading)}>
                        {
                            loading 
                            ? 
                                <Spinner /> 
                            : 
                                "Create passenger account"
                        }
                    </button>
                : 
                    <button type="button" onClick={onNext} disabled={!valid} className={primaryBtn(!valid)}>
                        Continue to vehicle details
                    </button>
                }
            </div>
        </div>
    )
}

//  Step 3: Vehicle 

const VEHICLE_TYPES = ["Sedan", "SUV", "Van", "Pickup", "Minibus"]

const VehicleStep = ({ form, onChange, onBack, onNext }: {form: typeof EMPTY_FORM, onChange: (field: keyof typeof EMPTY_FORM, value: unknown) => void, onBack: () => void, onNext: () => void }) => 
{
    //Creating states to store vehicle makes and models
    const makes  = Object.keys(CAR_DATA)
    const models = form.vehicleMake ? CAR_DATA[form.vehicleMake] ?? [] : []

    const onMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
    {
        onChange("vehicleMake", e.target.value)
        onChange("vehicleModel", "")
    }

    const set = (field: string) => (e) => onChange(field, e.target.value)
    const valid = form.vehicleMake && form.vehicleModel && form.vehiclePlate && form.vehicleYear && form.vehicleType

    return (
        <div className="space-y-5">
            {/* Make */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label className={labelCls}>Make</label>
                    <select value={form.vehicleMake} onChange={set("vehicleMake")} className={inputCls}>
                        <option value="" disabled>Select make…</option>
                        {
                            makes.map(m => 
                                <option key={m} value={m} className="bg-[#0D0B08]">{m}</option>
                        )}
                    </select>
                </div>

                {/* Model */}
                <div>
                    <label className={labelCls}>Model</label>
                    <select value={form.vehicleModel} onChange={set("vehicleModel")} disabled={!form.vehicleMake } className={inputCls}>
                        <option value="" disabled>{!form.vehicleMake ? "Select make first" : "Select model…"}</option>
                        {models.map(m => <option key={m} value={m} className="bg-[#0D0B08]">{m}</option>)}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput label="Plate number" placeholder="KCA 123A" value={form.vehiclePlate} onChange={set("vehiclePlate")} />
                <TextInput label="Year" type="number" placeholder="2020" value={form.vehicleYear} onChange={set("vehicleYear")} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label className={labelCls}>Vehicle type</label>
                    <select value={form.vehicleType} onChange={set("vehicleType")} className={`${inputCls}`}>
                        <option value="" className="bg-[#0D0B08]" disabled>Select type…</option>
                        {VEHICLE_TYPES.map(t => (
                            <option key={t} value={t.toLowerCase()} className="bg-[#0D0B08]">{t}</option>
                        ))}
                    </select>
                </div>
                <TextInput label="Seats" type="number" placeholder="4" value={form.vehicleSeats} onChange={set("vehicleSeats")} />
            </div>
            <div className="flex gap-3 pt-1">
                <button type="button" onClick={onBack} className={backBtn}>Back</button>
                <button type="button" onClick={onNext} disabled={!valid} className={primaryBtn(!valid)}>
                    Continue to documents
                </button>
            </div>
        </div>
    )
}

//  Step 4: Documents 

const DocumentsStep = ({ form, onChange, onBack, onSubmit, loading }: {form: typeof EMPTY_FORM, onChange: (field: keyof typeof EMPTY_FORM, value: unknown) => void, onBack: () => void, onSubmit: () => void, loading: boolean}) =>
{
    const set   = (field: string) => (file: unknown) => onChange(field, file)
    const valid = form.logbook && form.license && form.idFront && form.idBack

    return (
        <div className="space-y-5">
            <p className="text-xs text-[rgba(245,240,232,0.4)] leading-relaxed -mt-1">
                Upload clear photos or scanned copies. All documents are securely stored and used only for verification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUpload label="Driver's licence"    hint="JPG, PNG or PDF · Max 5MB" accept="image/*,application/pdf" value={form.license}  onChange={set("license")}  />
                <FileUpload label="National ID (front)" hint="JPG, PNG or PDF · Max 5MB" accept="image/*,application/pdf" value={form.idFront}  onChange={set("idFront")}  />
                <FileUpload label="National ID (back)"  hint="JPG, PNG or PDF · Max 5MB" accept="image/*,application/pdf" value={form.idBack}   onChange={set("idBack")}   />
                <FileUpload label="Vehicle logbook"     hint="JPG, PNG or PDF · Max 5MB" accept="image/*,application/pdf" value={form.logbook}  onChange={set("logbook")}  />
            </div>
            <div className="flex gap-3 pt-1">
                <button type="button" onClick={onBack} className={backBtn}>Back</button>
                <button type="button" onClick={onSubmit} disabled={!valid || loading} className={primaryBtn(!valid || loading)}>
                    {loading ? <Spinner /> : "Create driver account"}
                </button>
            </div>
        </div>
    )
}

//  Success 

const SuccessScreen = ({ role }: {role: string}) => (
    <div className="text-center py-4 space-y-4">
        <div className="w-14 h-14 rounded-full bg-[rgba(59,104,216,0.15)] border border-[rgba(59,104,216,0.3)] flex items-center justify-center mx-auto">
            <Check size={28} className="text-[#3b68d8]" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-[#F5F0E8] mb-1">
                {role === "driver" ? "Application submitted!" : "You're all set!"}
            </h3>
            <p className="text-sm text-[rgba(245,240,232,0.45)] leading-relaxed max-w-xs mx-auto">
                {role === "driver"
                    ? "Your driver application is under review. We'll notify you within 24–48 hours."
                    : "Your account is ready. Start booking rides today."}
            </p>
        </div>
        {
            role === "driver"
            ? 
                <button disabled className="mt-2 bg-[#3b68d8] text-white font-semibold text-sm px-8 py-2.5 rounded-xl opacity-40 cursor-not-allowed">Awaiting approval</button>
            : 
                <Link href="/dashboard" className="inline-block mt-2 bg-[#3b68d8] text-white font-semibold text-sm px-8 py-2.5 rounded-xl hover:bg-[#4f7ae0] transition-colors">Go to dashboard</Link>
        }
    </div>
)

//  Shared UI components 

const StepIndicator = ({ steps, current }: { steps: string[], current: number }) => (

    <div className="flex items-center justify-between mb-5">
        {
            steps.map((label, i) => 
            {
                const idx    = i + 1
                const isDone = idx < current
                const active = idx === current
                return (
                    <div key={idx} className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-2 shrink-0">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${isDone ? "bg-[#3b68d8] text-white" : active ? "bg-[rgba(59,104,216,0.2)] border border-[#3b68d8] text-[#3b68d8]" : "bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.1)] text-[rgba(245,240,232,0.3)]"}`}>
                                {
                                    isDone
                                    ? 
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                    : 
                                        idx
                                }
                            </div>
                            <span className={`text-xs font-medium uppercase tracking-wider hidden sm:block transition-colors ${active ? "text-[rgba(245,240,232,0.8)]" : "text-[rgba(245,240,232,0.3)]"}`}>{label}</span>
                        </div>
                        {
                            i < steps.length - 1 &&
                                <div className={`h-px flex-1 mx-1 transition-all duration-500 ${isDone ? "bg-[#3b68d8]" : "bg-[rgba(245,240,232,0.08)]"}`} />
                        }
                    </div>
                )
            })
        }
    </div>
)

const TextInput = ({ label, type = "text", placeholder, value, onChange }: {label: string, type?: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => (
    <div>
        <label className={labelCls}>{label}</label>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={inputCls} />
    </div>
)

const PasswordInput = ({ label, placeholder, value, onChange }: {label: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) =>
{
    const [show, setShow] = useState(false)
    return (
        <div>
            <label className={labelCls}>{label}</label>
            <div className="relative">
                <input type={show ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange}
                    className={`${inputCls} pr-10`} />
                <button type="button" onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.6)] transition-colors">
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
            </div>
        </div>
    )
}

const FileUpload = ({ label, hint, accept, value, onChange }: {label: string, hint: string, accept: string, value: File | null, onChange: (file: File | null) => void }) => 
{
    const ref = useRef(null)
    return (
        <div>
            <label className={labelCls}>{label}</label>
            <div onClick={() => ref.current?.click()}
                className={`relative flex items-center justify-between px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${value ? "border-[rgba(59,104,216,0.5)] bg-[rgba(59,104,216,0.06)]" : "border-[rgba(245,240,232,0.08)] bg-[rgba(245,240,232,0.03)] hover:border-[rgba(245,240,232,0.2)]"}`}>
                <input ref={ref} type="file" accept={accept} className="hidden"
                    onChange={e => onChange(e.target.files?.[0] ?? null)} />
                <div className="flex items-center gap-2.5 min-w-0">
                    {
                        value
                        ? 
                            <Check size={15} className="text-[#3b68d8] shrink-0" />
                        : 
                            <Upload size={15} className="text-[rgba(245,240,232,0.3)] shrink-0" />
                    }
                    <div className="min-w-0">
                        <p className={`text-sm truncate ${value ? "text-[#F5F0E8]" : "text-[rgba(245,240,232,0.4)]"}`}>
                            {
                                value 
                                ? 
                                    value.name 
                                : 
                                    "Choose file"
                            }
                        </p>
                        <p className="text-[10px] text-[rgba(245,240,232,0.25)]">{hint}</p>
                    </div>
                </div>
                {
                    value && 
                        <button type="button" onClick={e => { e.stopPropagation(); onChange(null) }} className="ml-2 text-[rgba(245,240,232,0.3)] hover:text-red-400 transition-colors shrink-0">
                            <X size={14} />
                        </button>
                }
            </div>
        </div>
    )
}

const Spinner = () => (
    <><span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
)

export default RegistrationPage