import {BrowserRouter, Route, Routes} from 'react-router-dom'

import AuthProvider from './contexts/AuthContext';

import {ToastContainer} from 'react-toastify'

import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  return (
   <BrowserRouter>
    <AuthProvider>
    <ToastContainer autoclose={3000}/>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<SignUp/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
