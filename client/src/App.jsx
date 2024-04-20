import './App.css'
import {Routes, Route} from 'react-router-dom';
import LoginAndReg from './views/LoginAndReg';
import Home from './views/Home';
import Unauthorized from './views/Unauthorized';
import CreateProduct from './views/CreateProduct';
import ProductDetails from './views/ProductDetails';


function App() {

  return (
    <>
    {/* ADD VALIDATIONS */}
      <Routes>
        <Route index element={<LoginAndReg/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/product/create' element={<CreateProduct/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
      </Routes>
    </>
  )
}

export default App
