import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrhandler, notFound } from "../middlewares/globalErrHandler.js";
import productRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import reviewRouter from "../routes/reviewRouter.js";
import orderRouter from "../routes/ordersRouter.js";
import accessoryRouter from "../routes/accessoriesRouter.js";
import Order from "../model/Order.js";
import articleRouter from "../routes/articleRouter.js";

//dbconnect
dbConnect();
const app = express();
//cors
app.use(cors());
//Stripe webhook
//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_c500f5c8b7247f215da7f660d3f885c2bcd69adcc685009c1938816f7cba162c";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("event"); // Log the actual event
    } catch (err) {
      console.log("err", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    if (event.type === "checkout.session.completed") {
      //update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      //find the order
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus,
        },
        {
          new: true,
        }
      );
      console.log(order);
    } else {
      return;
    }
 
  }
);


//pass incomming data
app.use(express.json());
//routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/reviews/', reviewRouter);
app.use('/api/v1/orders/', orderRouter);
app.use('/api/v1/accessories/', accessoryRouter);
app.use("/api/v1/articles", articleRouter);






//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;