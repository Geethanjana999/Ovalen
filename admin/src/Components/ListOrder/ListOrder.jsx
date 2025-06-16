import "./ListOrder.css";
import { useNavigate } from "react-router-dom";
import TrackingProgressBar from "../TrackingProgressBar/TrackingProgressBar";

function ListOrder({ order, onDelete }) {
  const navigate = useNavigate();
  const OrderStatus = {
    PENDING: "Watch Item Processing",
    SUCCESS: "Payment Successful",
  };
  return (
    <div className="listOrderWrapper">
      <div className="listOrderContainer">
        {/* Order Header Section */}
        <div className="orderHeader">
          <h3>Order ID: {order._id}</h3>
        </div>

        {/* Status and Watch Item Processing */}
        <div className="orderStatusWrapper">
          <p className="orderStatusCaption">Status:</p>
          <p className="orderStatus">
            {order.status === OrderStatus.PENDING
              ? "Pending Order"
              : "Payment Successful"}
          </p>
        </div>

        {/* Total Amount */}
        <div className="orderAmountWrapper">
          <p className="orderAmountCaption">Total Amount:</p>
          <p className="orderAmount">${order.amount.toFixed(2)}</p>
        </div>

        {/* Date and Time */}
        <p className="orderDateTime">
          {new Date(order.date).toLocaleTimeString()}
          <span className="orderDateSpacer"></span>
          {new Date(order.date).toLocaleDateString()}
        </p>

        {/* User Information */}
        <div className="orderUserInfoWrapper">
          <h4>User Information</h4>
          <div className="orderUserInfo">
            <p>Firstname: {order.address.firstName}</p>
            <p>Lastname: {order.address.lastName}</p>
            <p>Email: {order.address.email}</p>
            <p>Phone: {order.address.phone}</p>
            <p>Street: {order.address.street}</p>
            <p>City: {order.address.city}</p>
            <p>State: {order.address.state}</p>
            <p>Zipcode: {order.address.zipcode}</p>
            <p>Country: {order.address.country}</p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="orderedItemsWrapper">
          <h4>Ordered Items</h4>
          <div className="userPayedCartItems">
            {order.items.map((item, index) => (
              <div className="cartItem" key={index}>
                <p className="itemId">{item._id}</p>
                <p className="itemName">{item.name}</p>
                <p className="itemPrice">${item.price}</p>
                <p className="itemPrice">{item.quantity}</p>
              </div>
            ))}

            <div className="trackingOrder">
              <TrackingProgressBar tracking={order.tracking} />
            </div>
            <div className="deleteUpdateButtonWrapper">
              <button
                className="updateOrder"
                onClick={() => navigate(`/update-order/${order._id}`)}
              >
                Update
              </button>
              <button
                className="deleteOrder"
                onClick={() => onDelete(order._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListOrder;
