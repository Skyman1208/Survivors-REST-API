// In src/index.js
const express = require("express");
const bodyParser = require("body-parser");

const apicache = require("apicache");
const survivorRouter = require("./routes/survivorRoutes");

const app = express();

const cache = apicache.middleware;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cache("2 minutes"));
app.use("/survivors", survivorRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});