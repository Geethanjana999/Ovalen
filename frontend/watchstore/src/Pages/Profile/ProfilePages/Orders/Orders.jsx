import "./Orders.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ListOrder from "../../../../Components/ListOrder/ListOrder";

function Orders() {
  const url = "http://localhost:4000";
  const [loading, setLoading] = useState(false); // loading indicator
  const [error, setError] = useState(""); // error handling
  const [list, setList] = useState([]); // store user's order list

  // Fetch user orders from backend
  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${url}/api/v1/order/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    // _id
    try {
      const response = await axios.post(`${url}/api/v1/order/remove`, {
        id: orderId,
      }); // _id

      if (response.status === 200) {
        fetchUserOrders(); // fetch data after delete order
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // DEBUG:
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  // Run fetchUserOrders when component loads
  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="titleArea">
        <h1 className="title">Orders</h1>
        <div className="scrollArea">
          <div className="scrollAreaContent">
            {list.length > 0 ? (
              list.map((order, index) => (
                <ListOrder key={index} order={order} onDelete={deleteOrder} />
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
