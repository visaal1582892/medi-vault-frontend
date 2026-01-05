import { useEffect, useRef, useState } from "react"

const OTPLENGTH = 6;

const OtpInput = ({otp, setOtp}) => {

    const inputRefs=useRef([]);

    const handleChange = (value, index) => {
        // checking whether user enetered value matches single digit or not
        if(!/^\d?$/.test(value)) return;

        // updating state so that ui updates
        const newOtp=[...otp];
        newOtp[index]=value;
        setOtp(newOtp);

        if(index<OTPLENGTH-1){
            inputRefs.current[index+1].focus();
        }
    }

    const handleKeyDown = (event,index) => {
        if(event.key!="Backspace") return;

        event.preventDefault();
        const newOtp=[...otp];
        if(otp[index]=="" && index>0){
            newOtp[index-1]="";
            setOtp(newOtp);
            inputRefs.current[index-1].focus();
        }
        else{
            newOtp[index]="";
            setOtp(newOtp);
        }
    }

    return (
        <div className='mb-4 flex flex-col items-center-safe justify-center rounded-sm border-slate-500 w-full border focus-within:border-2'>
            <p className="text-[10px] text-start w-full px-3 text-slate-500 font-medium tracking-wider py-1">Otp</p>

            {/* Inputs Group */}
            <div className='flex justify-evenly w-full h-full items-center-safe p-1 mb-3'>
                {otp.map((value, index) =>
                    <input type="text" ref={(element) => inputRefs.current[index]=element} inputMode='numeric' value={value} key={index} pattern='[0-9]' maxLength="1" className='size-8 border rounded-sm p-1.5 text-center border-slate-500 outline-none focus:bg-slate-100 text-sm' onChange={(event) => handleChange(event.target.value,index)} onKeyDown={(event) => handleKeyDown(event, index)} autoFocus={index==0} />)}
            </div>
        </div>
    )
}

export default OtpInput