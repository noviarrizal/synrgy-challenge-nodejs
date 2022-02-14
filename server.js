const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//serve static files
// app.use("/", express.static(path.join(__dirname, "/public")));

// Set up EJS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("/", express.static(path.join(__dirname, "/public")));

// // Routes
// app.use("/home", require("./routes/homepageRoutes"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("./views/index");
});

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port : ${port}`));
