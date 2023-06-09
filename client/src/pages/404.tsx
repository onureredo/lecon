import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faBackward, faPersonDigging } from '@fortawesome/free-solid-svg-icons';

const Custom404 = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen overflow-hidden'>
        <Image
          className='object-cover'
          src={'https://i.ibb.co/QCbrWH1/leconnn.png'}
          draggable={false}
          height={40}
          width={200}
          alt='letscon logo'
        />
        <h2 className='text-3xl max-sm:text-2xl font-bold text-center text-white mt-4'>
          404 NOT FOUND
        </h2>
        <p className='text-lg max-sm:text-sm text-white font-semibold mt-2'>
          or under construction
        </p>
        <FontAwesomeIcon
          icon={faPersonDigging}
          className='text-white my-4'
          size='2xl'
        />
        <button className='text-lg text-white bg-night-shadz py-2 px-4 rounded-full font-bold mt-4 hover:opacity-80 transition-opacity'>
          <Link href='/'>
            <FontAwesomeIcon icon={faBackward} />
          </Link>
        </button>
      </div>
    </>
  );
};

export default Custom404;
