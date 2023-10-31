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
import PaymentPage from './pages/PaymentPage';



function App() {

return (
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
                    <Route path='/placeorder/' element={<PlaceOrderPage />}/>
                    <Route path='/payment/' element={<PaymentPage />}/>
                </Routes>
            </Container> 
        </main>
        <Footer/>
    </BrowserRouter>
);
}

export default App;
