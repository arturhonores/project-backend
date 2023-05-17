require("dotenv").config();

require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);
require('./config/session.config')(app)

const projectName = "project-2-backend";

app.use((req, res, next) => {
    app.locals.loggedUser = req.session.currentUser
    next()
})

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes)

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes)

const movieRoutes = require("./routes/movie.routes")
app.use("/", movieRoutes)

const seriesRoutes = require("./routes/series.routes")
app.use("/", seriesRoutes)

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes)

const eventsRoutes = require("./routes/events.routes")
app.use("/", eventsRoutes)


require("./error-handling")(app);

module.exports = app;
