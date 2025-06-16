import mongoose from "mongoose";
import orderModel from "../Models/orderModel.mjs";
import userModel from "../Models/userModel.mjs";
import Stripe from "stripe";
import "dotenv/config.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend -> for one time payment
const placeOrder = async (c, s) => {
  const frontendUrl = "http://localhost:3000";

  try {
    const newOrder = new orderModel({
      userId: c.user.id,
      items: c.body.items, // array of items
      amount: c.body.amount,
      address: c.body.address,
      payment: false, //  payment starts as false
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(c.user.id, { cartData: {} }); // Clear cart

    // create stripe payment link
    const line_items = c.body.items.map((item, i) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // add delivery charges
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // create session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment", // This tells Stripe it's a one-time payment
      metadata: { orderId: newOrder._id.toString() }, // Pass orderId
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`, // if success, redirect to this url
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`, // if cancel, redirect to this url
    });

    s.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    s.json({ success: false, message: "Payment Error" });
  }
};

// placing user order from frontend -> implement subscription
const placeSubscription = async (c, s) => {
  const frontendUrl = "http://localhost:3000";
  const { interval, items, amount, address } = c.body; // Receive interval from frontend

  try {
    // Validate that the interval is one of the allowed values
    if (!["month", "year"].includes(interval)) {
      return s
        .status(400)
        .json({ success: false, message: "Invalid subscription interval." });
    }

    const newOrder = new orderModel({
      userId: c.user.id,
      items, // array of items
      amount,
      address,
      payment: false, // payment starts as false
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(c.user.id, { cartData: {} }); // Clear cart

    // create stripe payment link for subscription
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // Create the subscription session in Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "subscription", // Set mode to subscription
      metadata: { orderId: newOrder._id.toString() }, // Pass orderId
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
      subscription_data: {
        items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Subscription Plan",
              },
              unit_amount: amount * 100, // Make sure the amount is in cents
            },
            quantity: 1,
          },
        ],
        // Set the billing interval dynamically
        recurring: { interval: interval }, // Dynamically use 'month' or 'year'
      },
    });

    s.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    s.json({ success: false, message: "Subscription Error" });
  }
};

// get order details by id
const getOrderDetails = async (c, s) => {
  try {
    const { orderId } = c.params;

    // Check if orderId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return s.json({ success: false, message: "Invalid Order ID" });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return s.json({ success: false, message: "Order not found" });
    }
    s.json({ success: true, data: order, message: "Order Fetched" });
  } catch (error) {
    console.log(error);
    s.json({ success: false, message: "Internal server error" });
  }
};

