import {Routes, Route} from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Unauthorized from './views/Unauthorized';
import CreateProduct from './views/CreateProduct';
import ProductDetails from './views/ProductDetails';
import EditProduct from './views/EditProduct';
import Registration from './views/Registration';
import Hero from './views/Hero';


function App() {

  return (
    <>
    {/* 
      1. FIND A WAY TO SAVE EDITED PRODUCTS WITHOUT NEEDING TO UPLOAD NEW PICTURE 
      IDEAS: TOGGLE UPLOAD PICTURE=>NOT REQUIRED TO UPLOAD A NEW FILE=> ADD CONDITIONS TO UPLOAD FILE AND PRODUCT OBJECT IN CONTROLLER
      2. ADD VALIDATIONS PROBABLY FRONTEND TOO
      3. FRONT END DESIGN
      4. CHECKOUT PAGE
    */}

      <Routes>
        <Route index element={<Hero/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/product/create' element={<CreateProduct/>}/>
        <Route path='/product/:id/details' element={<ProductDetails/>}/>
        <Route path='/product/:id/edit' element={<EditProduct/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
      </Routes>
    </>
  )
}

export default App
