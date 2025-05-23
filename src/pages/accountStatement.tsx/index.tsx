import { useEffect, useState } from 'react';

import HomeInput from '../../components/input';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../../components/button';
import SelectInput from '../../components/selectInput';
import Toast from '../../components/toast';

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

interface Statement {
  updatedAt: string;
  id: string;
  beneficiary: string;
  senderAcctNumber: string;
  senderBank: string;
  acctType: string;
  amount: string;
  status: string;
  date: string;
  receipt: string;
  type: string;
}
const statusOptions = [
  { value: '', label: 'Select' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Pending', label: 'Pending' },
];

const typeOptions = [
  { value: '', label: 'Select' },
  { value: 'CREDIT', label: 'CR' },
  { value: 'DEBIT', label: 'DB' },
];

const EditAccountStatement = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [formData, setFormData] = useState(initialFormState);

  const [showEdit] = useState(true);

  const [allStatements, setAllStatements] = useState<Statement[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'error' | 'info';
  } | null>(null);
  const showToast = (message: string, type?: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addNewStatement = () => {
    const newStatement: Statement = {
      id: `${Date.now()}`,
      updatedAt: new Date().toISOString(),
      beneficiary: '',
      senderAcctNumber: '',
      senderBank: '',
      acctType: '',
      amount: '',
      status: '',
      date: '',
      receipt: '',
      type: '',
    };

    setAllStatements((prev) => [...prev, newStatement]);
  };

  const handleUpdateStatements = async () => {
    if (!user || !user._id) {
      showToast('User not found', 'error');
      return;
    }

    setActionLoading(true);
    try {
      for (const statement of allStatements) {
        // const { id, updatedAt, ...cleanedStatement } = statement;
        const { id, ...cleanedStatement } = statement;
        const statementWithUser = { ...cleanedStatement, userId: user._id }; // attach userId

        if (id.length < 24) {
          // POST to create new statement
          const userId = user._id;
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/user/${userId}/create-statement`,
            statementWithUser
          );
        } else {
          // PATCH to update existing statement
          await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/user/update-statement/${id}`,
            statementWithUser
          );
        }
      }

      showToast(`All statements updated successfully`, 'success');
    } catch (error) {
      console.error('Error updating statements:', error);
      showToast('Failed to update statements', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteStatement = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/user/delete-statement/${id}`
      );
      setAllStatements((prev) => prev.filter((s) => s.id !== id));
      showToast('Statement deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting statement:', error);
      showToast('Failed to delete statement', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const handleAllStatements = async () => {
      const userId = user._id;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/${userId}/statements`
        );
        setAllStatements(
          res.data.map((s: any) => ({
            ...s,
            id: s._id, // make sure `id` exists
            updatedAt: new Date(s.updatedAt).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error('Error fetching statements:', error);
      } finally {
        setLoading(false);
      }
    };
    handleAllStatements();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({ ...initialFormState, ...user });
    }
  }, [user]);

  const handleStatementChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setAllStatements((prevStatements) =>
      prevStatements.map((statement, i) =>
        i === index ? { ...statement, [name]: value } : statement
      )
    );
  };

  return (
    <div className='p-4 md:p-6'>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Accordion for Existing Statement */}
      <div className='mb-6'>
        {showEdit && (
          <div className='border border-gray-300 p-4 mt-2 rounded-md'>
            <h2 className='text-center font-bold mb-4'>EDIT STATEMENTS</h2>

            {loading ? (
              <p className='text-center py-4'>Loading statements...</p>
            ) : allStatements.length === 0 ? (
              <p className='text-center py-4'>No statements available.</p>
            ) : (
              allStatements.map((statement, index) => (
                <div
                  key={index}
                  className='mb-8 border border-gray-200 p-4 rounded-lg shadow-sm'
                >
                  <h3 className='font-semibold text-md mb-4 text-[blue]'>
                    Statement {index + 1}
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <HomeInput
                      type='text'
                      label='Username'
                      name='username'
                      value={formData.username}
                      readOnly
                      placeholder=''
                    />
                    <HomeInput
                      type='text'
                      label='Beneficiary'
                      name={`beneficiary`}
                      value={statement.beneficiary}
                      placeholder=''
                      onChange={(e: any) => handleStatementChange(e, index)}
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-5'>
                    <HomeInput
                      type='text'
                      label='Account No.'
                      name={`senderAcctNumber`}
                      value={statement.senderAcctNumber}
                      placeholder=''
                      onChange={(e: any) => handleStatementChange(e, index)}
                    />
                    <HomeInput
                      type='text'
                      label='Bank'
                      name={`senderBank`}
                      value={statement.senderBank}
                      placeholder=''
                      onChange={(e: any) => handleStatementChange(e, index)}
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <HomeInput
                      type='text'
                      label='Amount'
                      name={`amount`}
                      value={statement.amount}
                      placeholder=''
                      onChange={(e: any) => handleStatementChange(e, index)}
                    />
                    <HomeInput
                      type='text'
                      label='Date'
                      name={`date`}
                      value={formatDateForInput(statement.date)}
                      placeholder=''
                      onChange={(e: any) => handleStatementChange(e, index)}
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 my-5 gap-6'>
                    <SelectInput
                      label='Type'
                      name={`type`}
                      value={statement.type}
                      onChange={(e: any) => handleStatementChange(e, index)}
                      option={typeOptions}
                    />

                    <SelectInput
                      label='Status'
                      name={`status`}
                      value={statement.status}
                      onChange={(e: any) => handleStatementChange(e, index)}
                      option={statusOptions}
                    />
                  </div>
                  <div className='mt-4 flex justify-center mb-5'>
                    <HomeButton
                      title={
                        deletingId === statement.id
                          ? 'Deleting...'
                          : 'Delete Statement'
                      }
                      type='submit'
                      bg='red'
                      width={''}
                      onClick={() => handleDeleteStatement(statement.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className='mt-4 flex justify-center mb-5'>
        <HomeButton
          title={actionLoading ? 'Updating...' : 'Update'}
          type='submit'
          bg='#3c1414'
          width={''}
          onClick={handleUpdateStatements}
        />
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
