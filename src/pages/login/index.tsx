import { Link } from 'react-router-dom';
import HomeButton from '../../components/button';
import HomeInput from '../../components/input';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#F8FAFB]'>
      <h1 className='text-2xl font-bold text-gray-800'>Admin Login</h1>
      <div className='my-4 w-[90%] md:w-[30%]'>
        <HomeInput type={'password'} placeholder={'Enter admin password'} />
      </div>

      <div className='mt-2 w-[90%] md:w-[30%]'>
        <Link to='/dashboard'>
          <HomeButton
            title={'Login'}
            type={'submit'}
            bg={'#3c1414'}
            width={'100%'}
          />{' '}
        </Link>
      </div>
    </div>
  );
};

export default Login;
