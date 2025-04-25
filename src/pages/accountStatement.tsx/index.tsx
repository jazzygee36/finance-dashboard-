import { useEffect, useState } from 'react';
import HomeButton from '../../components/button';
import HomeInput from '../../components/input';
import { useLocation } from 'react-router-dom';

const initialFormState = {
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
};

const EditAccountStatement = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [formData, setFormData] = useState(initialFormState);
  const [newStatements, setNewStatements] = useState<
    (typeof initialFormState)[]
  >([]);
  const [showEdit, setShowEdit] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({ ...initialFormState, ...user });
    }
  }, [user]);

  const handleChange = (e: any, index: number | null = null) => {
    const { name, value } = e.target;

    if (index === null) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewStatements((prev) =>
        prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
      );
    }
  };

  const addNewStatement = () => {
    setNewStatements((prev) => [...prev, { ...initialFormState }]);
  };

  const removeStatement = (index: any) => {
    setNewStatements((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='p-4 md:p-6'>
      {/* Accordion for Existing Statement */}
      <div className='mb-6'>
        <button
          onClick={() => setShowEdit((prev) => !prev)}
          className='text-left w-full text-lg font-semibold bg-gray-100 px-4 py-2 rounded-md shadow'
        >
          {showEdit ? 'Hide Existing Statement ▲' : 'Show Existing Statement ▼'}
        </button>

        {showEdit && (
          <div className='border border-gray-300 p-4 mt-2 rounded-md'>
            <h2 className='text-center font-bold mb-4'>EDIT STATEMENT</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <HomeInput
                type='text'
                label='Username'
                // name='username'
                // value={formData.username}
                // onChange={(e) => handleChange(e)}
                placeholder={''}
                readOnly
              />
              <HomeInput
                type='text'
                label='Beneficiary'
                // name='beneficiary'
                // value={formData.acctNumber}
                // onChange={(e) => handleChange(e)}
                placeholder={''}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-7'>
              <HomeInput
                type='text'
                label='Account No.'
                name='acctNumber'
                value={formData.acctNumber}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
              <HomeInput
                type='text'
                label='Bank'
                name='bank'
                value={formData.acctNumber}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-7'>
              <HomeInput
                type='text'
                label='Amount'
                name='amoun'
                value={formData.username}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
              <HomeInput
                type='text'
                label='Date'
                name='date'
                value={formData.acctNumber}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add Statement Button */}

      {/* Dynamic New Statements */}
      {newStatements.map((_statement, index) => (
        <div key={index} className='border border-blue-300 p-4 rounded-md mb-6'>
          <h2 className='text-blue-700 font-bold text-center mb-4'>
            NEW STATEMENT #{index + 1}
          </h2>

          <form action=''>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <HomeInput
                type='text'
                label='Username'
                name='username'
                value={formData.username}
                onChange={(e) => handleChange(e)}
                placeholder={''}
                readOnly
              />
              <HomeInput
                type='text'
                label='Beneficiary'
                name='beneficiary'
                value={formData.acctNumber}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-7'>
              <HomeInput
                type='text'
                label='Account No.'
                name='acctNumber'
                value={formData.acctNumber}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
              <HomeInput
                type='text'
                label='Bank'
                name='bank'
                value={formData.acctNumber}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-7'>
              <HomeInput
                type='text'
                label='Amount'
                name='amount'
                value={formData.username}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
              <HomeInput
                type='text'
                label='Date'
                name='date'
                value={formData.acctNumber}
                onChange={(e) => handleChange(e)}
                placeholder={''}
              />
            </div>
          </form>

          <div className='mt-4 flex gap-4 justify-center'>
            <HomeButton title='Save' type='submit' bg='green' width={''} />
            <HomeButton
              title='Remove'
              type='button'
              bg='red'
              onClick={() => removeStatement(index)}
              width={''}
            />
          </div>
        </div>
      ))}
      <div className='mt-4 flex justify-center mb-5'>
        <HomeButton title='Update' type='submit' bg='#3c1414' width={''} />
      </div>
      <div className='mb-4 flex justify-center'>
        <HomeButton
          title='Add New Statement'
          type='button'
          onClick={addNewStatement}
          bg='gray'
          width={''}
        />
      </div>
    </div>
  );
};

export default EditAccountStatement;
