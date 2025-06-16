import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import StoreContextProvider from "./Context/StoreContextProvider";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Cart from "./Pages/Cart/Cart";
import Stories from "./Pages/Stories/Stories";
import Brands from "./Pages/Brands/Brands";
import Insurance from "./Pages/Insurance/Insurance";
import ItemInfo from "./Pages/ProductInfo/ItemInfo";
import Login from "./Components/Authentication/Login";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Profile from "./Pages/Profile/Profile";
import Verify from "./Pages/Verify/Verify";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      <Router>
        <StoreContextProvider>
          <div className="App">
            {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}

            <Routes>
              <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
              <Route
                path="/shop"
                element={<Shop setShowLogin={setShowLogin} />}
              />
              <Route
                path="/stories"
                element={<Stories setShowLogin={setShowLogin} />}
              />
              <Route
                path="/brands"
                element={<Brands setShowLogin={setShowLogin} />}
              />
              <Route
                path="/insurance"
                element={<Insurance setShowLogin={setShowLogin} />}
              />
              <Route
                path="/product/:_id"
                element={<ItemInfo setShowLogin={setShowLogin} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="/verify" element={<Verify />} />
            </Routes>
          </div>
        </StoreContextProvider>
      </Router>
    </>
  );
}

export default App;
