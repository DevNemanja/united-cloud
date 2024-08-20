import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';

interface ButtonProps {
  active: boolean;
}

export default function Button({ active }: ButtonProps) {
  return (
    <div className='z-20 bg-slate-400 bg-opacity-70 p-4 rounded-full'>
      {active ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
}
