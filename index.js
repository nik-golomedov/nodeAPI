const express = require("express");
const multer = require("multer");
const randomstring = require("randomstring");
const cors = require("cors");

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const categoryRouter = require("./routes/category");
const favouritesRouter = require("./routes/favourites");
const ratingRouter = require("./routes/rating");
const reviewRouter = require("./routes/review");

const PORT = 8000;
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const events = require("events");

io.on("connection", function (socket) {
  socket.on("hello", (arg) => {
    console.log(arg);
  });
  console.log("Someone has connected");
  const eventEmitter = new events.EventEmitter();
  eventEmitter.on("newEvent", (msg) => {
    socket.broadcast.emit("bookAdded", msg);
  });

  exports.emitter = eventEmitter;
});

httpServer.listen(7000, () => {
  console.log("Server io run");
});
let addedString = randomstring.generate();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, addedString + originalname);
  },
});
const upload = multer({ storage: storage });
app.use(cors());

app.use(express.json());
app.use(express.static("uploads"));

try {
  app.listen(PORT);
} catch (error) {
  console.log(error);
}

app.use("/users", userRouter);
app.use(
  "/books",
  upload.single("image"),
  (req, res, next) => {
    req.body.header && (req.body.header = addedString + req.body.header);
    next();
  },
  bookRouter
);
app.use("/favourites", favouritesRouter);
app.use("/rating", ratingRouter);
app.use("/review", reviewRouter);
app.use("/category", categoryRouter);
