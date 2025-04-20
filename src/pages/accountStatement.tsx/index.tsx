import { useEffect, useState } from 'react';
import HomeButton from '../../components/button';
import HomeInput from '../../components/input';
import SelectInput from '../../components/selectInput';
import { useLocation } from 'react-router-dom';

const EditAccountStatement = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    dob: '',
    gender: '',
    occup: '',
    address: '',
    pwd: '',
    otp: '',
    pin: '',
    Tac: '',
    DWTC: '',
    TXC: '',
    acctType: '',
    acctNumber: '',
    currentBalance: '',
    // Add other fields as needed
  });
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        dob: user.dob || '',
        pwd: user.pwd || '',
        address: user.address || '',
        gender: user.gender || '',
        occup: user.occup || '',
        otp: user.otp || '',
        pin: user.pin || '',
        Tac: user.Tac || '',
        DWTC: user.DWTC || '',
        TXC: user.TXC || '',
        acctType: user.acctType || '',
        acctNumber: user.acctNumber || '',
        currentBalance: user.currentBalance || '',
        // Map other fields accordingly
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='p-4 md:p-6'>
      <h1 className='font-bold my-8  block text-center text-gray-900'>
        EDIT STATEMENT
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7 w-full '>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-full'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              readOnly={true}
            />
          </div>
        </div>
        {/* <div className='   flex items-center gap-1 md:gap-10 w-[100%]'> */}
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Beneficiary'
              name='beneficiary'
              // value={formData.dob}
              // onChange={handleChange}
            />
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7  items-center  mt-7 w-full'>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%] '>
          <div className='w-[100%]'>
            <div className='w-[100%]'>
              <HomeInput
                type={'text'}
                placeholder={''}
                label='Account No.'
                //   name='acctNumber'
                //   value={formData.acctNumber}
                //   onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Bank'
              name='bank'
              //   value={formData.address}
              //   onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7 my-7  w-full'>
        <div className='  flex items-center gap-1 md:gap-10 w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} label='Amount' />
          </div>
        </div>

        <div className='w-full'>
          <HomeInput
            type={'text'}
            placeholder={''}
            label='Date'
            name='date'
            // value={formData.email}
            // onChange={handleChange}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7  w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Type'
              name='type'
              //   value={formData.username}
              //   onChange={handleChange}
            />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <SelectInput option={[]} name={''} label='Account Status' />
          </div>
        </div>
      </div>

      <div className=' grid grid-cols-1 md:grid-cols-3  md:gap-6  justify-center items-center  my-4'>
        <HomeButton title={'Add'} type={'submit'} bg={'gray'} width={'100%'} />
        <div className='my-5 w-full'>
          <HomeButton
            title={'Update Changes'}
            type={'submit'}
            bg={'#3c1414'}
            width={'100%'}
          />
        </div>

        <HomeButton
          title={'Cancle'}
          type={'submit'}
          bg={'red'}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default EditAccountStatement;
