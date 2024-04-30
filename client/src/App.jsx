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
      {/* 
    todo tom - immediate - product context for cart
      **************FRONT END DESIGN***************
      1. Hero page
      2. Footer component(added)
      3. Product display(a bit better)
      4. Device responsive(for phones)
      4. Background???
      -----------------BONUSES---------------------
      1. checkout page( if di maimplement yung api, kahit view route lang) (added)
      2. animations(dropdown, add counter to cart)
      3. categories (maybe in form of tags)
    */}
      <Nav />
      <div className='main min-h-screen max-h-min font-custom bg-neutral-950 text-white'>
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
