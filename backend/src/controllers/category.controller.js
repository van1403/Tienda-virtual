import { CategoryService } from '../services/category.service.js';

export const CategoryController = {
  getAll: async (req, res, next) => {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const newCategory = await CategoryService.createCategory(req.body);
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      // Manejo de error si la categoría ya existe (Prisma P2002)
      if (error.code === 'P2002') {
        return res.status(400).json({ success: false, message: 'La categoría ya existe' });
      }
      next(error);
    }
  }
};