import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContextProvider";

function WatchItem({ item }) {
  const { addToCart, url } = useContext(StoreContext);

  const handleAddToCart = () => {
    console.log("ADD");
    addToCart(item);
  };
  return (
    <div>
      <div className="watchItemWrapper">
        <div className="watchItem">
          <div className="watchItemInformation">
            <Link to={`/product/${item._id}`}>
              <img
                src={url + "/images/" + item.image}
                alt={item.name}
                className="itemImage"
              />

              <div className="detailsSection">
                <h4>{item.name}</h4>
                <h5>$ {item.price}</h5>
              </div>
            </Link>
          </div>
          <button
            className="addToCart"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click
              // Trigger the add to cart functionality
              if (item.inStock) {
                handleAddToCart();
              } else {
                console.log("Item Out of Stock"); //Else logic here
              }
            }}
          >
            {item.inStock ? "Add" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchItem;
