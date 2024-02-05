const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const { chats } = require("./data");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

connectDB();
app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/home", (req, res) => {
  res.send("API is running");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const requestedChat = chats.find((chat) => chat._id === req.params.id);
  res.send(requestedChat);
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
