import prisma from "../config/prisma.js";

export const userRepository = {
  findActiveById(id, select) {
    return prisma.user.findFirst({
      where: {
        id: Number(id),
        deletedAt: null,
      },
      select,
    });
  },

  findById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
    });
  },

  findActiveByEmail(email) {
    return prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  },

  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  updateById(id, data, select) {
    return prisma.user.update({
      where: { id: Number(id) },
      data,
      select,
    });
  },

  softDelete(id) {
    return prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
      select: { id: true, deletedAt: true },
    });
  },

  restore(id) {
    return prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: null },
      select: { id: true, updatedAt: true },
    });
  },

  findAll({ skip, take }) {
    return prisma.user.findMany({
      skip,
      take,
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  countActive() {
    return prisma.user.count({
      where: { deletedAt: null },
    });
  },

  findAllDeleted({ skip, take }) {
    return prisma.user.findMany({
      skip,
      take,
      where: {
        deletedAt: { not: null },
      },
      orderBy: {
        deletedAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        deletedAt: true,
      },
    });
  },

  countDeleted() {
    return prisma.user.count({
      where: {
        deletedAt: { not: null },
      },
    });
  },
};
