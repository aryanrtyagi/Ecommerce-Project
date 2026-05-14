import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <>
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
      </Router>
      <footer className="bg-gray-900 text-white text-center py-4">
        <p className="text-sm">
          © 2026 Aryan Tyagi. All Rights Reserved.
        </p>
      </footer>
    </>
  )
}

export default App;