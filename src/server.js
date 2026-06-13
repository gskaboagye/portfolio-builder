const express = require("express");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const session = require("express-session");

const swaggerSpec = require("./swagger/swagger");
const { connectDB } = require("./database/connect");
const passport = require("./config/passport");

dotenv.config();

const app = express();

app.use(express.json());

// Session Middleware
app.use(
session({
secret: process.env.SESSION_SECRET || "portfolio_secret",
resave: false,
saveUninitialized: false,
})
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger Documentation
app.use(
"/api-docs",
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);

// Authentication Routes
app.use("/auth", require("./routes/auth"));

// Collection Routes
app.use("/user", require("./routes/user"));
app.use("/theme", require("./routes/theme"));
app.use("/project", require("./routes/project"));
app.use("/skill", require("./routes/skill"));

// Home Route
app.get("/", (req, res) => {
res.send("Portfolio Builder API");
});

const PORT = process.env.PORT || 3000;

// Start server only if not running tests
if (process.env.NODE_ENV !== "test") {
connectDB().then(() => {
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
});
}

// Export app for Jest/Supertest
module.exports = app;
