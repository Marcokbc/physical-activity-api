const { v4: uuidv4 } = require("uuid");
const repo = require("../repository/physicalActivityRepository");

function createActivity(payload, userId) {
  const data = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    created_by: userId,
    ...payload
  };

  return repo.insertPhysicalActivity(data);
}

function listActivities() {
  return repo.getAllPhysicalActivities();
}

function getActivity(id) {
  return repo.getPhysicalActivityById(id);
}

function updateActivity(id, payload) {
  return repo.updatePhysicalActivity(id, payload);
}

function deleteActivity(id) {
  return repo.deletePhysicalActivity(id);
}

module.exports = {
  createActivity,
  listActivities,
  getActivity,
  updateActivity,
  deleteActivity
};
