// import { StoreContext } from "../../Context/StoreContextProvider";
// import "./Cart.css";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import CartItem from "../../Components/CartItem/CartItem";

// function Cart() {
//   //Back Button
//   const navigate = useNavigate();
//   const goBack = () => {
//     navigate(-1);
//   };

//   const navigateToCheckOutpage = useNavigate();

//   const { products, total } = useContext(StoreContext);

//   return (
//     <div>
//       <div className="cartWrapper">
//         <div className="backButton" onClick={() => goBack()}>
//           <i className="bx bx-chevron-left"></i>
//           <p>Back</p>
//         </div>
//         <div className="cartContainer">
//           <section className="cartLeft">
//             <h1 className="cartTitle">Shopping Cart</h1>
//             <section className="cart">
//               {products.map((product, i) => (
//                 <CartItem key={i} product={product} />
//               ))}
//             </section>
//           </section>

//           <section className="cartRight">
//             <h1 className="cardDetailsTitle">Cart Totals</h1>
//             <div className="cartTotal">
//               <p>Total</p>
//               <p>$ {total.toFixed(2)}</p>
//             </div>
//             <div className="deliveryFee">
//               <p>Delivery Fee</p>
//               <p>$ {total ? (2).toFixed(2) : 0}</p>
//             </div>
//             <div className="totalAmount">
//               <p>Total Amount</p>
//               <p>$ {total ? (total + 2).toFixed(2) : 0}</p>
//             </div>

//             <button
//               className="proceedToCheckoutButton"
//               onClick={() => navigateToCheckOutpage("/checkout")}
//             >
//               Proceed to checkout
//             </button>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Cart;

import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import { StoreContext } from "../../Context/StoreContextProvider";

function Cart({ setShowLogin }) {
  const navigate = useNavigate();
  const { products, total } = useContext(StoreContext);

  const goBack = () => navigate(-1);

  const isLoggedIn = !!localStorage.getItem("token");
  const isCartEmpty = products.length === 0;

  const isCheckoutDisabled = !isLoggedIn || isCartEmpty;

  const handleProceedToCheckout = () => {
    if (!isCheckoutDisabled) {
      navigate("/checkout");
    }
  };

  return (
    <div>
      <div className="cartWrapper">
        <div className="backButton" onClick={goBack}>
          <i className="bx bx-chevron-left"></i>
          <p>Back</p>
        </div>
        <div className="cartContainer">
          <section className="cartLeft">
            <h1 className="cartTitle">Shopping Cart</h1>
            <section className="cart">
              {products.length > 0
                ? products.map((product, i) => (
                    <CartItem key={i} product={product} />
                  ))
                : ""}
            </section>
          </section>

          <section className="cartRight">
            <h1 className="cardDetailsTitle">Cart Totals</h1>
            <div className="cartTotal">
              <p>Total</p>
              <p>$ {total.toFixed(2)}</p>
            </div>
            <div className="deliveryFee">
              <p>Delivery Fee</p>
              <p>$ {total ? (2).toFixed(2) : "0.00"}</p>
            </div>
            <div className="totalAmount">
              <p>Total Amount</p>
              <p>$ {total ? (total + 2).toFixed(2) : "0.00"}</p>
            </div>

            <button
              className="proceedToCheckoutButton"
              onClick={handleProceedToCheckout}
              disabled={isCheckoutDisabled}
              style={{
                opacity: isCheckoutDisabled ? 0.5 : 1,
                cursor: isCheckoutDisabled ? "not-allowed" : "pointer",
              }}
            >
              Proceed to checkout
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cart;
