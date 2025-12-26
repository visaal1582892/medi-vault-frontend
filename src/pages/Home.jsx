import { useSearchParams } from 'react-router-dom';
import Login from '../components/Login';

const Home = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  return (
    <div className='flex flex-col justify-start items-center-safe bg-slate-100 h-dvh'>
      <h1 className='text-5xl text-slate-800 font-bold decoration-slate-700 m-8'>MEDI VAULT</h1>
      {mode=="register"?<Regsiter />:<Login />}
    </div>
  )
}

export default Home