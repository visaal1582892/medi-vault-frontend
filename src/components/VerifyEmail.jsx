import { useEffect, useRef, useState } from "react"
import Input from "./Input.jsx"
import axios from "axios";
import LoadingPage from "../pages/Loading.jsx";
import { toast } from 'react-toastify';
import { getEmailValidationMessage, isEmpty } from "../utils/validator.js";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput.jsx";

const OTPLENGTH = 6;

const VerifyEmail = () => {

    const navigate = useNavigate();
    const [emailVerificationState, setEmailVerificationState] = useState({});
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [existingEmailVerificationData, setExistingEmailVerificationData] = useState(null);
    const [errorMessages, setErrorMessages] = useState({
        email: "",
        otp: ""
    });
    const [resendTimer, setResendTimer] = useState(0);
    const [startResendTimer, setStartResendTimer] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const emailInputRef = useRef(null);
    const [otp, setOtp] = useState(Array(OTPLENGTH).fill(""));

    useEffect(() => {
        if (!startResendTimer || resendTimer == 0) return;

        const resendTimerInterval = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        if (resendTimer == 0) {
            setStartResendTimer(false);
            setCanResend(true);
        }

        return () => clearInterval(resendTimerInterval);
    }, [resendTimer, startResendTimer])

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrorMessages((prev) => ({ ...prev, email: "" }));
    }

    const handleSendOtp = async () => {
        // Validate input
        const emailErrorMessage = getEmailValidationMessage(email);

        if (!isEmpty(emailErrorMessage)) {
            setErrorMessages((prev) => ({
                ...prev,
                email: emailErrorMessage,
            }));
            toast.error("Enter valid email");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.get(
                `http://localhost:8080/auth/getVerificationDetails/${email}`
            );
            const verificationData = await response.data.data;

            setExistingEmailVerificationData(verificationData);

            if (verificationData?.isVerified && (new Date(verificationData?.lastVerifiedTime).getTime()+60*60*1000)>Date.now()) { // remember to als check for verification time
                navigate(`/register/${email}`);
                return toast.info("Email already verified");
            }

            setStartResendTimer(true);
            setShowOtpInput(true);
            if (verificationData) {
                const otpTime = new Date(verificationData.otpGeneratedTime).getTime();
                const now = Date.now();
                const diffMs = 60 * 1000 - (now - otpTime);
                if (diffMs > 0) {
                    toast.info("OTP already sent. Please wait 1 minute before resending");
                    setResendTimer(Math.abs(Math.floor(diffMs/1000)));
                    return;
                }
            }
            else {
                setResendTimer(60);
            }

            const postResponse = await axios.post("http://localhost:8080/auth/sendOtp", { email: email });
            toast.success(postResponse.data.message);

            emailInputRef.current.disabled = true;

        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeEmail = () => {
        emailInputRef.current.disabled = false;
        setResendTimer(0);
        setStartResendTimer(false);
        setShowOtpInput(false);
    }


    return (
        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>
            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Verify your email to register at <span className='font-bold'>MEDI VAULT</span></p>

            {/* email and otp inputs */}
            <div className='w-[70%] flex flex-col items-center-safe'>
                <Input type="email" label="Email" name="email" style="mb-6 " value={email} onChange={handleEmailChange} errorMessage={errorMessages.email} ref={emailInputRef} >
                    {showOtpInput && <button className="absolute top-0 right-1 text-slate-700 text-[11px] underline font-medium decoration-1 cursor-pointer hover:font-bold p-0.5 tracking-wide" onClick={handleChangeEmail}>change?</button>}
                </Input>
                {showOtpInput && <OtpInput otp={otp} setOtp={setOtp} />}
                {
                    showOtpInput ? <div className="flex justify-end-safe w-full">
                        <button className="btn rounded-md px-2 py-1 cursor-pointer text-sm mb-7 mr-5" disabled={resendTimer != 0} onClick={handleSendOtp} >
                            <span>resend </span>{resendTimer != 0 && <span>({resendTimer})</span>}
                        </button>
                        <button className="btn rounded-md px-2 py-1 cursor-pointer text-sm mb-7" onClick={handleSendOtp} >
                            verify
                        </button>
                    </div> : <button className="btn rounded-md p-1 cursor-pointer text-sm w-full mb-7" onClick={handleSendOtp} >
                        send otp
                    </button>
                }
            </div>
        </div>
    )
}

export default VerifyEmail