import './App.css'
import {Routes, Route} from 'react-router-dom';
import LoginAndReg from './views/LoginAndReg';
import Home from './views/Home';
import Unauthorized from './views/Unauthorized';


function App() {

  return (
    <>
    {/* ADD LOGIN VALIDATION NEXT */}
      <Routes>
        <Route index element={<LoginAndReg/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
      </Routes>
    </>
  )
}

export default App
