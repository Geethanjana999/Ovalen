import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
  clearItem,
} from "../Controllers/cartController.mjs";
import authMiddleware from "./../Middleware/authMiddleware.mjs";

const cartRouter = Router();

// add to cart
cartRouter.post("/add", authMiddleware, addToCart);
// remove from cart
cartRouter.post("/remove", authMiddleware, removeFromCart);
// get cart
cartRouter.get("/get", authMiddleware, getCart);
// clear item from cart
cartRouter.post("/clearItem", authMiddleware, clearItem);

export default cartRouter;
