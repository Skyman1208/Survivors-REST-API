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

const getReports = () => {
  try {
    let survivorsData = DB.survivors;

    const totalSurvisors = Object.keys(survivorsData).length;
    let totalInfected = 0; ; let totalNonInfected = 0;
    
    for(let survivor of survivorsData) {
      if (survivor.survivorInfectStatus == "Yes") {
        totalInfected += 1;
      } else {
        totalNonInfected += 1;
      }
    }

    percentInfected = totalInfected/totalSurvisors * 100;
    percentNonInfected = totalNonInfected/totalSurvisors * 100;

    const reports = {
      "Percentage of infected survivors": parseFloat(percentInfected).toFixed(2),
      "Percentage of non-infected survivors": parseFloat(percentNonInfected).toFixed(2)
    };

    return [reports, survivorsData];
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

    const survivorData = {
      name: newSurvivor.name,
      age: newSurvivor.age,
      gender: newSurvivor.gender,
      survivorInfectStatus: determineInfectStatus(newSurvivor.lastLocation),
      lastLocation: newSurvivor.lastLocation,
      inventory: newSurvivor.inventory,
    };

    DB.survivors.push(survivorData);
    saveToDatabase(DB);
    return newSurvivor;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneSurvivor = (survivorId, changes) => {
  try {
    const isAlreadyAdded = DB.survivors.findIndex((survivor) => survivor.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Survivor with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.survivors.findIndex((survivor) => survivor.id === survivorId);
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find survivor with the id '${survivorId}'`,
      };
    }
    
    const updatedSurvivor = {
      ...DB.survivors[indexForUpdate],
      ...changes,
      survivorInfectStatus: determineInfectStatus(changes.lastLocation),
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

function determineInfectStatus(coord) {
  // calculation of between current location and safe area
  safeCoord = {lat: 2.257710, lng: 102.252990}; // safe location

  // var R = 6.371; // km
  var R = 6371; // Radius of the earth in km
  var dLat = (coord.lat - safeCoord.lat) * (Math.PI/180);  // deg2rad below
  var dLon = (coord.lng - safeCoord.lng) * (Math.PI/180); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(safeCoord.lat * (Math.PI/180)) * Math.cos(coord.lat * (Math.PI/180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km

  infectStatus = "No";
  if(d > 5) { // Safe area in 5KM radius from safe are location
    infectStatus = "yes";
  }

  return infectStatus;
}

module.exports = {
  getAllSurvivors,
  getReports,
  createNewSurvivor,
  getOneSurvivor,
  updateOneSurvivor,
  deleteOneSurvivor,
};