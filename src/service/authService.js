const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { sign } = require("../utils/auth");
const { createUser, findUserByUsername } = require("../repository/userReposiory");

const saltRounds = 10;

async function registerUser(username, password) {
  const existing = await findUserByUsername(username);
  if (existing) throw new Error("username_taken");

  const id = uuidv4();
  const created_at = new Date().toISOString();
  const password_hash = await bcrypt.hash(password, saltRounds);

  return createUser({ id, username, password_hash, created_at });
}

async function loginUser(username, password) {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("invalid_credentials");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("invalid_credentials");

  const token = sign({ id: user.id, username: user.username });

  return {
    token,
    user: { id: user.id, username: user.username }
  };
}

module.exports = { registerUser, loginUser };
