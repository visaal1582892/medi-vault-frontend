import { useEffect, useState } from "react"
import Input from "./Input.jsx"
import axios from "axios";
import LoadingPage from "../pages/Loading.jsx";
import { toast } from 'react-hot-toast';

const VerifyEmail = () => {

    const [emailVerificationState, setEmailVerificationState] = useState({});
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [existingEmailVerificationData, setExistingEmailVerificationData]=useState(null);

    // useEffect(() => {
    //     axios.get("localhost:8080/auth/getVerificationDetails/varma1582892@gmail.com")
    //         .then((emailVerificationDetails) => {
    //             setEmailVerificationState(emailVerificationDetails);
    //             setLoading(false);
    //         })
    // }, [emailVerificationState]);

    const handleSendOtp = async () => {
        if(email==""){
            toast.error("Email cannot be ")
        }
        setLoading(true);
        try{
            const result = await axios.get(`localhost:8080/auth/getVerificationDetails/${email}`);
            setExistingEmailVerificationData(result.data);
            toast.success("Otp sent succesfully");
        }catch(err){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>
            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Verify your email to register at <span className='font-bold'>MEDI VAULT</span></p>

            {/* email and otp inputs */}
            <div className='w-[70%] flex flex-col items-center-safe'>
                <Input type="email" label="Email" name="email" style="mb-5" value={email} onChange={(event) => setEmail(event.target.value)} />
                <button className="btn rounded-md p-1 cursor-pointer text-sm w-full mb-7" onClick={handleSendOtp} >
                    send otp
                </button>
            </div>
        </div>
    )
}

export default VerifyEmail