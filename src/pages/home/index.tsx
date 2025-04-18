import { useEffect, useRef, useState } from 'react';
import HomeButton from '../../components/button';
import MainDashboard from '../../components/dashboard';

const UsersDetails = [
  { id: 1, name: 'Sainty Gray', username: 'Sainty@005' },
  { id: 2, name: 'Dennis Gianneschi', username: 'Sainty@007' },
  { id: 3, name: 'Leslie Ferguson', username: 'Sainty@003' },
  { id: 4, name: 'Leon Edelmira', username: 'Sainty@009' },
];

const UserRow = ({
  user,
}: {
  user: { id: number; name: string; username: string };
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
              <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                Edit
              </li>
              <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                Statement
              </li>
              <li className='px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer'>
                Delete
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
};

const HomePage = () => {
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
                <UserRow key={user.id} user={user} />
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

              <div className='flex items-center justify-between gap-[1px] mt-4'>
                <HomeButton title='Edit ' type='submit' bg='gray' width='' />
                <HomeButton
                  title=' Statement'
                  type='submit'
                  bg='blue'
                  width=''
                />
                <HomeButton title='Delete ' type='submit' bg='red' width='' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainDashboard>
  );
};

export default HomePage;
