import { useState } from "react"
import { Link } from "react-router-dom"

import StepIndicator from "./StepIndicator"
import RoleSelector from "./RoleSelector"
import BasicInfoStep from "./BasicInfoStep"
import VehicleDetailsStep from "./VehicleDetailsStep"
import DocumentsStep from "./DocumentsStep"

const PASSENGER_STEPS = ["Role", "Your info"]
const DRIVER_STEPS    = ["Role", "Your info", "Vehicle Details", "Upload documents"]

const emptyForm = 
{
    // basic
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
    // driver - vehicle
    idNumber: "", vehicleMake: "", vehicleModel: "", vehiclePlate: "",
    vehicleYear: "", vehicleType: "", vehicleSeats: "", 
    // driver - documents
    license: null, idFront: null, idBack: null, logbook: null, insurance: null,
}

const RegisterFlow = ({ onSwitchToLogin }) => 
{
    const [step, setStep] = useState(1)
    const [role, setRole] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const steps = role === "driver" ? DRIVER_STEPS : PASSENGER_STEPS

    const update = (field, value) => setForm(p => ({ ...p, [field]: value }))

    const handlePassengerSubmit = async () => 
    {
        setLoading(true)

        //Adding the role to the form data to be submitted to the backend
        const formData = new FormData()
        for (const key in form) 
        {
            formData.append(key, form[key])
        }
        formData.append("role", role)

        // TODO: wire up your passenger registration API call here
        await new Promise(r => setTimeout(r, 1200))
        setLoading(false)
        setDone(true)
    }

    const handleDriverSubmit = async () => 
    {
        setLoading(true)

        //Adding the role to the form data to be submitted to the backend
        const formData = new FormData()
        for (const key in form) 
        {
            formData.append(key, form[key])
        }
        formData.append("role", role)

        // TODO: wire up your driver registration API call here (include file uploads)
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
        setDone(true)
    }

    if (done) return <SuccessScreen role={role} />

    return (
        <div>
            <StepIndicator steps={steps} currentStep={step} />

            {
                step === 1 && 
                    <RoleSelector selected={role} onSelect={setRole} onNext={() => setStep(2)} />
            }

            {
                step === 2 && 
                    <BasicInfoStep form={form} onChange={update} onBack={() => setStep(1)} onNext={() => role === "driver" ? setStep(3) : handlePassengerSubmit()} loading={loading} isPassenger={role === "passenger"} onSubmit={handleDriverSubmit} loading={loading}/>
            }

            {
                step === 3 && role === "driver" && 
                    <VehicleDetailsStep form={form} onChange={update} onBack={() => setStep(2)} onNext={() => setStep(4)} />
            }

            {
                step === 4 && role === "driver" && 
                    <DocumentsStep form={form} onChange={update} onBack={() => setStep(3)} onSubmit={handleDriverSubmit} loading={loading} />
            }

            <p className="text-center text-xs text-[rgba(245,240,232,0.3)] pt-3">
                Already have an account?{" "}
                <button type="button" onClick={onSwitchToLogin} className="text-[#3b68d8] hover:underline font-medium">
                    Sign in
                </button>
            </p>
        </div>
    )
}

const SuccessScreen = ({ role }) => (
    <div className="text-center py-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[rgba(59,104,216,0.15)] border border-[rgba(59,104,216,0.3)] flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-[#3b68d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <div>
            <h3 className="text-xl font-bold text-[#F5F0E8] mb-2">
                {
                    role === "driver" 
                    ? 
                        "Application submitted!" 
                    : 
                        "You're all set!"
                }
            </h3>
            <p className="text-sm text-[rgba(245,240,232,0.45)] leading-relaxed max-w-xs mx-auto">
                {
                    role === "driver"
                    ? 
                        "Your driver application is under review. We'll notify you within 24–48 hours once approved."
                    : 
                        "Your account is ready. Start booking rides on your route today."
                }
            </p>
        </div>
        {
            role === "driver" 
            ?
                <button type="button" disabled className="mt-2 bg-[#3b68d8] text-white font-semibold text-sm px-8 py-3 rounded-xl opacity-50 cursor-not-allowed">
                    Awaiting approval
                </button>
            :
                <Link to="/dashboard" className="inline-block mt-2 bg-[#3b68d8] text-white font-semibold text-sm px-8 py-3 rounded-xl transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)]">Login</Link>
        }
    </div>
)

export default RegisterFlow