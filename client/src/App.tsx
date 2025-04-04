import { Routes, Route } from 'react-router-dom';
import AddProducts from "./components/Add Products/AddProducts"
import Header from "./components/Header/Header"
import Home from "./components/Home/Home"

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-products" element={<AddProducts />} />
                <Route path="/orders-history" element={<div>История</div>} />
                {/* Add more routes as needed */}
            </Routes>
        </>
    )
}

export default App
