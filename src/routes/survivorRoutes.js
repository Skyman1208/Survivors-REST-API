// In src/routes/survivorRoutes.js
const express = require("express");
const survivorController = require("../controllers/survivorController");

const router = express.Router();

router.get("/records", survivorController.getAllSurvivors);

router.get("/reports", survivorController.getReports);

router.get("/:survivorId", survivorController.getOneSurvivor);

router.post("/registration", survivorController.createNewSurvivor);

router.patch("/:survivorId", survivorController.updateOneSurvivor);

router.delete("/:survivorId", survivorController.deleteOneSurvivor);

module.exports = router;