import { useEffect, useRef, useState } from 'react';
import HomeButton from '../../components/button';
import MainDashboard from '../../components/dashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// UserRow component
const UserRow = ({
  user,
  onEdit,
  onDelete,
  onEditStatement,
}: {
  user: any;
  onEdit: (user: any) => void;
  onEditStatement: (user: any) => void;
  onDelete: (user: any) => void;
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
      <td className='p-2'>
        {user.firstName} {user.lastName}
      </td>
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
              <li
                onClick={() => onEditStatement(user)}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              >
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

// Delete Modal
const DeleteModal = ({
  onConfirm,
  onCancel,
  user,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  user: any | null;
}) => {
  if (!user) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md'>
        <h2 className='text-lg font-semibold mb-4'>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete <strong>{user.username}</strong>?
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

// HomePage
const HomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // ✅ Start loading
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/all-users`
        );
        const normalizedUsers = res.data.map((user: any) => ({
          ...user,
          id: user._id,
        }));
        setUsers(normalizedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // ✅ End loading
      }
    };

    fetchUsers();
  }, []);

  const handleEditForm = (user: any) =>
    navigate('/edit-form', { state: { user } });
  const handleEditStatement = (user: any) =>
    navigate('/edit-statement', { state: { user } });
  const handleDelete = (user: any) => setUserToDelete(user);
  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/user/delete-user/${userToDelete.id}`
      );
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const cancelDelete = () => setUserToDelete(null);

  return (
    <MainDashboard title={'Dashboard'}>
      <div className='mt-4 w-full'>
        {loading ? (
          <div className='text-center py-8 text-lg font-medium'>Loading...</div> // ✅ Loading UI
        ) : (
          <>
            {/* Desktop Table */}
            <div className='hidden md:block overflow-x-auto rounded-lg'>
              <table className='min-w-[600px] w-full'>
                <thead className='bg-gray-200'>
                  <tr>
                    <th className='p-2 font-medium text-left'>S/N</th>
                    <th className='p-2 font-medium text-left'>Name</th>
                    <th className='p-2 font-medium text-left'>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onEdit={handleEditForm}
                      onEditStatement={handleEditStatement}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className='md:hidden flex flex-col gap-4'>
              {users.map((user, index) => (
                <div
                  key={index}
                  className='border border-gray-200 rounded-lg p-4 shadow-sm bg-white'
                >
                  <div className='flex items-center justify-between'>
                    <h4>Name</h4>
                    <h4 className='font-semibold text-gray-800'>
                      {user.firstName} {user.lastName}
                    </h4>
                  </div>
                  <div className='flex items-center justify-between my-4'>
                    <h4>Username</h4>
                    <h4 className='font-semibold text-gray-800'>
                      {user.username}
                    </h4>
                  </div>
                  <div className='flex flex-col items-center justify-between gap-2 mt-4'>
                    <HomeButton
                      title='Edit Account'
                      type='submit'
                      bg='gray'
                      width='100%'
                      onClick={() => handleEditForm(user)}
                    />
                    <HomeButton
                      title='Account Statement'
                      type='submit'
                      bg='blue'
                      width='100%'
                      onClick={() => handleEditStatement(user)}
                    />
                    <HomeButton
                      title='Delete'
                      type='submit'
                      bg='red'
                      width='100%'
                      onClick={() => handleDelete(user)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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
