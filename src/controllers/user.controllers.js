import * as userService from "../services/user.service.js";

export async function getMe(req, res, next) {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
