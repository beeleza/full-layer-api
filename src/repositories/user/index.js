const BaseRepository = require("../base");
const bcryptjs = require("bcryptjs");

/**
 * UserRepository - Handles database operations for User entity
 *
 * Extends BaseRepository with user-specific methods for:
 * - User registration with password hashing
 * - User login validation
 *
 * Usage example:
 * const repo = new UserRepository(UserModel);
 * const user = await repo.createUser({ name, email, password });
 * const validUser = await repo.validateUserLogin(email, password);
 */
class UserRepository extends BaseRepository {
  constructor(UserModel) {
    super(UserModel);
  }

  /**
   * Creates a new user with hashed password
   */
  async createUser(data) {
    const { name, email, password, imageUrl } = data;

    try {
      const existing = await this.findOne({ email });
      if (existing) {
        throw new Error("Email already registered");
      }

      const hashed = await bcryptjs.hash(password, 10);

      return await this.create({ name, email, password: hashed, imageUrl });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validates user login credentials
   * Returns user if valid, null if invalid
   */
  async validateUserLogin(email, password) {
    const user = await this.findOne({ email });
    if (!user) return null;

    const match = await bcryptjs.compare(password, user.password);
    if (!match) return null;

    return user;
  }
}

module.exports = UserRepository;
