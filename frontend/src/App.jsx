import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Toaster position='top-center'/>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<PrivateRouter />}>
          <Route path='/checkout' element={<CheckoutPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;