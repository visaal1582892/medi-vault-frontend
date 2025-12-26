import Input from "./Input"

const Login = () => {

    return (
        <div className='flex flex-col justify-start items-center-safe h-[70vh] border-2 border-slate-500 w-[35%] rounded-lg max-w-[90%] hovering-effect bg-slate-100'>
            <p className='font-medium animate-pulse m-8'>Login to Access Your <span className='font-bold'>MEDI VAULT</span></p>
            <Input type="text" label="Email" />
            <Input type="password" label="Password" />
        </div>
    )
}

export default Login