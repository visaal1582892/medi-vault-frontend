import Input from "./Input"

const VerifyEmail = () => {
    return (
        <div className='flex flex-col justify-start items-center-safe w-[35%] rounded-lg min-w-90 hovering-effect bg-slate-200'>
            {/* Quote */}
            <p className='font-medium animate-pulse m-5'>Verify your email to register at <span className='font-bold'>MEDI VAULT</span></p>

            {/* email and otp inputs */}
            <div className='w-[70%] flex flex-col items-center-safe'>
                <Input type="email" label="Email" style="mb-5" />
                <button className="btn rounded-md p-1 cursor-pointer text-sm w-full mb-7" >
                    send otp
                </button>
            </div>
        </div>
    )
}

export default VerifyEmail