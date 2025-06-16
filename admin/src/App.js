import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddItem from "./Pages/AddItem/AddItem";
import Dashboard from "./Pages/Dashboard/Dashboard";
import WatchList from "./Pages/WatchList/WatchList";
import Orders from "./Pages/Orders/Orders";
import Users from "./Pages/Users/Users";
import UpdateWatch from "./Pages/WatchList/UpdateWatch/UpdateWatch";
import UpdateOrder from "./Pages/Orders/UpdateOrder/UpdateOrder";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/list" element={<WatchList />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/update-watch/:id" element={<UpdateWatch />} />
            <Route path="/update-order/:id" element={<UpdateOrder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
