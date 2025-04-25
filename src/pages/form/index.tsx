import { useEffect, useState } from 'react';
import HomeButton from '../../components/button';
import HomeInput from '../../components/input';
import SelectInput from '../../components/selectInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { Currencies } from '../../utils/currency';
import axios from 'axios';
import Modal from '../../components/modal';
import Toast from '../../components/toast';

const EditForm = () => {
  const location = useLocation();
  const user = location.state?.user;
  const userId = user?._id;
  const [, setEditprofile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const settingsOptions = [
    { value: '', label: '0' },
    { value: 'ON', label: 'ON' },
    { value: 'OFF', label: 'OFF' },
  ];
  const statusOptions = [
    { value: '', label: 'Select status' },
    { value: 'Active', label: 'Active' },
    { value: 'In-Active', label: 'In-Active' },
    { value: 'Dormant', label: 'Dormant' },
  ];

  const errorOptions = [
    { value: '', label: '0' },
    { value: 'OFF', label: 'OFF' },
    { value: 'Tac-error', label: 'TAC-Error' },
    { value: 'DWTC-error', label: 'DWTC-Error' },
    { value: 'Tax-error', label: 'Tax-Error' },
  ];

  const fundStatusOptions = [{ value: 'Completed', label: 'Completed' }];
  const maritalStatusOptions = [
    { value: 'Null', label: 'Null' },
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' },
  ];

  const [fundAcctForm, setFundAcctForm] = useState({
    beneficiary: '',
    senderAcctNumber: '',
    senderBank: '',
    amount: '',
    status: '',
  });

  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'error' | 'info';
  } | null>(null);
  const showToast = (message: string, type?: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dob: '',
    gender: '',
    occupation: '',
    address: '',
    password: '',
    otp: '',
    acctPin: '',
    tacCode: '',
    dwtcCode: '',
    txcCode: '',
    acctType: '',
    acctNumber: '',
    currentBallance: '',
    phoneNumber: '',
    country: '',
    state: '',
    isActive: '',
    currency: '',
    alertSettings: '',
    errorSettings: '',
    maritalStatus: '',

    // Add other fields as needed
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        dob: user.dob || '',
        password: user.password || '',
        address: user.address || '',
        gender: user.gender || '',
        occupation: user.occupation || '',
        otp: user.otp || '',
        acctPin: user.acctPin || '',
        tacCode: user.tacCode || '',
        dwtcCode: user.dwtcCode || '',
        txcCode: user.txcCode || '',
        acctType: user.acctType || '',
        acctNumber: user.acctNumber || '',
        currentBallance: user.currentBallance || '',
        phoneNumber: user.phoneNumber || '',
        country: user.country || '',
        state: user.state || '',
        isActive: user.isActive || '',
        currency: user.currency || '',
        alertSettings: user.alertSettings || '',
        errorSettings: user.errorSettings || '',
        maritalStatus: user.maritalStatus || '',
      }));
    }
  }, [user]);

  const formattedDOB = formData.dob
    ? new Date(formData.dob).toISOString().split('T')[0]
    : '';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFundChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFundAcctForm({ ...fundAcctForm, [e.target.name]: e.target.value });
  };
  const handleUpdateAccount = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/user/update-user/${userId}`,
        formData
      );
      setEditprofile(res.data.message);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFundAccount = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/create-statement`,
        fundAcctForm
      );

      setFundAcctForm({
        beneficiary: '',
        senderAcctNumber: '',
        senderBank: '',
        amount: '',
        status: '',
      });
      setIsOpen(false);

      showToast(`Account Funded`, 'success');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
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
                // name='name'
                value={`${formData.firstName} ${formData.lastName}`.trim()}
                onChange={handleChange}
                readOnly
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
                  value={formattedDOB}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 items-center gap-7 mt-7 mb-5 w-full '>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
            <div className='w-[100%]'>
              <SelectInput
                option={genderOptions}
                name='gender'
                label='Gender'
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
            <div className='w-[100%]'>
              <SelectInput
                option={maritalStatusOptions}
                name='maritalStatus'
                label='Marital Status'
                value={formData.maritalStatus}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7 mb-7  w-full'>
          <div className='  flex items-center gap-1 md:gap-10 w-[100%] '>
            <div className='w-[100%]'>
              <HomeInput
                type={'text'}
                placeholder={''}
                label='Country'
                name='country'
                value={formData.country}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>

          <div className='w-full'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='State'
              name='state'
              value={formData.state}
              onChange={handleChange}
              readOnly={true}
            />
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
                value={formData.occupation}
                onChange={handleChange}
                readOnly
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
                readOnly
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7 my-7  w-full'>
          <div className='  flex items-center gap-1 md:gap-10 w-[100%] '>
            <div className='w-[100%]'>
              <HomeInput
                type={'text'}
                placeholder={''}
                label='Mobile tel'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                readOnly
              />
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
                name='password'
                value={formData.password}
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
                name='acctPin'
                value={formData.acctPin}
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
                name='tacCode'
                value={formData.tacCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
            <div className='w-[100%]'>
              <HomeInput
                type={'text'}
                placeholder={''}
                label='Transfer DWTC code'
                name='dwtcCode'
                value={formData.dwtcCode}
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
                name='txcCode'
                value={formData.txcCode}
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
                readOnly
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
                name='currentBallance'
                value={formData.currentBallance}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 items-center gap-7 my-7 w-full '>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
            <div className='w-[100%]'>
              <SelectInput
                option={statusOptions}
                name={'isActive'}
                label='Account Status'
                value={formData.isActive}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
            <div className='w-[100%]'>
              <SelectInput
                option={settingsOptions}
                name={'alertSettings'}
                label='Alert Settings'
                value={formData.alertSettings}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 items-center gap-7 my-7 w-full '>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
            <div className='w-[100%]'>
              <SelectInput
                option={Currencies.map((currency) => ({
                  value: currency.code,
                  label: currency.name,
                }))}
                name={'currency'}
                label='Currency'
                value={formData.currency}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
            <div className='w-[100%]'>
              <SelectInput
                option={errorOptions}
                name={'errorSettings'}
                label='Error Settings'
                value={formData.errorSettings}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col md:flex-row  gap-4 md:justify-between justify-center items-center md:w-[30%] my-4'>
          <HomeButton
            title={isLoading ? 'Processing...' : 'Update changes'}
            type={'submit'}
            bg={'#3c1414'}
            width={'100%'}
            onClick={handleUpdateAccount}
          />
          <HomeButton
            title={isLoading ? 'Processing...' : 'Fund Account'}
            type={'submit'}
            bg={'blue'}
            width={'100%'}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1 className='text-center font-bold mb-2'>Sender Details</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7  w-full '>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
            <div className='w-[100%]'>
              <HomeInput
                type={'text'}
                placeholder={''}
                label='Sender name'
                name='beneficiary'
                value={fundAcctForm.beneficiary}
                onChange={handleFundChange}
              />
            </div>
          </div>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
            <div className='w-[100%]'>
              <HomeInput
                type={'text'}
                placeholder={''}
                label='Sender account number'
                name='senderAcctNumber'
                value={fundAcctForm.senderAcctNumber}
                onChange={handleFundChange}
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
                label='Sender bank'
                name='senderBank'
                value={fundAcctForm.senderBank}
                onChange={handleFundChange}
              />
            </div>
          </div>
          <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
            <div className='w-[100%]'>
              <HomeInput
                type={'text'}
                placeholder={''}
                label='Amount'
                name='amount'
                value={fundAcctForm.amount}
                onChange={handleFundChange}
              />
            </div>
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <SelectInput
              option={fundStatusOptions}
              name={'status'}
              label='Status'
              value={fundAcctForm.status}
              onChange={handleFundChange}
            />
          </div>
        </div>
        <div className='w-full flex flex-col   gap-4  justify-center items-center md:w-[30%] my-4'>
          <HomeButton
            title={isLoading ? 'Processing...' : 'Fund '}
            type={'submit'}
            bg={'blue'}
            width={'100%'}
            onClick={handleFundAccount}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditForm;
