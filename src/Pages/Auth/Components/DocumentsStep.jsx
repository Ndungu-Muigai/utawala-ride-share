import FileUpload from "./FileUpload"

const DocumentsStep = ({ form, onChange, onSubmit, onBack, loading }) => {
    const set = (field) => (file) => onChange(field, file)

    const valid = form.logbook && form.license && form.idPhoto

    return (
        <div className="space-y-5">
            <p className="text-xs text-[rgba(245,240,232,0.4)] leading-relaxed -mt-1">
                Upload clear photos or scanned copies. All documents are securely stored and used only for verification.
            </p>

            <FileUpload
                label="Driver's licence"
                hint="JPG, PNG or PDF · Max 5MB"
                accept="image/*,application/pdf"
                value={form.license}
                onChange={set("license")}
            />

            <FileUpload
                label="National ID (front & back)"
                hint="JPG, PNG or PDF · Max 5MB"
                accept="image/*,application/pdf"
                value={form.idPhoto}
                onChange={set("idPhoto")}
            />

            <FileUpload
                label="Vehicle logbook"
                hint="JPG, PNG or PDF · Max 5MB"
                accept="image/*,application/pdf"
                value={form.logbook}
                onChange={set("logbook")}
            />

            <FileUpload
                label="Insurance certificate"
                hint="Optional but recommended · Max 5MB"
                accept="image/*,application/pdf"
                value={form.insurance}
                onChange={set("insurance")}
            />

            <div className="flex gap-3 pt-1">
                <button type="button" onClick={onBack} className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-[rgba(245,240,232,0.5)] border border-[rgba(245,240,232,0.08)] hover:border-[rgba(245,240,232,0.2)] transition-all">
                    Back
                </button>
                <button type="button" onClick={onSubmit} disabled={!valid || loading} className="flex-[2] bg-[#3b68d8] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,104,216,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2">
                    {loading
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
                        : "Create driver account"
                    }
                </button>
            </div>
        </div>
    )
}

export default DocumentsStep