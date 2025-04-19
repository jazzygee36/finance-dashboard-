import { useEffect, useRef, useState } from 'react';
import HomeButton from '../../components/button';
import MainDashboard from '../../components/dashboard';
import { useNavigate } from 'react-router-dom';

const UsersDetails = [
  {
    id: 1,
    name: 'Sainty Gray',
    username: 'Sainty@005',
    dob: '01-06-1966',
    gender: 'Male',
    occup: 'artisan',
    address: '2002 Shoreline Dr, 94501, Alameda , CA ',
    email: 'saintgray193@gmail.com',
    pwd: 'Huntman@@## ',
    otp: 'Nul',
    pin: '1111',
    Tac: '6375362',
    DWTC: ' 43636525',
    TXC: ' 2425566',
    acctType: 'Current Account',
    acctNumber: '  003994415280',
    currentBalance: ' 700000',
  },
  {
    id: 2,
    name: 'Dennis Gianneschi',
    username: 'Sainty@007',
    dob: '01-06-1966',
    gender: 'Male',
    occup: 'Programmer',
    address: '2002 Shoreline Dr, 94501, Alameda , CA ',
    email: 'saintgray193@gmail.com',
    pwd: 'Huntman@@## ',
    otp: 'Nul',
    pin: '1111',
    Tac: '6375362',
    DWTC: ' 43636525',
    TXC: ' 2425566',
    acctType: 'Current Account',
    acctNumber: '  003994415280',
    currentBalance: ' 700000',
  },
  {
    id: 3,
    name: 'Leslie Ferguson',
    username: 'Sainty@003',
    dob: '09-06-1970',
    gender: 'female',
    occup: 'Dealer',
    address: '1002 Shoreline Dr, 94501, Alameda , CA ',
    email: 'saintgray193@gmail.com',
    pwd: 'Huntman@@## ',
    otp: 'Nul',
    pin: '1111',
    Tac: '6375362',
    DWTC: ' 43636525',
    TXC: ' 2425566',
    acctType: 'Current Account',
    acctNumber: '  003994415280',
    currentBalance: ' 700000',
  },
  {
    id: 4,
    name: 'Leon Edelmira',
    username: 'Sainty@009',
    dob: '01-06-1966',
    gender: 'Male',
    occup: 'artisan',
    address: '2002 Shoreline Dr, 94501, Alameda , CA ',
    email: 'saintgray193@gmail.com',
    pwd: 'Huntman@@## ',
    otp: 'Nul',
    pin: '1111',
    Tac: '6375362',
    DWTC: ' 43636525',
    TXC: ' 2425566',
    acctType: 'Current Account',
    acctNumber: '  003994415280',
    currentBalance: ' 700000',
  },
];

const UserRow = ({
  user,
  onEdit,
  onDelete,
}: {
  user: (typeof UsersDetails)[number];
  onEdit: (user: (typeof UsersDetails)[number]) => void;
  onDelete: (user: (typeof UsersDetails)[number]) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLTableDataCellElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <tr className='border-b border-gray-200 relative'>
      <td className='p-2'>{user.id}</td>
      <td className='p-2'>{user.name}</td>
      <td className='p-2'>{user.username}</td>
      <td className='p-2 text-blue-600 cursor-pointer relative' ref={menuRef}>
        <span onClick={() => setIsMenuOpen(!isMenuOpen)}>View</span>
        {isMenuOpen && (
          <div className='absolute top-8 right-0 bg-white border border-gray-200 shadow-md rounded-md z-10 w-32'>
            <ul className='text-sm'>
              <li
                onClick={() => onEdit(user)}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              >
                Edit
              </li>
              <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                Statement
              </li>
              <li
                onClick={() => onDelete(user)}
                className='px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer'
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
};

const DeleteModal = ({
  onConfirm,
  onCancel,
  user,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  user: (typeof UsersDetails)[number] | null;
}) => {
  if (!user) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center  bg-black/50 bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md'>
        <h2 className='text-lg font-semibold mb-4'>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete <strong>{user.name}</strong>?
        </p>
        <div className='mt-6 flex justify-end gap-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [, setSelectedUserForEdit] = useState<number | null>(null);
  const [userToDelete, setUserToDelete] = useState<
    (typeof UsersDetails)[number] | null
  >(null);
  const [, setUsers] = useState(UsersDetails); // Make a mutable list of users

  const handleDelete = (user: (typeof UsersDetails)[number]) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  const handleEditForm = (item: any) => {
    setSelectedUserForEdit(item);
    navigate('/editform', { state: { user: item } });
  };
  function onDelete(user: (typeof UsersDetails)[number]): void {
    handleDelete(user);
  }

  return (
    <MainDashboard title={'Dashboard'}>
      <div className='mt-4 w-full'>
        {/* Table for medium+ screens */}
        <div className='hidden md:block overflow-x-auto rounded-lg'>
          <table className='min-w-[600px] w-full'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='p-2 font-medium text-left'>S/N</th>
                <th className='p-2 font-medium text-left'>Name</th>
                <th className='p-2 font-medium text-left'>Username</th>
                <th className='p-2 font-medium text-left'>More</th>
              </tr>
            </thead>
            <tbody>
              {UsersDetails.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={handleEditForm}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for mobile screens */}
        <div className='md:hidden flex flex-col gap-4'>
          {UsersDetails.map((item, index) => (
            <div
              key={index}
              className='border border-gray-200 rounded-lg p-4 shadow-sm bg-white'
            >
              <div className='flex items-center justify-between'>
                <h4>Name</h4>
                <h4 className='font-semibold text-gray-800'>{item.name}</h4>
              </div>
              <div className='flex items-center justify-between my-4'>
                <h4>Username</h4>
                <h4 className='font-semibold text-gray-800'>{item.username}</h4>
              </div>

              <div className='flex flex-col items-center justify-between gap-2 mt-4'>
                <HomeButton
                  title='Edit Account '
                  type='submit'
                  bg='gray'
                  width='100%'
                  onClick={() => handleEditForm(item)}
                />
                <HomeButton
                  title=' Account Statement'
                  type='submit'
                  bg='blue'
                  width='100%'
                />
                <HomeButton
                  title='Delete '
                  type='submit'
                  bg='red'
                  width='100%'
                  onClick={() => onDelete(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeleteModal
        user={userToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </MainDashboard>
  );
};

export default HomePage;
