const Joi = require("joi");
const ctrl = require("../controller/physicalActivityController");
const {
  PhysicalActivity,
  PhysicalActivityCreatePayload,
  PhysicalActivityUpdatePayload,
} = require("../models");
const { requireAuth } = require("../utils/auth");

module.exports = [
  {
    method: "GET",
    path: "/physical-activities",
    options: {
      tags: ["api", "physical-activities"],
      description: "List all physical activities",
      notes:
        "Returns all registered physical activities ordered by creation date.",
      response: { schema: Joi.array().items(PhysicalActivity) },
    },
    handler: ctrl.list,
  },
  {
    method: "POST",
    path: "/physical-activities",
    options: {
      tags: ["api", "physical-activities"],
      description: "Create a new physical activity",
      notes:
        "Requires authentication. Creates a physical activity and stores the user who created it.",
      pre: [{ method: requireAuth }],
      validate: { payload: PhysicalActivityCreatePayload },
      response: { schema: PhysicalActivity },
    },
    handler: ctrl.create,
  },
  {
    method: "GET",
    path: "/physical-activities/{id}",
    options: {
      tags: ["api", "physical-activities"],
      description: "Get a physical activity by ID",
      notes: "Returns a single physical activity if it exists.",
      response: { schema: PhysicalActivity },
    },
    handler: ctrl.get,
  },
  {
    method: "PUT",
    path: "/physical-activities/{id}",
    options: {
      tags: ["api", "physical-activities"],
      description: "Update a physical activity",
      notes: "Requires authentication. Updates only the provided fields.",
      pre: [{ method: requireAuth }],
      validate: { payload: PhysicalActivityUpdatePayload },
      response: { schema: PhysicalActivity },
    },
    handler: ctrl.update,
  },
  {
    method: "DELETE",
    path: "/physical-activities/{id}",
    options: {
      tags: ["api", "physical-activities"],
      description: "Delete a physical activity",
      notes: "Requires authentication. Deletes a physical activity by ID.",
      pre: [{ method: requireAuth }],
      response: { schema: Joi.object({ deleted: Joi.boolean() }) },
    },
    handler: ctrl.remove,
  },
];
