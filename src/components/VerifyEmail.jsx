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

    const [email, setEmail] = useState("");
    const [errorMessages, setErrorMessages] = useState({ email: "", otp: "" });
    const [resendTimer, setResendTimer] = useState(0);
    const [startResendTimer, setStartResendTimer] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [emailLocked, setEmailLocked] = useState(false);
    const [otp, setOtp] = useState(Array(OTPLENGTH).fill(""));

    /* ================= TIMER ================= */
    useEffect(() => {
        if (!startResendTimer) return;

        if (resendTimer === 0) {
            setStartResendTimer(false);
            return;
        }

        const interval = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer, startResendTimer]);

    /* ================= HANDLERS ================= */

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessages((prev) => ({ ...prev, email: "" }));
    };

    const handleSendOtp = async () => {
        const emailErrorMessage = getEmailValidationMessage(email);

        if (!isEmpty(emailErrorMessage)) {
            setErrorMessages((prev) => ({ ...prev, email: emailErrorMessage }));
            toast.error("Enter valid email");
            return;
        }

        try {
            const { data } = await axios.get(
                `http://localhost:8080/auth/getVerificationDetails/${email}`
            );

            const verificationData = data.data;

            /* Already verified & still valid */
            if (
                verificationData?.isVerified &&
                new Date(verificationData.lastVerifiedTime).getTime() + 60 * 60 * 1000 >
                Date.now()
            ) {
                const tokenRes = await axios.post(
                    "http://localhost:8080/auth/createVerificationToken",
                    {
                        email
                    }
                );

                navigate("/register", {
                    state: { verificationToken: tokenRes.data.data.verificationToken },
                });

                toast.info("Email already verified. Continue registration.");
                return;
            }

            /* OTP already sent recently */
            if (verificationData?.otpGeneratedTime) {
                const otpTime = new Date(
                    verificationData.otpGeneratedTime
                ).getTime();
                const diff =
                    60 - Math.floor((Date.now() - otpTime) / 1000);

                if (diff > 0) {
                    toast.info("OTP already sent. Please wait.");
                    setResendTimer(diff);
                    setStartResendTimer(true);
                    setShowOtpInput(true);
                    setEmailLocked(true);
                    return;
                }
            }

            /* Send OTP */
            await axios.post("http://localhost:8080/auth/sendOtp", { email });

            toast.success("OTP sent successfully");
            setResendTimer(60);
            setStartResendTimer(true);
            setShowOtpInput(true);
            setEmailLocked(true);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/auth/verifyEmail",
                { email, otp: otp.join("") }
            );

            const { isVerified, verificationToken } = res.data.data;

            if (isVerified) {
                navigate("/register", {
                    state: { verificationToken },
                });
                toast.success("Email verified successfully");
            } else {
                toast.error("Incorrect OTP");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleChangeEmail = () => {
        setEmailLocked(false);
        setShowOtpInput(false);
        setResendTimer(0);
        setStartResendTimer(false);
        setOtp(Array(OTPLENGTH).fill(""));
    };


    return (
        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>
            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Verify your email to register at <span className='font-bold'>MEDI VAULT</span></p>

            {/* email and otp inputs */}
            <div className='w-[70%] flex flex-col items-center-safe'>
                <Input type="email" label="Email" name="email" style="mb-6 " value={email} onChange={handleEmailChange} errorMessage={errorMessages.email} readOnly={emailLocked} >
                    {showOtpInput && <button className="absolute top-0 right-1 text-slate-700 text-[11px] underline font-medium decoration-1 cursor-pointer hover:font-bold p-0.5 tracking-wide" onClick={handleChangeEmail}>change?</button>}
                </Input>
                {showOtpInput && <OtpInput otp={otp} setOtp={setOtp} />}
                {
                    showOtpInput ? <div className="flex justify-end-safe w-full">
                        <button className="btn rounded-md px-2 py-1 cursor-pointer text-sm mb-7 mr-5" disabled={resendTimer != 0} onClick={handleSendOtp} >
                            <span>resend </span>{resendTimer != 0 && <span>({resendTimer})</span>}
                        </button>
                        <button className="btn rounded-md px-2 py-1 cursor-pointer text-sm mb-7" onClick={handleVerifyOtp} >
                            verify
                        </button>
                    </div> : <button className="btn rounded-md p-1 cursor-pointer text-sm w-full mb-7" onClick={handleSendOtp} >
                        send otp
                    </button>
                }
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
        </div>
    )
}

export default VerifyEmail