// In src/database/Survivor.js
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllSurvivors = (filterParams) => {
  try {
    let survivors = DB.survivors;
    if (filterParams.mode) {
      return DB.survivors.filter((survivor) =>
        survivor.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    return survivors;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getReports = (filterParams) => {
  try {
    let survivors = DB.survivors;
    if (filterParams.mode) {
      return DB.survivors.filter((survivor) =>
        survivor.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    return survivors;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneSurvivor = (survivorId) => {
  try {
    const survivor = DB.survivors.find((survivor) => survivor.id === survivorId);
    if (!survivor) {
      throw {
        status: 400,
        message: `Can't find survivor with the id '${survivorId}'`,
      };
    }
    return survivor;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewSurvivor = (newSurvivor) => {
  try {
    const isAlreadyAdded =
      DB.survivors.findIndex((survivor) => survivor.name === newSurvivor.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Survivor with the name '${newSurvivor.name}' already exists`,
      };
    }
    DB.survivors.push(newSurvivor);
    saveToDatabase(DB);
    return newSurvivor;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneSurvivor = (survivorId, changes) => {
  try {
    const isAlreadyAdded =
      DB.survivors.findIndex((survivor) => survivor.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Survivor with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.survivors.findIndex(
      (survivor) => survivor.id === survivorId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find survivor with the id '${survivorId}'`,
      };
    }
    const updatedSurvivor = {
      ...DB.survivors[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.survivors[indexForUpdate] = updatedSurvivor;
    saveToDatabase(DB);
    return updatedSurvivor;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneSurvivor = (survivorId) => {
  try {
    const indexForDeletion = DB.survivors.findIndex(
      (survivor) => survivor.id === survivorId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find survivor with the id '${survivorId}'`,
      };
    }
    DB.survivors.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllSurvivors,
  getReports,
  createNewSurvivor,
  getOneSurvivor,
  updateOneSurvivor,
  deleteOneSurvivor,
};