// In src/controllers/survivorController.js
const survivorService = require("../services/survivorService");

const getAllSurvivors = (req, res) => {
  const { mode } = req.query;
  try {
    const allSurvivors = survivorService.getAllSurvivors({ mode });
    res.send({ status: "OK", data: allSurvivors });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getReports = (req, res) => {
  try {
    const dataDetails = survivorService.getReports();
    res.send({ status: "OK", reports: dataDetails[0], data: dataDetails[1]});
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneSurvivor = (req, res) => {
  const {
    params: { survivorId },
  } = req;
  if (!survivorId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':survivorId' can not be empty" },
      });
  }
  try {
    const survivor = survivorService.getOneSurvivor(survivorId);
    res.send({ status: "OK", data: survivor });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewSurvivor = (req, res) => {
  const { body } = req;
  if (!body.name || !body.age || !body.gender || !body.lastLocation || !body.inventory) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'age', 'gender', 'lastLocation', 'inventory'",
        },
      });
    return;
  }

  const newSurvivor = {
    name: body.name,
    age: body.age,
    gender: body.gender,
    lastLocation: body.lastLocation,
    inventory: body.inventory,
  };
  try {
    const createdSurvivor = survivorService.createNewSurvivor(newSurvivor);
    // console.log(createdSurvivor);
    res.status(201).send({ status: "OK", data: createdSurvivor });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneSurvivor = (req, res) => {
  const {body, params: { survivorId }} = req;
  if (!survivorId) {
    res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':survivorId' can not be empty" },
      });
  }
  try {
    const updatedSurvivor = survivorService.updateOneSurvivor(survivorId, body);
    res.send({ status: "OK", data: updatedSurvivor });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneSurvivor = (req, res) => {
  const {
    params: { survivorId },
  } = req;
  if (!survivorId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':survivorId' can not be empty" },
      });
  }
  try {
    survivorService.deleteOneSurvivor(survivorId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllSurvivors,
  getReports,
  getOneSurvivor,
  createNewSurvivor,
  updateOneSurvivor,
  deleteOneSurvivor,
};