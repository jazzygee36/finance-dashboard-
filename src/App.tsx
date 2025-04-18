import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/login';
import HomePage from './pages/home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
