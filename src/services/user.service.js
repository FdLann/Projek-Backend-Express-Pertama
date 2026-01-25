import prisma from "../config/prisma.js";
import { AppError } from "../utils/app-error.js";

export async function getProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  if (!user) {
    throw new AppError("User Not Found", 404);
  }
  return user;
}
