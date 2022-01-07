import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {ToastContainer} from 'react-toastify'

import SignUp from './pages/SignUp';

function App() {
  return (
   <BrowserRouter>
    <ToastContainer autoclose={3000}/>
      <Routes>
        <Route path='/register' element={SignUp}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
