import Image from 'next/image';
import Logo from '@/assets/UC-logo.svg';

export default function Home() {
  return (
    <div className='bg-slate-950 text-white'>
      <div className='flex gap-4 justify-center'>
        <Image src={Logo} alt='United Cloud logo' />
        <h1 className='text-4xl text-center py-10'>
          United Cloud Movie Database
        </h1>
      </div>
      <p>MOVIE GRID</p>
    </div>
  );
}
