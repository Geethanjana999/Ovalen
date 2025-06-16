import "./ChechOut.css";
import { useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckOut() {
  // Back button
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { total, token, products, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    products.map((product, i) => {
      let itemInfo = product;
      itemInfo["quantity"] = product.quantity;
      orderItems.push(itemInfo);
    });
    //console.log(orderItems);

    let orderData = {
      items: orderItems, // array of cart
      address: data,
      amount: Number(total + 2),
    };

    // backend api call
    const response = await axios.post(
      `${url}/api/v1/order/placeorder`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      const { session_url } = response.data;
      // send redirect user
      window.location.replace(session_url);
    } else {
      alert("Error payment process", response.data);
    }
  };

  return (
    <div className="checkout">
      <div className="chechoutWrapper">
        <div className="backButton" onClick={() => goBack()}>
          <i className="bx bx-chevron-left"></i>
          <p>Back</p>
        </div>
        <div className="checkoutContainer">
          <h1 className="checkoutTitle">Shipping Information</h1>
          <div className="chechoutFormArea">
            <form onSubmit={placeOrder} className="chechoutForm">
              <div className="checkoutName">
                <div className="checkoutFirstName">
                  <label htmlFor="checkoutFirstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={onChangeHandler}
                    value={data.firstName}
                    required
                  />
                </div>

                <div className="checkoutLastName">
                  <label htmlFor="checkoutLastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={onChangeHandler}
                    value={data.lastName}
                    required
                  />
                </div>
              </div>

              <div className="checkoutEmail">
                <label htmlFor="checkoutEmail">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  required
                />
              </div>

              <div className="checkoutPhone">
                <label htmlFor="checkoutPhone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={onChangeHandler}
                  value={data.phone}
                  required
                />
              </div>

              <div className="checkoutStreet">
                <label htmlFor="checkoutStreet">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  onChange={onChangeHandler}
                  value={data.street}
                  required
                />
              </div>

              <div className="checkoutCityStateZipcode">
                <div className="checkoutCity">
                  <label htmlFor="checkoutCity">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    onChange={onChangeHandler}
                    value={data.city}
                    required
                  />
                </div>

                <div className="checkoutState">
                  <label htmlFor="checkoutState">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    onChange={onChangeHandler}
                    value={data.state}
                    required
                  />
                </div>

                <div className="chechoutZipcode">
                  <label htmlFor="chechoutZipcode">Zip Code</label>
                  <input
                    type="number"
                    id="zipcode"
                    name="zipcode"
                    onChange={onChangeHandler}
                    value={data.zipcode}
                    required
                  />
                </div>
              </div>

              <div className="checkoutCountry">
                <label htmlFor="checkoutCountry">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  onChange={onChangeHandler}
                  value={data.country}
                  required
                />
              </div>

              <button className="checkOutButton" type="submit">
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
