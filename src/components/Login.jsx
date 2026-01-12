import { useEffect, useState } from "react"
import Input from "./Input"
import { Link } from "react-router-dom"

const Login = () => {

    const [loginData,setLoginData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {

    }, )

    return (

        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>

            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Login to Access Your <span className='font-bold'>MEDI VAULT</span></p>

            {/* Login with credentials */}
            <div className="w-[70%]">
                <Input type="email" label="Email" name="email" style="mb-4" />
                <Input type="password" label="Password" name="password" style={"pr-10 mb-4"} />
                <button className="btn w-full p-1.5 text-sm rounded-md mb-4">Login</button>
            </div>

            {/* Other Options Label */}
            <label className="flex justify-center-safe items-center-safe w-[70%] mb-4">
                <label className="border w-full"></label>
                <p className="text-xs text-slate-600 w-full whitespace-nowrap m-2">Other log in options</p>
                <label className="border w-full"></label>
            </label>

            {/* Login with Other Options */}
            <div className="flex w-[70%] justify-center-safe items-center-safe mb-4">

                {/* Google Login */}
                <button className="border w-10 cursor-pointer rounded-sm hover:bg-slate-100">
                    <img src="/images/googleIcon.png" alt="googleIcon" className="w-full p-2" />
                </button>
            </div>

            <p className="text-xs mb-4">Don't have an account? <Link to="/verifyEmail" className="underline decoration-1 font-semibold hover:text-slate-600">Register</Link></p>
        </div>
    )
}

export default Login