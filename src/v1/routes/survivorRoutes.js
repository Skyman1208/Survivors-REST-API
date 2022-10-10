// In src/v1/routes/survivorRoutes.js
const express = require("express");
const survivorController = require("../../controllers/survivorController");

const router = express.Router();

router.get("/", survivorController.getAllSurvivors);

router.get("/:survivorId", survivorController.getOneSurvivor);

router.post("/", survivorController.createNewSurvivor);

router.patch("/:survivorId", survivorController.updateOneSurvivor);

router.delete("/:survivorId", survivorController.deleteOneSurvivor);

module.exports = router;