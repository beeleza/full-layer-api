const BaseRepository = require("../base/");
const { Category } = require("../../db/models");

/**
 * CategoryRepository - Handles database operations for Category entity
 *
 * Inherits all CRUD operations from BaseRepository:
 * - create, findById, findAll, update, delete, etc.
 *
 * Usage example:
 * const repo = new CategoryRepository();
 * const categories = await repo.findAll();
 * const category = await repo.findById(1);
 */
class CategoryRepository extends BaseRepository {
  constructor() {
    // Passes Category model to BaseRepository
    super(Category);
  }
}

module.exports = CategoryRepository;
