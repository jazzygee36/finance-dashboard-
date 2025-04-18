import { useEffect, useRef, useState } from 'react';

// import Users from '../../assets/svg/user';
import { useNavigate } from 'react-router-dom';
import Users from '../../assets/user';

const Header = ({
  title,
}: {
  title: string;
  setIsOpen: (val: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='border-b border-[#DEE6E2] w-full px-5 py-3 flex items-center justify-between bg-white relative'>
      <div>
        <h3 className='text-[16px] text-[#A74F5D] font-medium hidden md:block'>
          {title}
        </h3>
        <div></div>
      </div>

      {/* Date & User */}
      <div className='flex items-center gap-4 relative' ref={dropdownRef}>
        <h3
          className='text-sm cursor-pointer'
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          Welcome Sainty
        </h3>
        <div
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className='cursor-pointer border-none'
        >
          <Users />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className='absolute right-0 top-[120%] bg-white shadow-md border rounded-md z-50 w-40'>
            <button
              onClick={handleLogout}
              className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
