import prisma from "../config/prisma.js";
import * as userService from "../services/user.service.js";
import { AppError } from "../utils/app-error.js";
import { successResponse } from "../utils/response.js";

export async function getMe(req, res, next) {
  try {
    const user = await userService.getProfile(req.user.id);
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req, res, next) {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const result = await userService.deleteUserByAdmin(req.params.id);
    successResponse(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getUsers(req, res, next) {
  try {
    const result = await userService.getAllUsers(req.query);
    successResponse(res, result);
  } catch (err) {
    next(err);
  }
}

export async function promoteUser(req, res, next) {
  try {
    const user = await userService.promoteUserRole(req.params.id);
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
}

export async function updateRole(req, res, next) {
  try {
    const { role } = req.body;
    const userId = req.params.id;
    const user = await userService.updateUserRole(userId, role);
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
}

export async function deleteSoftUser(req, res, next) {
  try {
    const user = await userService.softDeleteUser(req.params.id);
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
}

export async function restoreDataUser(req, res, next) {
  try {
    const result = await userService.restoreUser(req.params.id);
    successResponse(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getDeletedUsers(req, res, next) {
  try {
    const result = await userService.getDeletedUsers(req.query);
    successResponse(res, result);
  } catch (err) {
    next(err);
  }
}
