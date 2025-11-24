const { registerUser, loginUser } = require("../service/authService");

async function register(request, h) {
  try {
    const { username, password } = request.payload;
    const user = await registerUser(username, password);
    return h.response({ user }).code(201);
  } catch (err) {
    const status = err.message === "username_taken" ? 400 : 500;
    return h.response({ error: err.message }).code(status);
  }
}

async function login(request, h) {
  try {
    const { username, password } = request.payload;
    const result = await loginUser(username, password);
    return h.response(result);
  } catch (err) {
    return h.response({ error: err.message }).code(401);
  }
}

module.exports = { register, login };
