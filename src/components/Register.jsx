import Input from "./Input"
import { Link } from "react-router-dom"
import OtpInput from "./OtpInput";
import { useState } from "react";

const Register = () => {

    const [showOtpInput,setShowOtpInput]=useState(false);

    const handleSendOtp = (event) => {
        setShowOtpInput(prev => !prev);
        event.target.classList.toggle("hidden");
    }

    return (
        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>

            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Register here to start your <span className='font-bold'>MEDI VAULT</span></p>

            {/* Login with credentials */}
            <div className='w-[70%] flex flex-col items-center-safe'>
                <Input type="email" label="Email" style="mb-4 pr-11" >
                    <button className="text-xs absolute right-2 top-1/2 -translate-y-1/2 btn rounded-sm p-1 cursor-pointer" onClick={handleSendOtp}>
                        send otp
                    </button>
                </Input>
                {showOtpInput && <OtpInput />}
                <Input type="text" label="Username" style="mb-4" />
                <Input type="password" label="Password" style={"pr-10 mb-4"} />
                <Input type="password" label="Confirm Password" style={"pr-10 mb-4"} />
                <button className="btn w-full mb-7 text-sm rounded-md p-1.5">Register</button>
            </div>

            {/* Other Options Label */}
            <label className="flex justify-center-safe items-center-safe w-[70%] mb-7">
                <label className="border w-full"></label>
                <p className="text-xs text-slate-600 w-full whitespace-nowrap m-2">Other register options</p>
                <label className="border w-full"></label>
            </label>

            {/* Login with Other Options */}
            <div className="flex w-[70%] justify-center-safe items-center-safe mb-7">

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