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

export async function getAllUsers(query) {
  let { page = 1, limit = 10 } = query;

  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
  ]);
  const totalPages = Math.ceil(total / limit);

  return {
    users,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

export async function promoteUserRole(userId) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    throw new AppError("User Not Found", 404);
  }
  if (user.role === "ADMIN") {
    throw new AppError("User Already an Admin", 400);
  }

  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: { role: "ADMIN" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return updateUser;
}

export async function updateUserRole(userId, role) {
  if (!["ADMIN", "USER"].includes(role)) {
    throw new AppError("Invalid Role", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  return prisma.user.update({
    where: { id: Number(userId) },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}
