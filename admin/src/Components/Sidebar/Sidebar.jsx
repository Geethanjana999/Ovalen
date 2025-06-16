import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <div className="sidebarWrapper">
        <div className="sidebarContainer">
          <div className="logo">
            <h2 className="logoTitle">OVALEN</h2>
          </div>

          <div className="navLinks">
            <NavLink to="/dashboard" className="sidebarOption">
              <div className="nav dashboard">
                <i class="bx bx-home-alt-2"></i>
                <h4>Dashboard</h4>
              </div>
            </NavLink>
            <NavLink to="/add" className="sidebarOption">
              <div className="nav addWatchItems">
                <i class="bx bx-plus"></i>
                <h4>Add Item</h4>
              </div>
            </NavLink>
            <NavLink to="list" className="sidebarOption">
              <div className="nav allWatchItems">
                <i class="bx bx-list-ul"></i>
                <h4>Watches</h4>
              </div>
            </NavLink>
            <NavLink to="orders" className="sidebarOption">
              <div className="nav orders">
                <i class="bx bx-box"></i>
                <h4>Orders</h4>
              </div>
            </NavLink>
            <NavLink to="users" className="sidebarOption">
              <div className="nav users">
                <i class="bx bx-user"></i>
                <h4>Users</h4>
              </div>
            </NavLink>
          </div>

          <div className="logout">
            <i class="bx bx-log-out"></i>
            <h4>Log out</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
