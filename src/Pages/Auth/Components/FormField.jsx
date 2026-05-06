const inputClass = "w-full bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[rgba(245,240,232,0.2)] outline-none focus:border-[#3b68d8] focus:ring-1 focus:ring-[rgba(59,104,216,0.4)] transition-all"
const labelClass = "block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2"

export const FormField = ({ label, children }) => (
    <div>
        <label className={labelClass}>{label}</label>
        {children}
    </div>
)

export const TextInput = ({ label, ...props }) => (
    <FormField label={label}>
        <input className={inputClass} {...props} />
    </FormField>
)

export const inputCls = inputClass
export const labelCls = labelClass