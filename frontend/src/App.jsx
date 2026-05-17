import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Navbar from './components/Navbar';
import CartPage from "./pages/CartPage";
import CheckoutPage from './pages/CheckoutPage';
import PrivateRouter from './components/PrivateRouter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CategoryProducts from "./pages/CategoryProducts";
import ProductsPage from './pages/ProductPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Toaster position='top-center'/>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route elememt={<PrivateRouter />}>
            <Route path='/CheckOut' element={<CheckoutPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/category/:id"
            element={<CategoryProducts />}
          />
          <Route
            path="/products"
            element={<ProductsPage />}
          />
        </Routes>
        <Footer/>
      </Router>
      
    </>
  )
}

export default App;