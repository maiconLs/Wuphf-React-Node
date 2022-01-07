import {BrowserRouter, Route, Routes} from 'react-router-dom'

import SignUp from './pages/SignUp';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route element="signup"/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
