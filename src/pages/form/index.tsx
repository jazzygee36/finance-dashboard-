import { useEffect, useState } from 'react';
import HomeButton from '../../components/button';
import HomeInput from '../../components/input';
import SelectInput from '../../components/selectInput';
import { useLocation } from 'react-router-dom';

const EditForm = () => {
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
        ADMIN SETTINGS
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7 w-full '>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-full'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Names'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
            <div className='w-[100%]'>
              <HomeInput
                type={'text'}
                placeholder={''}
                label='Date of Birth'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 items-center gap-7 my-7 w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <SelectInput option={[]} name={''} label='Gender' />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <SelectInput option={[]} name={''} label='Marital status' />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7  items-center  w-full'>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Occupation'
              name='occup'
              value={formData.occup}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Address'
              name='address'
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7 my-7  w-full'>
        <div className='  flex items-center gap-1 md:gap-10 w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} label='Mobile tel' />
          </div>
        </div>

        <div className='w-full'>
          <HomeInput
            type={'text'}
            placeholder={''}
            label='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            readOnly={true}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7  w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
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
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Password'
              name='pwd'
              value={formData.pwd}
              onChange={handleChange}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7  w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Login OTP'
              readOnly={true}
              name='otp'
              value={formData.otp}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Online Pin'
              name='pin'
              value={formData.pin}
              onChange={handleChange}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7  w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Transfer TAC code'
              name='Tac'
              value={formData.Tac}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Transfer DWTC code
'
              name='DWTC'
              value={formData.DWTC}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7  w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Transfer TXC code'
              name='TXC'
              value={formData.TXC}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Account Type'
              name='acctType'
              value={formData.acctType}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7  w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Account No.'
              name='acctNumber'
              value={formData.acctNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Current Balance'
              name='currentBalance'
              value={formData.currentBalance}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 items-center gap-7 my-7 w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <SelectInput option={[]} name={''} label='Account Status' />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <SelectInput option={[]} name={''} label='Alert Settings' />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 items-center gap-7 my-7 w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <SelectInput option={[]} name={''} label='Currency' />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <SelectInput option={[]} name={''} label='Error Settings' />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col m-auto justify-center items-center md:w-[30%] my-4'>
        <HomeButton
          title={'Update Changes'}
          type={'submit'}
          bg={'#3c1414'}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default EditForm;
