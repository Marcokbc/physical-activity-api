const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret_dev";
const EXPIRES_IN = "7d";

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

function verify(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

async function requireAuth(request, h) {
  const auth = request.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    throw Boom.unauthorized("missing_token");
  const token = auth.slice(7);
  const payload = verify(token);
  if (!payload) throw Boom.unauthorized("invalid_token");
  request.auth = { credentials: payload };
  return h.continue;
}

module.exports = { sign, verify, requireAuth };