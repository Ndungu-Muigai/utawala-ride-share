import { TextInput, FormField, inputCls } from "./FormField"

const VEHICLE_TYPES = ["Saloon", "SUV", "Hatchback", "Van / Matatu", "Pickup"]

const VehicleDetailsStep = ({ form, onChange, onNext, onBack }) => {
    const set = (field) => (e) => onChange(field, e.target.value)

    const valid = form.idNumber && form.vehicleMake && form.vehicleModel && form.vehiclePlate && form.vehicleSeats && form.vehicleType && form.vehicleYear

    return (
        <div className="space-y-5">
            <TextInput label="National ID number" placeholder="e.g. 12345678" value={form.idNumber} onChange={set("idNumber")} />

            <div className="grid grid-cols-2 gap-4">
                <TextInput label="Vehicle make" placeholder="e.g. Toyota" value={form.vehicleMake} onChange={set("vehicleMake")} />
                <TextInput label="Vehicle model" placeholder="e.g. Fielder" value={form.vehicleModel} onChange={set("vehicleModel")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <TextInput label="Number plate" placeholder="e.g. KDA 123A" value={form.vehiclePlate} onChange={set("vehiclePlate")} />
                <TextInput label="Year of manufacture" type="number" placeholder="e.g. 2019" value={form.vehicleYear} onChange={set("vehicleYear")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormField label="Vehicle type">
                    <select value={form.vehicleType} onChange={set("vehicleType")} className={inputCls}>
                        <option value="" disabled>Select type</option>
                        {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </FormField>
                <FormField label="Available seats">
                    <select value={form.vehicleSeats} onChange={set("vehicleSeats")} className={inputCls}>
                        <option value="" disabled>Select seats</option>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => <option key={n} value={n}>{n} seat{n > 1 ? "s" : ""}</option>)}
                    </select>
                </FormField>
            </div>

            <TextInput label="Route (e.g. Utawala → CBD)" placeholder="e.g. Utawala → Kencom" value={form.route} onChange={set("route")} />

            <div className="flex gap-3 pt-1">
                <button type="button" onClick={onBack} className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-[rgba(245,240,232,0.5)] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-all">
                    Back
                </button>
                <button type="button" onClick={onNext} disabled={!valid} className="flex-[2] bg-[#3b68d8] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none">
                    Continue
                </button>
            </div>
        </div>
    )
}

export default VehicleDetailsStep