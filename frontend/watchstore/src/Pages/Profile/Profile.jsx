import "./Profile.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Settings from "./ProfilePages/Settings/Settings";
import Dashboard from "./ProfilePages/Dashboard/Dashboard";
import Orders from "./ProfilePages/Orders/Orders";
import OrderDetails from "./ProfilePages/Orders/OrderDetails/OrderDetails";

function Profile() {
  return (
    <div className="profile">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/order/my" element={<Orders />} />
          <Route path="/order/my/details/:orderId" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;

// <button onClick={logOut}>Log out</button>
