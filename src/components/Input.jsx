import { EyeOff, Eye } from 'lucide-react';
import { forwardRef, useState } from 'react';

const Input = forwardRef(({ type, label, name, style, value, onChange }, ref) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`flex w-full border border-slate-500 relative group rounded-sm focus-within:border-2 h-12 group cursor-text ${style} relative`}>
            <input name={name} placeholder=' ' ref={ref} type={showPassword==true?"text":type} className='w-full h-full outline-none px-2 pt-7 pb-3 rounded-sm peer text-sm disabled:pointer-events-none' value={value} onChange={onChange}  />
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
            <p className='text-[10px] text-red-700 absolute top-[105%] left-1 font-medium'>Error Occurred</p>
        </div>
    )
})

export default Input