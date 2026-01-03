import { useEffect, useState } from "react"
import Input from "./Input"
import axios from "axios";
import LoadingPage from "../pages/Loading";

const VerifyEmail = () => {

    const [emailVerificationState, setEmailVerificationState] = useState({});
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     axios.get("localhost:8080/auth/getVerificationDetails/varma1582892@gmail.com")
    //         .then((emailVerificationDetails) => {
    //             setEmailVerificationState(emailVerificationDetails);
    //             setLoading(false);
    //         })
    // }, [emailVerificationState]);

    return (
        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>
            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Verify your email to register at <span className='font-bold'>MEDI VAULT</span></p>

            {/* email and otp inputs */}
            <div className='w-[70%] flex flex-col items-center-safe'>
                <Input type="email" label="Email" name="email" style="mb-5" />
                <button className="btn rounded-md p-1 cursor-pointer text-sm w-full mb-7" >
                    send otp
                </button>
            </div>
        </div>
    )
}

export default VerifyEmail