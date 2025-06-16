import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContextProvider";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./ItemInfo.css";

function ItemInfo({ setShowLogin }) {
  //Back Button
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  //get item id
  const { _id } = useParams();

  const [item, setItem] = useState(null);

  const { watchItems, addToCart, url } = useContext(StoreContext); // item data from the array

  useEffect(() => {
    console.log(watchItems);
    if (watchItems.length > 0) {
      // Ensure data is available
      const productItem = watchItems.find((product) => product._id === _id);
      console.log(_id);

      setItem(productItem || null);
    }
  }, [_id, watchItems]); // Re-run when `id` or `watchItems` change

  // If item is still null (loading or not found), return loading or error message
  if (!item) {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "25%" }}>404 Error</h1>
      </div>
    );
  }
  const handleAddToCart = (item) => {
    console.log("ADD");
    addToCart(item);
  };

  return (
    <div>
      <Navbar setShowLogin={setShowLogin} />
      <div className="itemInfoWrapper">
        <div className="itemInfoContainer">
          <div className="backButton" onClick={() => goBack()}>
            <i className="bx bx-chevron-left"></i>
            <p>Back</p>
          </div>
          <div className="itemInfo">
            <div className="itemInfoLeft">
              <img src={url + "/images/" + item.image} alt={item.name} />
            </div>
            <div className="itemInfoRight">
              <div className="mainInfo">
                <h2 className="itemName">{item.name}</h2>
                <h3 className="itemPrice">${item.price}</h3>
                <p className="">{item.title}</p>

                <h4
                  className={item.inStock === true ? "inStock" : "outOfStock"}
                >
                  {item.inStock === true ? "In Stock" : "Out of Stock"}
                </h4>
              </div>
              <button
                className="addToCartBtn"
                onClick={() => {
                  if (item.inStock) {
                    handleAddToCart(item);
                  } else {
                    console.log("Item Out of Stock"); //Else logic here
                  }
                }}
              >
                Add
              </button>
              <div className="tags">
                {item.tags
                  ? item.tags.map((tag, index) => (
                      <p className="tag" key={index}>
                        {tag}
                      </p>
                    ))
                  : ""}
              </div>
              <p className="watchCategory">Category: {item.category}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemInfo;
