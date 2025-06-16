import "./CartItem.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContextProvider";

function CartItem({ product }) {
  const { addToCart, removeFromCart, clearItem, url } =
    useContext(StoreContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };

  const handleClearItem = () => {
    clearItem(product);
  };

  return (
    <div>
      <div className="cartItemWrapper">
        <div className="cartItemContainer">
          <div className="cartItemImage">
            <img src={url + "/images/" + product.image} alt={product.name} />
          </div>
          <div className="cartItemTitle">
            <h4>{product.name}</h4>
          </div>
          <div className="cartItemQuantity">
            <button onClick={handleRemoveFromCart}>
              <i class="bx bx-minus"></i>
            </button>
            <h4>{product.quantity}</h4>
            <button onClick={handleAddToCart}>
              <i class="bx bx-plus"></i>
            </button>
          </div>
          <div className="cartItemPrice">
            <h4>$ {product.price.toFixed(2)}</h4>
          </div>
          <div className="removeCartItem" onClick={handleClearItem}>
            <i class="bx bx-x"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
