const express = require("express");
const multer = require("multer");
const randomstring = require("randomstring");
const cors = require("cors");

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");

const PORT = 8000;
const app = express();

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
  "/users/books",
  upload.single("image"),
  (req, res, next) => {
    req.body.header = addedString + req.body.header;
    next();
  },

  bookRouter
);
