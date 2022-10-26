// In src/services/survivorService.js
const { v4: uuid } = require("uuid");
const Survivor = require("../database/Survivors");

const getAllSurvivors = (filterParams) => {
  try {
    const allSurvivors = Survivor.getAllSurvivors(filterParams);
    return allSurvivors;
  } catch (error) {
    throw error;
  }
};

const getReports = () => {
  try {
    const reports = Survivor.getReports();
    return reports;
  } catch (error) {
    throw error;
  }
};

const getOneSurvivor = (survivorId) => {
  try {
    const survivor = Survivor.getOneSurvivor(survivorId);
    return survivor;
  } catch (error) {
    throw error;
  }
};

const createNewSurvivor = (newSurvivor) => {
  const survivorToInsert = {
    ...newSurvivor,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdSurvivor = Survivor.createNewSurvivor(survivorToInsert);
    return createdSurvivor;
  } catch (error) {
    throw error;
  }
};

const updateOneSurvivor = (survivorId, changes) => {
  try {
    const updatedSurvivor = Survivor.updateOneSurvivor(survivorId, changes);
    return updatedSurvivor;
  } catch (error) {
    throw error;
  }
};

const deleteOneSurvivor = (survivorId) => {
  try {
    Survivor.deleteOneSurvivor(survivorId);
  } catch (error) {
    throw error;
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