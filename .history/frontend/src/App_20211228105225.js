import {BrowserRouter, Route, Routes} from 'react-router-dom'

import SignUp from './pages/SignUp';

function App() {
  return (
   <BrowserRouter>
   <ToastContainer autoclose={}/>
    <Routes>
      <Route path='/register' element={SignUp}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