// fetch all orders
const fetchAllOrders = async (c, s) => {
  try {
    // Fetch orders where payment is true and sort by createdAt in descending order
    const successfulOrders = await orderModel
      .find({ payment: true })
      .sort({ createdAt: -1 });

    s.json({
      success: true,
      data: successfulOrders,
      message: "Successful order list is fetched",
    });
  } catch (error) {
    console.log(error);
    s.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete order
const deleteOrder = async (c, s) => {
  const { id } = c.body; //  _id
  try {
    // delete order from the DB
    await orderModel.findByIdAndDelete(id);
    s.json({ success: true, message: "Order Deleted" });
  } catch (error) {
    console.log(error);
    s.json({ success: false, message: "Internal server error" });
  }
};

// get order by userId
const getOrderByUserId = async (c, s) => {
  const userId = c.user.id; // Extract user ID from JWT (decoded in middleware)

  if (!userId) {
    return s.json({ success: false, message: "User ID is required" });
  }

  try {
    const userOrders = await orderModel
      .find({ userId: userId, payment: true })
      .sort({ createdAt: -1 });

    s.json({
      success: true,
      data: userOrders,
      message: "User's order list is fetched",
    });
  } catch (error) {
    console.log(error);
    s.json({ success: false, message: "Internal server error" });
  }
};

// update tracking
const updateTracking = async (c, s) => {
  try {
    const { orderId } = c.params;
    const { step, details } = c.body;

    // Create a new tracking entry
    const newTrackingStep = {
      step,
      timestamp: new Date(),
      details,
    };

    // Find and update the order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { $push: { tracking: newTrackingStep } }, // Push new tracking data
      { new: true } // Return updated document
    );

    if (!updatedOrder) {
      return s.json({ success: false, message: "Order not found" });
    }

    s.json({ success: true, message: "Tracking Updated", data: updatedOrder });
  } catch (error) {
    console.error("Error updating tracking:", error);
    s.json({ success: false, message: "Server error" });
  }
};

const getTrackingDetailsById = async (c, s) => {
  try {
    const userId = c.user.id; // Extract user ID from JWT (decoded in middleware)

    if (!userId) {
      return s.json({ success: false, message: "User ID is required" });
    }

    const order = await orderModel
      .findOne({
        userId: userId,
        payment: true,
      })
      .lean();

    if (!order) {
      return s.json({ success: false, message: "Order not found" });
    }

    s.json({
      success: true,
      data: order.tracking, // Return only the tracking array
      message: "User's tracking details are fetched",
    });
  } catch (error) {
    console.error("Error getting tracking details:", error);
    s.json({ success: false, message: "Server error" });
  }
};

// Webhook for handling Stripe events -----------------------------------------------------------------------------------------
const stripeWebhook = async (c, s) => {
  const sig = c.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(c.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return s
      .status(400)
      .json({ success: false, message: `Webhook Error: ${err.message}` });
  }

  // Extract common data
  const eventType = stripeEvent.type;
  const eventData = stripeEvent.data.object;
  const orderId = eventData.metadata?.orderId; // Retrieve orderId from metadata (if available)
  const customerId = eventData.customer; // Get customer ID from the event

  try {
    switch (eventType) {
      // Handling Checkout session completion
      case "checkout.session.completed":
        console.log(`Checkout session ${eventData.id} completed!`);
        if (orderId) {
          await orderModel.findByIdAndUpdate(orderId, {
            payment: true,
            status: "Payment Successful",
          });
          console.log(`Order ${orderId} marked as paid.`);
        }
        if (customerId) {
          await userModel.findOneAndUpdate(
            { stripeCustomerId: customerId },
            {
              stripeCustomerId: customerId,
              subscriptionStatus: "Inactive", // Inactive for one-time payments
            }
          );
          console.log(
            `User updated with Stripe customerId and subscriptionStatus.`
          );
        }
        s.json({
          success: true,
          message: `Order ${orderId} marked as paid.`,
        });
        break;

      // Handling Payment Intent succeeded
      case "payment_intent.succeeded":
        console.log(`PaymentIntent ${eventData.id} succeeded!`);
        if (orderId) {
          await orderModel.findByIdAndUpdate(orderId, { status: "Paid" });
          console.log(`Order ${orderId} status updated to Paid.`);
        }
        if (customerId) {
          await userModel.findOneAndUpdate(
            { stripeCustomerId: customerId },
            { stripeCustomerId: customerId, subscriptionStatus: "Inactive" }
          );
          console.log(`User updated with Stripe customerId.`);
        }
        s.json({
          success: true,
          message: `Order ${orderId} payment succeeded.`,
        });
        break;

      // Handling Charge succeeded
      case "charge.succeeded":
        console.log(`Charge ${eventData.id} succeeded!`);
        if (orderId) {
          await orderModel.findByIdAndUpdate(orderId, { status: "Paid" });
          console.log(`Order ${orderId} status updated to Paid.`);
        }
        s.json({
          success: true,
          message: `Charge ${eventData.id} succeeded for order ${orderId}.`,
        });
        break;

      // Handling Payment Intent created
      case "payment_intent.created":
        console.log(`PaymentIntent ${eventData.id} created!`);
        // This is just a log, no database updates needed.
        s.json({
          success: true,
          message: `PaymentIntent ${eventData.id} created.`,
        });
        break;

      // Handling Charge updated
      case "charge.updated":
        console.log(`Charge ${eventData.id} updated!`);
        if (orderId) {
          await orderModel.findByIdAndUpdate(orderId, { status: "Updated" });
          console.log(`Order ${orderId} status updated to Updated.`);
        }
        s.json({
          success: true,
          message: `Charge ${eventData.id} updated.`,
        });
        break;

      // Handling Payment Intent failed
      case "payment_intent.payment_failed":
        console.log(`PaymentIntent ${eventData.id} failed.`);
        if (orderId) {
          await orderModel.findByIdAndUpdate(orderId, {
            status: "Payment Failed",
          });
          console.log(`Order ${orderId} marked as Payment Failed.`);
        }
        s.json({
          success: false,
          message: `Order ${orderId} payment failed.`,
        });
        break;

      // Handling Subscription related events
      case "invoice.payment_succeeded":
        console.log(`Invoice ${eventData.id} payment succeeded!`);
        if (customerId) {
          await userModel.findOneAndUpdate(
            { stripeCustomerId: customerId },
            { subscriptionStatus: "Active" }
          );
          console.log(
            `User with Stripe ID ${customerId} subscription activated.`
          );
        }
        s.json({
          success: true,
          message: `User subscription activated for customer ${customerId}.`,
        });
        break;

      case "invoice.payment_failed":
        console.log(`Invoice ${eventData.id} payment failed.`);
        if (customerId) {
          await userModel.findOneAndUpdate(
            { stripeCustomerId: customerId },
            { subscriptionStatus: "Past Due" }
          );
          console.log(
            `User with Stripe ID ${customerId} subscription marked as Past Due.`
          );
        }
        s.json({
          success: false,
          message: `Subscription payment failed for customer ${customerId}.`,
        });
        break;

      case "customer.subscription.created":
        console.log(
          `Subscription ${eventData.id} created for customer ${eventData.customer}!`
        );
        if (customerId) {
          await userModel.findOneAndUpdate(
            { stripeCustomerId: customerId },
            { subscriptionStatus: "Active" }
          );
          console.log(
            `User with Stripe ID ${customerId} subscription started.`
          );
        }
        s.json({
          success: true,
          message: `Subscription created for user ${customerId}.`,
        });
        break;

      case "customer.subscription.deleted":
        console.log(`Subscription ${eventData.id} canceled.`);
        if (customerId) {
          await userModel.findOneAndUpdate(
            { stripeCustomerId: customerId },
            { subscriptionStatus: "Canceled" }
          );
          console.log(
            `User with Stripe ID ${customerId} subscription canceled.`
          );
        }
        s.json({
          success: true,
          message: `Subscription canceled for user ${customerId}.`,
        });
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
        s.json({
          success: false,
          message: `Unhandled event type: ${eventType}`,
        });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    s.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  placeOrder,
  placeSubscription,
  getOrderDetails,
  fetchAllOrders,
  deleteOrder,
  getOrderByUserId,
  updateTracking,
  getTrackingDetailsById,
  stripeWebhook,
};
