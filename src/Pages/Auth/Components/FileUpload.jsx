import { useRef } from "react"

const FileUpload = ({ label, hint, accept, value, onChange }) => {
    const ref = useRef()
    return (
        <div>
            <label className="block text-xs font-medium text-[rgba(245,240,232,0.5)] uppercase tracking-widest mb-2">{label}</label>
            <div
                onClick={() => ref.current.click()}
                className="w-full bg-[rgba(245,240,232,0.05)] border border-dashed border-[rgba(245,240,232,0.15)] rounded-xl px-4 py-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-[#3b68d8] hover:bg-[rgba(59,104,216,0.05)] transition-all group"
            >
                <div className="w-8 h-8 rounded-lg bg-[rgba(59,104,216,0.15)] flex items-center justify-center group-hover:bg-[rgba(59,104,216,0.25)] transition-colors">
                    <svg className="w-4 h-4 text-[#3b68d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                </div>
                {value
                    ? <span className="text-xs text-[#3b68d8] font-medium">{value.name}</span>
                    : <>
                        <span className="text-xs text-[rgba(245,240,232,0.6)] font-medium">Click to upload</span>
                        {hint && <span className="text-[10px] text-[rgba(245,240,232,0.3)]">{hint}</span>}
                    </>
                }
            </div>
            <input ref={ref} type="file" accept={accept} className="hidden" onChange={e => onChange(e.target.files[0])} />
        </div>
    )
}

export default FileUpload