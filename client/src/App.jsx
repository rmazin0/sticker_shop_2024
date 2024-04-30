import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Unauthorized from './views/Unauthorized';
import CreateProduct from './views/CreateProduct';
import ProductDetails from './views/ProductDetails';
import EditProduct from './views/EditProduct';
import Registration from './views/Registration';
import Hero from './views/Hero';
import Products from './views/Products';
import Checkout from './views/Checkout';
import Nav from './components/Nav';
import Footer from './components/Footer';


function App() {

  return (
    <>

      <Nav />
      <div className='main min-h-screen max-h-min font-custom'>
        <Routes>
          <Route index element={<Hero />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/create' element={<CreateProduct />} />
          <Route path='/product/:id/details' element={<ProductDetails />} />
          <Route path='/product/:id/edit' element={<EditProduct />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
