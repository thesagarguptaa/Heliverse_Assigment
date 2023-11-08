const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const user = require("./router/User");

app.use("/api/v1", user);

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
  console.log(`App is started at Port no ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>This is my Homepage </h1>`);
});
