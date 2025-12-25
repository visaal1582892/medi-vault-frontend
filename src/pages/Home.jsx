import { useSearchParams } from 'react-router-dom';
import Login from '../components/Login';

const Home = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  return (
    <div className='flex'>
      <div className='bg-beige w-[50vw] h-dvh text-center flex flex-col items-center-safe justify-center-safe text-7xl font-bold'>
        <figure className='w-[70%]'>
          <img src="/images/image.png" alt="mediVaultImage" className='w-full' />
        </figure>
        {/* <p className='w-full tracking-widest text-emerald-400'>
          MEDI
        </p>
        <p className='w-full tracking-widest text-orange-400'>
          VAULT
        </p> */}
      </div>
      {mode=="register"?<Regsiter />:<Login />}
    </div>
  )
}

export default Home