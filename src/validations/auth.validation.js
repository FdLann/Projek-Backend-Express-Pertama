import { AppError } from "../utils/app-error.js";

export function validateRegister(data) {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw new AppError("Name, Email dan Password harus di isi", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 character", 400);
  }
}

export function validatelogin(data) {
  const { email, password } = data;

  if (!email || !password) {
    throw new AppError("Email dan Password harus di isi", 400);
  }
}
