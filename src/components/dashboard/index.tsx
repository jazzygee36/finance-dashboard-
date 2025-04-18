import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './header';

import { dashboardProps } from '../../utils/interface';

// You may want to export this from one place if reused
const Links = [
  { name: 'Dashboard', path: '/dashboard' },
  // { name: 'Account details', path: '/my-account' },
];

const MainDashboard = ({ children }: dashboardProps) => {
  const [, setIsOpen] = useState(false);
  const location = useLocation();

  const activePath = location.pathname;

  const currentLink = Links.find((link) => link.path === activePath);
  const title = currentLink?.name || 'Dashboard';

  return (
    <div className='flex h-screen'>
      {/* Main Content */}
      <div className='flex flex-col flex-1'>
        <Header title={title} setIsOpen={setIsOpen} />
        <div className='p-4 bg-[#F8FAFB] h-full'>{children}</div>
      </div>
    </div>
  );
};

export default MainDashboard;
