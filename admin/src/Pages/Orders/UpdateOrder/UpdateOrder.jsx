import "./UpdateOrder.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import TrackingProgressBar from "../../../Components/TrackingProgressBar/TrackingProgressBar";

function UpdateOrder() {
  const url = "http://localhost:4000";

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { id } = useParams(); // Get item id

  const [data, setData] = useState({
    tracking: [
      {
        step: "",
        timestamp: Date.now(),
        details: "",
      },
    ],
  });

  const [tracking, setTracking] = useState([]); // To store tracking history

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      tracking: [
        {
          ...prev.tracking[0], // Preserve previous tracking data
          [name]: value, // Update selected tracking step
        },
      ],
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`${url}/api/v1/order/tracking/${id}`, {
        step: data.tracking[0].step,
        details: data.tracking[0].details,
      });

      if (response.data.success) {
        toast.success("Tracking updated successfully!");
        fetchOrderTracking(); // Re-fetch order details after updating tracking
      } else {
        toast.error("Failed to update tracking.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating tracking.");
    }
  };

  // fetch order trackings
  const fetchOrderTracking = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/v1/order/details/${id}`);
      if (response.data.success) {
        setTracking(response.data.data.tracking);
        setData({
          tracking: [
            {
              step: "",
              timestamp: Date.now(),
              details: "",
            },
          ],
        });
      }
    } catch (error) {
      toast.error("Failed to fetch order details.");
    }
  }, [id]); // Only depend on id to trigger a re-fetch

  useEffect(() => {
    fetchOrderTracking(); // Fetch order tracking on initial load or when id changes
  }, [fetchOrderTracking, id]); // Only depend on fetchOrderTracking and id

  return (
    <div className="updateWatch">
      <div className="titleAreaWithBackButton">
        <i className="bx bx-chevron-left" onClick={() => goBack()}></i>
        <h1 className="title">Update Tracking</h1>
      </div>

      <div className="scrollArea">
        <div className="scrollAreaContent">
          <TrackingProgressBar tracking={tracking} />

          <div className="trackingInformations">
            {tracking.map((tracking, index) => {
              return (
                <div className="trackingInfo" key={index}>
                  <div className="timestamp">
                    {new Date(tracking.timestamp).toLocaleTimeString()}
                    <span className="orderDateSpacer"></span>
                    {new Date(tracking.timestamp).toLocaleDateString()}
                  </div>
                  <div className="trackingDetails">
                    <h4>{tracking.step}</h4>
                    <p>{tracking.details}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form className="addItemForm" onSubmit={onSubmitHandler}>
            <select
              name="step"
              value={data.tracking[0].step}
              onChange={onChangeHandler}
            >
              <option value="">Select Status</option>
              <option value="Order Placed">Order Placed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            <input
              type="text"
              name="details"
              placeholder="Enter Tracking Details"
              value={data.tracking[0].details}
              onChange={onChangeHandler}
            />
            <button type="submit" className="addProdcutSubmitButton">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateOrder;
