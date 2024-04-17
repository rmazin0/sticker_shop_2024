import './App.css'
import {Routes, Route} from 'react-router-dom';
import LoginAndReg from './views/LoginAndReg';
import Home from './views/Home';


function App() {

  return (
    <>
      <Routes>
        <Route index element={<LoginAndReg/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
