const service = require("../service/physicalActivitiesService");

async function list(request, h) {
  return h.response(await service.listActivities());
}

async function create(request, h) {
  const userId = request.auth.credentials.id;
  const activity = await service.createActivity(request.payload, userId);
  return h.response(activity).code(201);
}

async function get(request, h) {
  const item = await service.getActivity(request.params.id);
  if (!item) return h.response({ error: "not_found" }).code(404);
  return h.response(item);
}

async function update(request, h) {
  const res = await service.updateActivity(request.params.id, request.payload);
  if (!res || res.changes === 0)
    return h.response({ error: "not_found" }).code(404);
  return h.response({ updated: true });
}

async function remove(request, h) {
  const res = await service.deleteActivity(request.params.id);
  if (!res || res.changes === 0)
    return h.response({ error: "not_found" }).code(404);
  return h.response({ deleted: true });
}

module.exports = { list, create, get, update, remove };
