import {BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthProvider from './contexts/AuthContext';

import {ToastContainer} from 'react-toastify'

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import EditUser from './pages/EditUser';
import Publicat from './pages/EditUser';

function App() {
  return (
   <BrowserRouter>
    <AuthProvider>
      <ToastContainer autoClose={3000}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/edit" element={<EditUser/>}/>

        </Routes>
      </AuthProvider>
   </BrowserRouter>
  );
}

export default App;
