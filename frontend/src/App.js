import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomePage from './pages/HomePage';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import UsersListPage from './pages/UsersListPage';
import UserEditPage from './pages/UserEditPage';
import ProductEditPage from './pages/ProductEditPage';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProductsListPage from './pages/ProductsListPage';
import OrdersListPage from './pages/OrderListPage';


function App() {
    const initialOptions = {
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",  
    };

return (
    <PayPalScriptProvider options={initialOptions} >
        <BrowserRouter>
            <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomePage />} exact />
                        <Route path='/products/:productId' element={<ProductPage />}/>
                        <Route path='/cart' exact element={<CartPage />}/>
                        <Route path='/cart/:id' element={<CartPage />}/>
                        <Route path='/login/' element={<LoginPage />}/>
                        <Route path='/register/' element={<RegisterPage />}/>
                        <Route path='/profile/' element={<ProfilePage />}/>
                        <Route path='/admin/users/' element={<UsersListPage />}/>
                        <Route path='/admin/users/:userId/edit' element={<UserEditPage />}/>
                        <Route path='/admin/products/:productId/edit' element={<ProductEditPage />}/>
                        <Route path='/admin/products/' element={<ProductsListPage />}/>
                        <Route path='/admin/orders/' element={<OrdersListPage />}/>
                        <Route path='/shipping/' element={<ShippingPage />}/>
                        <Route path='/orders/:orderId' element={<OrderPage />}/>
                        <Route path='/placeorder/' element={<PlaceOrderPage />}/>
                        <Route path='/payment/' element={<PaymentPage />}/>
                    </Routes>
                </Container> 
            </main>
            <Footer/>
        </BrowserRouter>
    </PayPalScriptProvider>
);
}

export default App;
