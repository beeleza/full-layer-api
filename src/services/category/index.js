const CategoryRepository = require("../../repositories/category");

/**
 * CategoryService - Handles business logic for category operations
 *
 * This service layer contains the business rules and validation
 * for category management, using the repository for data access.
 */
class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  /**
   * Create a new category with validation
   */
  async createCategory(categoryData) {
    try {
      if (!categoryData.name || !categoryData.colorHex) {
        throw new Error("Please fill in all required fields.");
      }
      return await this.categoryRepository.create(categoryData);
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  /**
   * Get category by ID, throws error if not found
   */
  async getCategoryById(id) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return category;
  }

  /**
   * List categories with pagination and filtering
   */
  async listCategories(page = 1, limit = 10, filters = {}) {
    const where = {};

    if (filters.name) {
      where.name = filters.name;
    }

    return await this.categoryRepository.paginate({
      page,
      limit,
      where,
      order: [["createdAt", "DESC"]],
    });
  }

  /**
   * Update category by ID
   */
  async updateCategory(id, updateData) {
    const updatedCategory = await this.categoryRepository.update(
      id,
      updateData
    );

    if (!updatedCategory) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return updatedCategory;
  }

  /**
   * Delete category by ID
   */
  async deleteCategory(id) {
    const deleted = await this.categoryRepository.delete(id);

    if (!deleted) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return { message: "Category deleted successfully" };
  }
}

module.exports = CategoryService;
