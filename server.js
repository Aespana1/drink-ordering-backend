require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let orders = []; // Store orders temporarily (for testing)

// Default route to check if backend is running
app.get("/", (req, res) => {
  res.send("Backend is working! 🚀");
});

// Route: Get all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Route: Place an order
app.post("/order", (req, res) => {
  const { drink, tip } = req.body;
  if (!drink) {
    return res.status(400).json({ error: "Drink selection is required." });
  }
  const newOrder = { id: orders.length + 1, drink, tip, status: "pending" };
  orders.push(newOrder);
  res.json({ message: "Order placed successfully!", order: newOrder });
});

// Route: Mark order as completed
app.post("/complete-order", (req, res) => {
  const { id } = req.body;
  const order = orders.find((order) => order.id === id);
  if (order) {
    order.status = "completed";
    return res.json({ message: "Order completed!", order });
  }
  res.status(404).json({ error: "Order not found." });
});

// Fix port issue for Render
const PORT = process.env.PORT || 5000;
app.get("/debug-routes", (req, res) => {
  res.json(app._router.stack.filter(r => r.route).map(r => r.route.path));
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

