import { EyeOff, Eye } from 'lucide-react';
import { useRef, useState } from 'react';

const Input = ({ type, label, style, children }) => {

    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`flex w-full border border-slate-500 relative group rounded-sm hover:bg-slate-100 focus-within:border-2 h-12 group cursor-text pb-1 ${style}`}>
            <input placeholder=' ' type={showPassword==true?"text":type} ref={inputRef} className='w-full h-full outline-none px-2 pt-7 pb-2 mt-auto rounded-sm peer text-sm' />
            <p className='input-label'>{label}</p>
            {["Password","Confirm Password"].includes(label)?<button
                type="button"
                onClick={(event) => {
                    setShowPassword(prev => !prev);
                    event.stopPropagation();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>:null}
            {children}
        </div>
    )
}

export default Input