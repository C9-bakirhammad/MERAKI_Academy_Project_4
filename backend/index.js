const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const { Server } = require("socket.io");
const messageHandle = require("./controllers/message");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//import Routers >>
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const roleRouter = require("./routes/roles");

// use Routers
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/role", roleRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

/* ------------------------------------- */

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

/* ------------------------------------- */

const io = new Server(server, { cors: { origin: "*" } });
// const userio = io.of("/users");
// const adminio = io.of("/admind");

// const users={}
let users = [];
/* io level MW runs one time only on handshake */
io.use((socket, next) => {
  console.log(typeof socket.handshake.headers.token);
  socket.handshake.headers.token
    ? (socket.join("room-" + socket.handshake.headers.userid),
      (socket.user = {
        token: socket.handshake.headers.token,
        user: socket.handshake.headers.userid,
        id: socket.id,
      }),
      next())
    : next(new Error("invalid token"));
});

io.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);
  /* socket level MW  runs every time the event happens*/
  socket.use((socket, next) => {
    // socket is and array of 2 indexes 0=event 1=obj of json
    if (socket[0] !== "message") {
      next(new Error(`you are not sending a msg but ${socket[0]} instead`));
    }
    next();
  });
  /* socket level MW */
  /* ================================================== */
  /* error handeling socket MW */
  socket.on("error", (error) => {
    socket.emit("error", { error: error.message });
  });

  /* error handeling socket MW */

  const UserId = socket.handshake.headers.userid;
  users.push({ socketId: socket.id, UserId });
  // users[UserId]={socketId:socket.id,UserId}
  console.log(users);
  messageHandle(socket, io);
  socket.on("disconnect", () => {
    console.log(`${socket.id} is disconnected`);
    users = users.filter((user) => user.socketId !== socket.id);
    // for (const key in users) {
    //   if (users[key].socketId===socket.id) {
    //    delete users[key]

    //   }
    // }
  });
});
