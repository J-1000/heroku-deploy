require('dotenv').config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Controllers
const siteController = require("./routes/siteController");
const locationController = require("./routes/locationController");

// Mongoose configuration
mongoose.connect(process.env.MONGO_DB_URI);

// Middlewares configuration
app.use(logger("dev"));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication
app.use(session({
  secret: "deploy-exercise",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60   // 1 day
  })
}));
app.use(cookieParser());

// Routes
app.use("/", siteController);
app.use("/locations", locationController);

// Error handlers
// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Development error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("site/error");
});

module.exports = app;
