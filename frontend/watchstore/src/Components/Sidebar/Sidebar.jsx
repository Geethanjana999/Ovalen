import "./Sidebar.css";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();
  const goBack = () => navigate("/");

  const { token, setToken, url } = useContext(StoreContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${url}/api/v1/user/settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [url]);

  const logOut = () => {
    localStorage.removeItem("token"); // remove token form the local storage
    setToken("");
    navigate("/"); // navigate back to the home page
  };

  if (loading) return <p>Loading Profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="sidebar">
      <div className="sidebarContainer">
        <h4 className="logoTitle" onClick={goBack}>
          Ovalen
        </h4>

        <div className="profileInfoContainer">
          <h5 className="profileName">{userData?.name}</h5>
          <p className="profileEmail">{userData?.email}</p>
        </div>

        <nav className="profileNavLinks">
          <NavLink to="/profile/dashboard" className="navItem">
            <i className="bx bx-home-alt-2"></i>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/profile/settings" className="navItem">
            <i className="bx bx-cog"></i>
            <span>Settings</span>
          </NavLink>

          <NavLink to="/profile/order/my" className="navItem">
            <i class="bx bx-box"></i>
            <span>Orders</span>
          </NavLink>
        </nav>

        <div className="logout">
          <i className="bx bx-log-out"></i>
          <span onClick={logOut}>Log out</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
