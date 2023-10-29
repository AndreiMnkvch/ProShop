import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomePage from './pages/HomePage';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductPage from './pages/ProductPage';



function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='/product/:productId' element={<ProductPage />}/>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
