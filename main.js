import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes/users.js";
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 5173;

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/auth", router);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//STRIPE API BACKEND LOGIC
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const subTiers = new Map([
  [1, { priceInCents: 1000, name: "PT Cruiser | Subscription Tier 1" }],
  [2, { priceInCents: 3000, name: "Chevelle | Subscription Tier 2" }],
  [3, { priceInCents: 5000, name: "Testarossa | Subscription Tier 3" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const subTier = subTiers.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: subTier.name,
            },
            unit_amount: subTier.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}Success`,
      cancel_url: `${process.env.SERVER_URL}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Mongo DB connection with Mongoose

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(PORT, () => console.log("Server started"));
  } catch (error) {
    console.log(error.message);
  }
};

start();
