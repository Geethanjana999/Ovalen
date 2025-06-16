import "./Orders.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ListOrder from "../../Components/ListOrder/ListOrder";

function Orders() {
  const url = "http://localhost:4000";
  const [loading, setLoading] = useState(false); // loading indicator
  const [list, setList] = useState([]); // store order list

  const fetchOrderList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/v1/order/list`);

      if (response.data.success) {
        // Filter successful orders only
        const successfulOrders = response.data.data.filter(
          (order) => order.payment === true
        );
        setList(successfulOrders); // Update state with filtered orders
        // DEBUG:
        console.log(successfulOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // DEBUG:
      console.log("Error fetching data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false); // stop loading
    }
  };

  const removeOrder = async (orderId) => {
    // _id
    try {
      const response = await axios.post(`${url}/api/v1/order/remove`, {
        id: orderId,
      }); // _id

      if (response.status === 200) {
        fetchOrderList(); // fetch data after delete order
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

  // fetch list when webpage is loading
  useEffect(() => {
    fetchOrderList();
    return () => {};
  }, []);

  return (
    <div className="watchList">
      <h1 className="title">Orders</h1>

      <div className="scrollArea">
        <div className="scrollAreaContent">
          {loading ? (
            <p>Loading...</p>
          ) : (
            list.map((order, index) => (
              <ListOrder key={index} order={order} onDelete={removeOrder} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
