import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
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
import Landing from './pages/Landing';
import SellerPage from './pages/SellerPage';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';

// Hide Navbar/Footer on landing and seller pages
function Layout({ children }) {
  const location = useLocation();
  const hideChrome = ['/', '/seller'].includes(location.pathname);
  return (
    <>
      {!hideChrome && <Navbar />}
      <div className={!hideChrome ? 'pt-20' : ''}>
        {children}
        {!hideChrome && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Toaster position='top-center' />
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<PrivateRouter />}>
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/orders' element={<OrderHistory />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;