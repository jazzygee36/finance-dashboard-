import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/login';
import HomePage from './pages/home';
import EditForm from './pages/form';
import EditAccountStatement from './pages/accountStatement.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<HomePage />} />
        <Route path='/edit-form' element={<EditForm />} />
        <Route path='/edit-statement' element={<EditAccountStatement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
