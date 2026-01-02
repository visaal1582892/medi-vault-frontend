import Input from "./Input"
import { Link } from "react-router-dom"
import OtpInput from "./OtpInput";
import { useRef, useState } from "react";

const Register = () => {

    const [showOtpInput,setShowOtpInput]=useState(false);
    const [isVerified, setIsVerified]=useState(false);
    const emailInputRef=useRef(null);

    const handleClickSendOtp = (event) => {
        setShowOtpInput(true);
        emailInputRef.current.disabled=true;
    }

    const handleClickChange = (event) => {
        setShowOtpInput(false);
        emailInputRef.current.disabled=false;
        emailInputRef.current.focus();
    }

    return (
        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>

            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Register here to start your <span className='font-bold'>MEDI VAULT</span></p>

            {/* Register with credentials */}
            <div className='w-[70%] flex flex-col items-center-safe'>
                {showOtpInput && <OtpInput />}
                <Input type="text" label="Username" style={`mb-4 ${!isVerified && "hidden"}`} />
                <Input type="password" label="Password" style={`pr-10 mb-4 ${!isVerified && "hidden"}`} />
                <Input type="password" label="Confirm Password" style={`pr-10 mb-4 ${!isVerified && "hidden"}`} />
                <button className="btn w-full mb-4 text-sm rounded-md p-1.5" disabled={!isVerified} >Register</button>
            </div>

            {/* Other Options Label */}
            <label className="flex justify-center-safe items-center-safe w-[70%] mb-4">
                <label className="border w-full"></label>
                <p className="text-xs text-slate-600 w-full whitespace-nowrap m-2">Other register options</p>
                <label className="border w-full"></label>
            </label>

            {/* Login with Other Options */}
            <div className="flex w-[70%] justify-center-safe items-center-safe mb-4">

                {/* Google Login */}
                <button className="border w-10 cursor-pointer rounded-sm hover:bg-slate-100">
                    <img src="/images/googleIcon.png" alt="googleIcon" className="w-full p-2" />
                </button>
            </div>

            <p className="text-xs mb-5">Already have an account? <Link to="/" className="underline decoration-1 font-semibold hover:text-slate-600">Login</Link></p>
        </div>
    )
}

export default Register