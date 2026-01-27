import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { MainLayout } from '@/layout/MainLayout';
import { Home } from '@/pages/Home';
import { AdminPage } from '@/pages/AdminPage';
import { OrdersPage } from '@/pages/Orders';
import { Shop } from '@/pages/Shop';
import { About } from '@/pages/About';
import { CartDrawer } from '@/components/cart/CartDrawer';

import { CheckoutPage } from '@/pages/Checkout';

import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';
import { ProductDetailsPage } from '@/pages/ProductDetails';

function App() {

    return (
        <AuthProvider>
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/product/:id" element={<ProductDetailsPage />} />
                        <Route path="/cart" element={<CartDrawer />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </MainLayout>
                {/* <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
                {/* <div onClick={() => setIsCartOpen(true)}>Open Cart Drawer</div> */}
            </Router>
        </AuthProvider>
    )
}

export default App
