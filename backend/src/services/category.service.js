import { CategoryRepository } from '../repositories/category.repository.js';

export const CategoryService = {
  getAllCategories: async () => {
    return await CategoryRepository.findAll();
  },

  createCategory: async (categoryData) => {
    // Generamos un slug automáticamente a partir del nombre
    const slug = categoryData.name.toLowerCase().replace(/ /g, '-');
    const dataWithSlug = { ...categoryData, slug };
    
    return await CategoryRepository.create(dataWithSlug);
  }
};