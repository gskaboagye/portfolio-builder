const express = require("express");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");

const swaggerSpec = require("./swagger/swagger");
const { connectDB } = require("./database/connect");

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/user", require("./routes/user"));
app.use("/theme", require("./routes/theme"));

app.get("/", (req, res) => {
  res.send("Portfolio Builder API");
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
});