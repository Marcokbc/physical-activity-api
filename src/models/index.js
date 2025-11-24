const Joi = require("joi");

const User = Joi.object({
  id: Joi.string(),
  username: Joi.string(),
  created_at: Joi.string().optional(),
}).label("User");

const LoginResponse = Joi.object({
  token: Joi.string(),
  user: User,
}).label("LoginResponse");

const RegisterResponse = Joi.object({
  user: User,
}).label("RegisterResponse");

const RegisterPayload = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
}).label("RegisterPayload");

const LoginPayload = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).label("LoginPayload");

const PhysicalActivity = Joi.object({
  id: Joi.string().optional().description("Unique identifier"),
  name: Joi.string().required().description("Activity name"),
  duration: Joi.number()
    .integer()
    .min(0)
    .allow(null)
    .description("Duration in minutes (integer)"),
  calories: Joi.number()
    .integer()
    .min(0)
    .allow(null)
    .description("Calories burned (kcal, integer)"),
  frequency: Joi.string()
    .allow("", null)
    .description("Frequency (e.g. '3x per week')"),
  difficulty: Joi.string()
    .valid("easy", "medium", "hard")
    .description("Difficulty level"),
  description: Joi.string().allow("", null).description("Detailed description"),
  created_by: Joi.string().description("Creator user id"),
  created_at: Joi.string().description("Creation ISO timestamp"),
}).label("PhysicalActivity");

const PhysicalActivityCreatePayload = Joi.object({
  name: Joi.string().required().description("Activity name"),
  duration: Joi.number()
    .integer()
    .min(0)
    .allow(null)
    .description("Duration in minutes"),
  calories: Joi.number()
    .integer()
    .min(0)
    .allow(null)
    .description("Calories burned (kcal)"),
  frequency: Joi.string()
    .allow("", null)
    .description("Frequency (e.g. '3x per week')"),
  difficulty: Joi.string()
    .valid("easy", "medium", "hard")
    .description("Difficulty level"),
  description: Joi.string().allow("", null).description("Detailed description"),
}).label("PhysicalActivityCreatePayload");

const PhysicalActivityUpdatePayload = Joi.object({
  name: Joi.string().optional().description("Activity name"),
  duration: Joi.number()
    .integer()
    .min(0)
    .allow(null)
    .description("Duration in minutes"),
  calories: Joi.number()
    .integer()
    .min(0)
    .allow(null)
    .description("Calories burned (kcal)"),
  frequency: Joi.string().allow("", null).optional().description("Frequency"),
  difficulty: Joi.string()
    .valid("easy", "medium", "hard")
    .optional()
    .description("Difficulty level"),
  description: Joi.string()
    .allow("", null)
    .optional()
    .description("Detailed description"),
}).label("PhysicalActivityUpdatePayload");

module.exports = {
  User,
  LoginResponse,
  RegisterResponse,
  RegisterPayload,
  LoginPayload,
  PhysicalActivity,
  PhysicalActivityCreatePayload,
  PhysicalActivityUpdatePayload,
};
