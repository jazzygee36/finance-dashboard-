import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/login';
import HomePage from './pages/home';
import EditForm from './pages/form';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<HomePage />} />
        <Route path='/editform' element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
