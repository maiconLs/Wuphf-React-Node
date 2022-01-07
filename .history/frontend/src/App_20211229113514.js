import {BrowserRouter, Route, Routes} from 'react-router-dom'

import AuthProvider from './contexts/AuthContext';

import {ToastContainer} from 'react-toastify'

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
   <BrowserRouter>
    <AuthProvider>
      <ToastContainer autoclose={3000}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/register" element={<SignIn/>}/>

        </Routes>
      </AuthProvider>
   </BrowserRouter>
  );
}

export default App;
