const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const providerRoutes = require("./routes/providerRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddlewares");

const app = express();
//dotenv conig
dotenv.config();

// mongodb connection
connectDB();
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({extended: true}))

app.use(cors());
//middlewares
app.use(express.json());
// app.use(moragan("dev"));

app.get("/", (req, res) => {
  res.send("API is running");
});

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/provider",providerRoutes)

app.use(notFound);
app.use(errorHandler);

//port
const PORT = process.env.PORT || 5000;
//listen port
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
});
