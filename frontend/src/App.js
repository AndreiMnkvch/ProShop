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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


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
                        <Route path='/product/:productId' element={<ProductPage />}/>
                        <Route path='/cart' exact element={<CartPage />}/>
                        <Route path='/cart/:id' element={<CartPage />}/>
                        <Route path='/login/' element={<LoginPage />}/>
                        <Route path='/register/' element={<RegisterPage />}/>
                        <Route path='/profile/' element={<ProfilePage />}/>
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
