import { useRef, useState } from "react"

const OTPLENGTH = 6;

const OtpInput = () => {

    const [otp, setOtp] = useState(Array(OTPLENGTH).fill(""));
    const inputRefs=useRef([]);

    return (
        <div className='mb-4 flex flex-col items-center-safe justify-center h-28 rounded-sm border-slate-500 w-full border focus-within:border-2'>
            <p className="text-[10px] text-start w-full px-3 text-slate-500 font-medium tracking-wider py-1">Otp</p>

            {/* Inputs Group */}
            <div className='flex justify-evenly w-full h-full items-center-safe'>
                {otp.map((value, index) =>
                    <input type="text" inputMode='numeric' value={value} key={index} pattern='[0-9]' maxLength="1" className='size-8 border rounded-sm p-1.5 text-center border-slate-500 outline-none hover:bg-slate-100 text-sm' />)}
            </div>

            {/* buttons group */}
            <div className='flex justify-end-safe items-center-safe w-full p-3'>
                <button className='btn rounded-sm p-1 cursor-pointer text-xs mr-3'>resend</button>
                <button className='btn rounded-sm p-1 cursor-pointer text-xs'>verify</button>
            </div>
        </div>
    )
}

export default OtpInput