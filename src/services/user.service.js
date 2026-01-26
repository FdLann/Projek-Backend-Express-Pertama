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

export async function updateProfile(userId, data) {
  const { name, email } = data;

  if (!name && !email) {
    throw new AppError("Nothing to Update", 400);
  }
  if (email) {
    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing && existing.id !== userId) {
      throw new AppError("Email Sudah Digunakan", 400);
    }
  }
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name && { name }),
      ...(email && { email }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}

export async function deleteUserByAdmin(userId) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  await prisma.user.delete({
    where: { id: user.id },
  });

  return { message: "User Deleted Succeessfully" };
}
