import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FormField, inputCls } from "./FormField"

const PasswordInput = ({ label, ...props }) => {
    const [show, setShow] = useState(false)
    return (
        <FormField label={label}>
            <div className="relative">
                <input type={show ? "text" : "password"} className={`${inputCls} pr-11`} {...props} />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.7)] transition-colors">
                    {
                        show 
                        ? 
                            <FaEyeSlash className="w-5 h-5" /> 
                        : 
                            <FaEye className="w-5 h-5" />
                    }
                </button>
            </div>
        </FormField>
    )
}

export default PasswordInput