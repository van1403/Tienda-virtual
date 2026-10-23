import { prisma } from '../config/prisma.js';

export const CategoryRepository = {
  findAll: async () => {
    return await prisma.category.findMany();
  },
  
  create: async (data) => {
    return await prisma.category.create({
      data
    });
  }
};