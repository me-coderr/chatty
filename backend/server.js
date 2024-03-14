const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const cors = require("cors");

const app = express();

console.log(process.env.PORT);

const allowedOrigins = [
  "https://main--lucky-torrone-096748.netlify.app/",
  "https://chatty-1.onrender.com/",
  "https://localhost:5173",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

connectDB();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/api/test/", (req, res) => {
  console.log("server is listening to the client, test success");
  const origin = req.get("Origin") || req.headers.origin;
  console.log("client hit this endpoint : ", origin);
  res.status(200).send({ data: "all good" });
});

app.get("/api/home", (req, res) => {
  res.send("API is running");
});

//  ---------------- deploymeny --------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// ------------------------------------------------

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    // origin: "https://chatty-1.onrender.com"
    origin: function (origin, callback) {
      // Check if the origin is allowed
      if (
        origin === "http://localhost:5173" || // Update with your localhost link
        origin === "https://chatty-1.onrender.com"
      ) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Deny the origin
      }
    },
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.io.");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    if (!chat.users) {
      return;
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) {
        return;
      }

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
