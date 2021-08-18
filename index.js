const express = require("express");
const userRouter = require("./routes/user");
const PORT = 8000;
const app = express();

app.use(express.json());

try {
  console.log("Connection has been established successfully.");
  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use("/users", userRouter);
