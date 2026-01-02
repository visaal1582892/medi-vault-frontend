import { useSearchParams, Outlet } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

const Home = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  return (
    <div className='flex flex-col justify-center-safe items-center-safe bg-slate-100 p-5 min-h-dvh'>
      <h1 className='text-5xl text-slate-800 font-bold decoration-slate-700 m-8'>MEDI VAULT</h1>
      <Outlet />
    </div>
  )
}

export default Home