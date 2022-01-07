import {BrowserRouter, Route, Routes, Navi} from 'react-router-dom'

import AuthProvider from './contexts/AuthContext';

import useAuth from './hooks/useAuth';

import {ToastContainer} from 'react-toastify'

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import EditUser from './pages/EditUser';

function App() {
  const {authenticated} = useAuth()
  return (
   <BrowserRouter>
    <AuthProvider>
      <ToastContainer autoclose={3000}/>
        <Routes>
         {authenticated ? <Route path="/" element={<Home/>}/> : <Navigate to="/login"/>} 
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
