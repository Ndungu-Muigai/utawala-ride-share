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

const RoleSelector = ({ selected, onSelect, onNext }) => (
    <div>
        <p className="mb-2 ">Select your role</p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
            {
                roles.map(role => (
                    <button key={role.id} type="button" onClick={() => onSelect(role.id)} className={`text-left p-5 rounded-2xl border transition-all duration-200 ${selected === role.id ? "border-[#3b68d8] bg-[rgba(59,104,216,0.1)] shadow-[0_0_0_1px_rgba(59,104,216,0.4)]" : "border-[rgba(245,240,232,0.08)] bg-[rgba(245,240,232,0.03)] hover:border-[rgba(245,240,232,0.2)]" }`}>
                        <p className={`text-md font-bold mb-1.5 ${selected === role.id ? "text-[#F5F0E8]" : "text-[rgba(245,240,232,0.7)]"}`}>{role.title}</p>
                        <p className="text-sm text-[rgba(245,240,232,0.4)] leading-relaxed mb-3">{role.desc}</p>
                        <ul className="space-y-1">
                            {
                                role.perks.map(perk => (
                                    <li key={perk} className="flex items-center gap-1.5 text-sm text-[rgba(245,240,232,0.4)]">
                                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${selected === role.id ? "bg-[rgba(59,104,216,0.3)]" : "bg-[rgba(245,240,232,0.08)]"}`}>
                                            <svg className={`w-2 h-2 ${selected === role.id ? "text-[#3b68d8]" : "text-[rgba(245,240,232,0.3)]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        {perk}
                                    </li>
                                ))
                            }
                        </ul>
                    </button>
                ))
            }
        </div>

        <button type="button" onClick={onNext} disabled={!selected} className="w-full bg-[#3b68d8] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none">Continue</button>
    </div>
)

export default RoleSelector