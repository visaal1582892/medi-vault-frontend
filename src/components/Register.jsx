import Input from "./Input"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { validateRegisterData } from "../utils/validator";

const Register = () => {

    const { state } = useLocation();
    const verificationToken = state?.verificationToken;
    const [registerData, setRegisterData] = useState({
        verifiedEmail: "",
        username: "",
        password: "",
        confirm_password: ""
    });
    const verifiedEmailRef = useRef(null);
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({
        verifiedEmail: "",
        username: "",
        password: "",
        confirm_password: ""
    });

    const validateVerificationToken = () => {
        verifiedEmailRef.current.disabled = true;
        if (!verificationToken) {
            navigate("/verifyEmail");
            return;
        }
        axios.post("http://localhost:8080/auth/validateVerificationToken", null, {
            headers: {
                Authorization: `JWT ${verificationToken}`
            }
        })
            .then((result) => setRegisterData(prev => ({ ...prev, verifiedEmail: result.data.data.email })))
            .catch((err) => {
                toast.error(`Registration session expired`);
                navigate("/verifyEmail");
            });
    }

    useEffect(() => {
        validateVerificationToken();

    }, [verificationToken])

    const handleInputChange = (event, name) => {
        setRegisterData(prev => ({
            ...prev,
            [name]: event.target.value
        }));
    }

    const handleRegister = async () => {
        const errors = validateRegisterData(registerData);
        setFieldErrors(errors);
        const userResponse = await axios.get(`http://localhost:8080/auth/getUserDetails/${email}`);
        const existingUserData = userResponse.data.data;
        if (existingUserData) {
            toast.info("User already registered");
            return navigate("/");
        }
        if (!Object.values(errors).every(err => err == "")) return toast.error("Enter valid data");
        try {
            const { data } = await axios.post("http://localhost:8080/auth/register", registerData, {
                headers: {
                    Authorization: `JWT ${verificationToken}`
                }
            });
            toast.success(data.message);
            navigate("/");
        } catch (err) {
            console.log(err);
            toast.error(`User registration failed, ${err.response.data.message}`);
        }
    }

    return (
        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>

            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Register here to start your <span className='font-bold'>MEDI VAULT</span></p>

            {/* Register with credentials */}
            <div className='w-[70%] flex flex-col items-center-safe'>
                <Input type="email" label="Email" style="mb-6" value={registerData?.verifiedEmail || ""} ref={verifiedEmailRef} readOnly={true} />

                <Input type="text" label="Username" name="username" style={`mb-6`} onChange={(event) => handleInputChange(event, "username")} value={registerData.username} errorMessage={fieldErrors.username} />

                <Input type="password" label="Password" name="password" style={`pr-10 mb-6`} onChange={(event) => handleInputChange(event, "password")} value={registerData.password} errorMessage={fieldErrors.password} />

                <Input type="password" label="Confirm Password" name="confirm_password" style={`pr-10 mb-6`} onChange={(event) => handleInputChange(event, "confirm_password")} value={registerData.confirm_password} errorMessage={fieldErrors.confirm_password} />

                <button className="btn w-full mb-4 text-sm rounded-md p-1.5" onClick={handleRegister}>Register</button>
            </div>

            <p className="text-xs mb-5">Already have an account? <Link to="/" className="underline decoration-1 font-semibold hover:text-slate-600">Login</Link></p>
        </div>
    )
}

export default Register