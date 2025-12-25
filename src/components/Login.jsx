import { Mail } from 'lucide-react';

const Login = () => {
    return (
        <div className='flex flex-col justify-center-safe items-center-safe w-[50vw] h-dvh'>
            <div className='flex'>
                <Mail />
                <input type="text" className='text-input' />
            </div>
        </div>
    )
}

export default Login