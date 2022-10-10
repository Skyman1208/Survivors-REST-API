// In src/index.js
const express = require("express");
const bodyParser = require("body-parser");

const apicache = require("apicache");
const v1SurvivorRouter = require("./v1/routes/survivorRoutes");

const app = express();

const cache = apicache.middleware;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cache("2 minutes"));
app.use("/api/v1/survivors", v1SurvivorRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});