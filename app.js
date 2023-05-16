require("dotenv").config();

require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);
require('./config/session.config')(app)

const projectName = "project-2-backend";

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);
const apiRoutes = require("./routes/api.routes")
app.use("/", apiRoutes)
const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes)

require("./error-handling")(app);

module.exports = app;
