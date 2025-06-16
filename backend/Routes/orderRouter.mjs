import { Router } from "express";

import {
  placeOrder,
  placeSubscription,
  getOrderDetails,
  fetchAllOrders,
  deleteOrder,
  getOrderByUserId,
  updateTracking,
  getTrackingDetailsById,
  stripeWebhook,
} from "../Controllers/orderController.mjs";
import authMiddleware from "./../Middleware/authMiddleware.mjs";

const orderRouter = Router();

// place order
orderRouter.post("/placeorder", authMiddleware, placeOrder);
// place subscription
orderRouter.post("/subscription", authMiddleware, placeSubscription);
// get order details
orderRouter.get("/details/:orderId", getOrderDetails); // for Admin
// fetch all orders
orderRouter.get("/list", fetchAllOrders); // for Admin
// delete order
orderRouter.post("/remove", deleteOrder); // for Admin
// get order by user Id
orderRouter.get("/my", authMiddleware, getOrderByUserId); // for user
// track order
orderRouter.put("/tracking/:orderId", updateTracking); // for Admin
// get tracking information by order id
orderRouter.get("/my/details/:orderId", authMiddleware, getTrackingDetailsById); // for user
// Webhook for handling Stripe events
orderRouter.post("/webhook", stripeWebhook);

export default orderRouter;
