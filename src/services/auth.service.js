import prisma from "../config/prisma.js";
import { AppError } from "../utils/app-error.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export async function register(data) {
  const { name, email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("Email Sudah Di Gunakan", 400);
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashed,
    },
  });

  return { id: user.id, email: user.email };
}

export async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError("User Not Found", 404);

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new AppError("Invalid Password", 401);

  const token = generateToken({ id: user.id, role: user.role });
  return { token };
}
