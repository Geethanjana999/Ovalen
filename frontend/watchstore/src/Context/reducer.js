// inital State
export const initialState = {
  total: 0.0,
  products: [],
};
// reducer function
const storeReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
    case "REMOVE":
    case "CLEARITEM":
      return {
        ...state,
        products: action.payload.updatedCart, // update cart
        total: action.payload.total, // update total
      };

    case "CLEARCART":
      return {
        ...state,
        products: action.payload.updatedCart,
        total: action.payload.total,
      };

    case "SETCART":
      return {
        ...state,
        products: action.payload.filteredProducts, // the array of product details
        total: action.payload.total,
      };
    default:
      throw Error("Not Found");
  }
};

export default storeReducer;
