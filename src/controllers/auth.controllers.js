import * as authService from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";
import {
  validatelogin,
  validateRegister,
} from "../validations/auth.validation.js";

export async function register(req, res, next) {
  try {
    validateRegister(req.body);
    const result = await authService.register(req.body);
    successResponse(res, result, 201);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    validatelogin(req.body);
    const result = await authService.login(req.body);
    successResponse(res, result, 200);
  } catch (err) {
    next(err);
  }
}
