const express = require("express");
const cors = require("cors")
const userRouter = require("./routes/user");

const PORT = 8000;
const app = express();

app.use(cors())
app.use(express.json());

try {
  app.listen(PORT);
} catch (error) {
  res.json({ message: "ServerError" });
}

app.use("/users", userRouter);
