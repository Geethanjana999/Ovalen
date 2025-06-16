import "./Verify.css";
import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContextProvider";
import checkedPng from "../../Assets/checked.png";
import cancelPng from "../../Assets/cancel.png";

function Verify() {
  const navigate = useNavigate();

  const { url } = useContext(StoreContext);

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/order/${orderId}`);
        setOrder(response.data.order);
        console.log("order");
      } catch (error) {
        console.log("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, url]);

  // Prevent user from going back to the previous page
  useEffect(() => {
    // Push a state to the history stack to prevent back navigation
    window.history.pushState(null, document.title);
    const handlePopState = () => {
      window.history.pushState(null, document.title);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  // return (
  //   <div>
  //     {success ? <h2>Payment Successful 🎉</h2> : <h2>Payment Failed ❌</h2>}

  //     {order ? (
  //       <div>
  //         <h1>Order Details</h1>
  //         <p>Order ID: {order._id}</p>
  //         <p>Amount: ${order.amount}</p>
  //         <p>Status: {order.status}</p>
  //         <p>Items</p>
  //         <div>
  //           {order.items.map((item, index) => {
  //             return (
  //               <div>
  //                 <p>{item.name}</p>
  //                 <p>{item.price}</p>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     ) : (
  //       <p>Order details not found.</p>
  //     )}
  //   </div>
  // );

  return (
    <div className="verify">
      <div className="verifyWrapper">
        <div className="verifyContainer">
          <img
            className="verifyIcon"
            src={success ? checkedPng : cancelPng}
            alt="verifyIcon"
          />
          <h1 className={success ? `verifyTitle` : `verifyTitleCancel`}>
            {success ? "Payment Successful" : "Payment Failed"}
          </h1>

          <div className="verifyOrderdItemsSummary">
            {order?._id && (
              <div className="verifyOrderId verifyInfo">
                <h4>Order Id</h4>
                <h4>{order._id}</h4>
              </div>
            )}
            {order?.address?.email && (
              <div className="verifyOrderEmail verifyInfo">
                <h4>Email</h4>
                <h4>{order.address.email}</h4>
              </div>
            )}
            {order?.address?.phone && (
              <div className="verifiedOrderStreet verifyInfo">
                <h4>Phone</h4>
                <h4>{order.address.phone}</h4>
              </div>
            )}
            {order?.address?.city && (
              <div className="verifiedOrderCity verifyInfo">
                <h4>City</h4>
                <h4>{order.address.city}</h4>
              </div>
            )}
            {order?.address?.state && (
              <div className="verifiedOrderState verifyInfo">
                <h4>State</h4>
                <h4>{order.address.state}</h4>
              </div>
            )}
            {order?.address?.zipcode && (
              <div className="verifiedOrderZipCode verifyInfo">
                <h4>Zip Code</h4>
                <h4>{order.address.zipcode}</h4>
              </div>
            )}
            {order?.address?.country && (
              <div className="verifiedOrderCountry verifyInfo">
                <h4>Country</h4>
                <h4>{order.address.country}</h4>
              </div>
            )}
            {order?.amount && (
              <div className="verifiedOrderTotal verifyInfo">
                <h4>Amount</h4>
                <h4>$ {order.amount.toFixed(2)}</h4>
              </div>
            )}
          </div>

          <button
            className={success ? `verifyDoneButton` : `verifyDoneButtonError`}
            onClick={() => navigate("/")}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verify;
