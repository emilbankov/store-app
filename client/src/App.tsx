import { Routes, Route } from 'react-router-dom';
import AddProducts from "./components/Add Products/AddProducts"
import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import SoldProducts from './components/Sold Products/SoldProducts';
import Report from './components/Report/Report';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-products" element={<AddProducts />} />
                <Route path="/sold-products" element={<SoldProducts />} />
                <Route path="/report" element={<Report />} />
            </Routes>
        </>
    )
}

export default App
