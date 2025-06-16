import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from "react";
// import { watchItems } from "../Data/WatchItems"; // tempory data -> []
import storeReducer, { initialState } from "./reducer";
import axios from "axios";

export const StoreContext = createContext(null);

function StoreContextProvider({ children }) {
  // backend url
  const url = "http://localhost:4000";

  // login Token
  const [token, setToken] = useState("");

  // fetch watch items ( watch list ) from DB
  const [watchItems, setWatchItems] = useState([]);

  // Reducer
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // add to cart
  const addToCart = async (product) => {
    // check if item already available in the cart
    const existingItemIndex = state.products.findIndex(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingItemIndex >= 0) {
      // product already exists in the cart
      updatedCart = [...state.products];
      updatedCart[existingItemIndex].quantity += 1; // increase quantity
    } else {
      updatedCart = [...state.products, { ...product, quantity: 1 }]; // Product not in cart; add with quantity 1
    }

    const total = updatePrice(updatedCart); // update total after adding items

    // add to cart in DB -> Backend
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/v1/cart/add`,
          { itemId: product._id }, // Send only the item ID, no need for quantity
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log("Item added to the cart in DB");
        } else {
          console.log("Error adding item to the cart");
        }
      } catch (error) {
        console.log("Error Adding to cart" + error);
      }
    }

    dispatch({
      type: "ADD",
      payload: { updatedCart, total },
    });
  };

  // remove form cart
  const removeFromCart = async (product) => {
    let updatedCart = [...state.products];

    const existingItemIndex = state.products.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex >= 0) {
      if (updatedCart[existingItemIndex].quantity > 1) {
        // decrease the quantity if it's greater than 1
        updatedCart[existingItemIndex].quantity -= 1; //  decrease quantity
      } else {
        updatedCart = updatedCart.filter((item) => item._id !== product._id); // remove the item if quantity is 1
      }
    }

    const total = updatePrice(updatedCart); // update total after removing items

    // remove from cart in DB -> Backend
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/v1/cart/remove`,
          { itemId: product._id }, // Send only the item ID, no need for quantity
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log("Item removed from cart in DB");
        } else {
          console.log("Error remove item from cart");
        }
      } catch (error) {
        console.log("Error removing from cart" + error);
      }
    }

    dispatch({
      type: "REMOVE",
      payload: { updatedCart, total },
    });
  };

  // clear item
  const clearItem = async (product) => {
    let updatedCart = [...state.products];

    const existingItemIndex = state.products.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity = 0;
      updatedCart = updatedCart.filter((item) => item._id !== product._id);
    }
    const total = updatePrice(updatedCart);

    // clear item from cart in DB -> Backend
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/v1/cart/clearItem`,
          { itemId: product._id }, // Send only the item ID, no need for quantity
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log("Item cleared from cart in DB");
        } else {
          console.log("Error cleared item from cart");
        }
      } catch (error) {
        console.log("Error clear item from cart" + error);
      }
    }

    dispatch({
      type: "CLEARITEM",
      payload: { updatedCart, total },
    });
  };

  // clear total cart
  const clearCart = () => {
    dispatch({
      type: "CLEARCART",
      payload: { updatedCart: [], total: 0 },
    });
  };

  // update Price
  const updatePrice = (updatedCart) =>
    updatedCart.reduce(
      (total, item) => total + (+item.price || 0) * (+item.quantity || 0),
      0
    );

  // fetch watch items form DB
  const fetchWatchItems = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/watch/list`);

      if (response.data.success) {
        setWatchItems(response.data.data);
        console.log("Watch Items Fetched");
      } else {
        console.log("Error Fetching Watch Items from DB");
      }
    } catch (error) {
      console.log("Error Fetching" + error);
    }
  };

  // fetch cart data from DB
  const fetchCart = useCallback(
    async (token) => {
      try {
        const response = await axios.get(`${url}/api/v1/cart/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          // Get cart data (which is an object)
          const cartData = response.data.cartData;

          // Convert the object into an array of products
          const productsArray = await Promise.all(
            Object.entries(cartData).map(async ([productId, quantity]) => {
              // Fetch product details by productId
              const productResponse = await axios.get(
                `${url}/api/v1/watch/watch/${productId}`
              );
              if (productResponse.data.success) {
                // Add the quantity from cartData to the product details
                return { ...productResponse.data.data, quantity };
              } else {
                // Handle error if the product is not found
                return null;
              }
            })
          );

          // Filter out any null values in case of errors fetching some products
          const filteredProducts = productsArray.filter(
            (product) => product !== null && product.quantity > 0
          );

          const total = updatePrice(filteredProducts);

          // Dispatch action to set the products array
          dispatch({
            type: "SETCART",
            payload: { filteredProducts, total },
          });

          console.log("Cart Fetched");
        }
      } catch (error) {
        console.log("Error Fetching Cart: ", error);
      }
    },
    [dispatch] // Include dispatch in the dependency array if it's used inside the callback
  );

  // save token ( while refresh the page)
  useEffect(() => {
    async function loadData() {
      await fetchWatchItems(); // fetch items when load the page

      if (localStorage.getItem("token")) {
        // if we reload the page, we will not log out
        setToken(localStorage.getItem("token"));
        await fetchCart(localStorage.getItem("token"));
      }
    }

    loadData(); // call the function

    return () => {};
  }, [fetchCart]);

  // Define the context value
  const value = {
    total: state.total, // total of the cart
    products: state.products, // cart
    watchItems, // All Data -> js Array
    addToCart,
    removeFromCart,
    updatePrice,
    clearItem,
    clearCart,
    url, // backend url
    token, // authentication
    setToken, // authentication
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export default StoreContextProvider;
