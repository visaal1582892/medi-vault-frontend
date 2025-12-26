import { EyeOff, Eye } from 'lucide-react';
import { useRef, useState } from 'react';

const Input = ({ type, label }) => {

    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputClick = (event) => {
        if (document.activeElement !== inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <div className='flex w-[80%] border border-slate-500 relative group rounded-sm hover:bg-slate-200 focus-within:border-2 h-13 group cursor-text pb-1' onClick={handleInputClick}>
            <input type={type} ref={inputRef} className='w-full h-[60%] outline-none p-2 mt-auto rounded-sm peer text-sm' />
            <p className='absolute left-3 text-sm tracking-wider font-medium top-1/2 -translate-y-1/2 peer-focus-within:top-1 peer-focus-within:text-[10px] peer-focus-within:translate-y-0 peer-focus-within:font-normal transition-all duration-150 pointer-events-none peer-focus-within:text-blue-700'>{label}</p>
            <button
                type="button"
                onClick={(event) => {
                    setShowPassword(prev => !prev);
                    event.stopPropagation();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
                {showPassword ? <EyeOff /> : <Eye />}
            </button>
        </div>
    )
}

export default Input