const BaseRepository = require("../base");
const { Product } = require("../../db/models");

/**
 * ProductRepository - Handles database operations for Product entity
 *
 * Inherits all CRUD operations from BaseRepository:
 * - create, findById, findAll, update, delete, paginate, etc.
 *
 * Usage example:
 * const repo = new ProductRepository();
 * const products = await repo.findAll();
 * const product = await repo.findById(1);
 */
class ProductRepository extends BaseRepository {
  constructor() {
    // Passes Product model to BaseRepository
    super(Product);
  }
}

module.exports = ProductRepository;
