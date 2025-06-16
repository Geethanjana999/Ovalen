import "./OrderDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import { StoreContext } from "../../../../../Context/StoreContextProvider";
import TrackingProgressBar from "../../../../../Components/TrackingProgressBar/TrackingProgressBar";
import axios from "axios";

function OrderDetails() {
  const { url } = useContext(StoreContext);
  const { orderId } = useParams(); // Get orderId from URL
  const [tracking, setTracking] = useState([]);
  const [error, setError] = useState(""); // Handle errors
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // Fetch order tracking details
  const fetchOrderTrackingDetails = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve auth token
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${url}/api/v1/order/my/details/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setTracking(response.data.data);
      } else {
        setError("Failed to fetch tracking details.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [orderId, url]);

  // Fetch tracking details when the component mounts
  useEffect(() => {
    fetchOrderTrackingDetails();
  }, [orderId, fetchOrderTrackingDetails]);

  return (
    <div>
      <div className="titleArea">
        <div className="titleAreaWithBackButton">
          <i className="bx bx-chevron-left" onClick={goBack}></i>
          <h1 className="title">Order Details</h1>
        </div>

        <div className="scrollArea">
          <div className="scrollAreaContent">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : tracking.length === 0 ? (
              <p>No tracking details available.</p>
            ) : (
              <div>
                <TrackingProgressBar tracking={tracking} />
                <div className="trackingInformations">
                  {tracking.map((item, index) => (
                    <div className="trackingInfo" key={index}>
                      <div className="timestamp">
                        {new Date(item.timestamp).toLocaleTimeString()}
                        <span className="orderDateSpacer"></span>
                        {new Date(item.timestamp).toLocaleDateString()}
                      </div>
                      <div className="trackingDetails">
                        <h4>{item.step}</h4>
                        <p>{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
