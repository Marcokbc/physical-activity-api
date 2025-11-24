const Joi = require("joi");
const { register, login } = require("../controller/authController");
const {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse
} = require("../models");

module.exports = [
  {
    method: "POST",
    path: "/auth/register",
    options: {
      tags: ["api", "auth"],
      description: "Register a new user",
      notes: "Creates a user with username and password. Returns the created user's data.",
      validate: { payload: RegisterPayload },
      response: { schema: RegisterResponse }
    },
    handler: register
  },
  {
    method: "POST",
    path: "/auth/login",
    options: {
      tags: ["api", "auth"],
      description: "Authenticate user and generate JWT",
      notes: "Validates username and password. Returns JWT token and user info.",
      validate: { payload: LoginPayload },
      response: { schema: LoginResponse }
    },
    handler: login
  }
];

