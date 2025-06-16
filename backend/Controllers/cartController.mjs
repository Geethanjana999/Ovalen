import userModel from "./../Models/userModel.mjs";
import log from "node:console";

// add items to cart
const addToCart = async (c, s) => {
  try {
    let userData = await userModel.findOne({ _id: c.user.id }); //comes from middleware,. user.id -> _id
    let cartData = await userData.cartData;

    if (!cartData[c.body.itemId]) {
      cartData[c.body.itemId] = 1; // create new entry
    } else {
      cartData[c.body.itemId] += 1; // increase quantity
    }

    await userModel.findByIdAndUpdate(c.user.id, { cartData });

    s.json({ success: true, message: "Added to cart" });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Error add to cart" });
  }
};

// remove item from user cart
const removeFromCart = async (c, s) => {
  try {
    let userData = await userModel.findById(c.user.id); // c.user.id -> comes from middleware
    let cartData = await userData.cartData;

    if (cartData[c.body.itemId] > 0) {
      cartData[c.body.itemId] -= 1; // decrease quantity
    }

    await userModel.findByIdAndUpdate(c.user.id, { cartData });

    s.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Added to cart" });
  }
};

// fetch user cart
const getCart = async (c, s) => {
  try {
    let userData = await userModel.findById(c.user.id); // c.user.id -> comes from middleware
    let cartData = await userData.cartData;

    s.json({ success: true, message: "Cart fetched successfully", cartData });
  } catch (error) {
    console.log(error);
    s.json({ success: false, message: "Error fetching cart" });
  }
};

// clear item from the cart
const clearItem = async (c, s) => {
  try {
    let userData = await userModel.findById(c.user.id); // c.user.id -> comes from middleware
    let cartData = await userData.cartData;

    if (cartData[c.body.itemId]) {
      // Remove the item entirely
      delete cartData[c.body.itemId]; // Remove item from cartData
    }

    await userModel.findByIdAndUpdate(c.user.id, { cartData });

    s.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Added to cart" });
  }
};

export { addToCart, removeFromCart, getCart, clearItem };
