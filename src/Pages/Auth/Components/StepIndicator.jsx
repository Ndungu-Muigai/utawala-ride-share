const StepIndicator = ({ steps, currentStep }) => (
    <div className="flex items-center gap-2 mb-8">
        {
            steps.map((label, i) => 
            {
                const idx = i + 1
                const done = idx < currentStep
                const active = idx === currentStep
                return (
                    <div key={idx} className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-2 shrink-0">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${done ? "bg-[#3b68d8] text-white" : active ? "bg-[rgba(59,104,216,0.2)] border border-[#3b68d8] text-[#3b68d8]" : "bg-[rgba(245,240,232,0.05)] border border-[rgba(245,240,232,0.1)] text-[rgba(245,240,232,0.3)]"}`}>
                                {
                                    done
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
                                <div className={`h-px flex-1 mx-1 transition-all duration-500 ${done ? "bg-[#3b68d8]" : "bg-[rgba(245,240,232,0.08)]"}`} />
                        }
                    </div>
                )
            })
        }
    </div>
)

export default StepIndicator