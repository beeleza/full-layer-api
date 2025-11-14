const { Sequelize, Model } = require("sequelize");

class BaseRepository {
  constructor(model) {
    if (!model) {
      throw new Error("Model must be provided for BaseRepository");
    }
    this.Model = model;
  }

  async create(data) {
    try {
      return await this.Model.create(data);
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await this.Model.findByPk(id);
    } catch (error) {
      throw new Error(`Error finding record by ID: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await this.Model.findAll(options);
    } catch (error) {
      throw new Error(`Error finding all records: ${error.message}`);
    }
  }

  async findOne(where = {}, options = {}) {
    try {
      return await this.Model.findOne({
        where,
        ...options,
      });
    } catch (error) {
      throw new Error(`Error finding one record: ${error.message}`);
    }
  }

  async find(where = {}, options = {}) {
    try {
      return await this.Model.findAll({
        where,
        ...options,
      });
    } catch (error) {
      throw new Error(`Error finding records: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      const record = await this.findById(id);
      if (!record) {
        return null;
      }
      return await record.update(data);
    } catch (error) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const record = await this.findById(id);
      if (!record) {
        return false;
      }
      await record.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting record: ${error.message}`);
    }
  }

  async count(where = {}) {
    try {
      return await this.Model.count({ where });
    } catch (error) {
      throw new Error(`Error counting records: ${error.message}`);
    }
  }

  async paginate({ page = 1, limit = 10, where = {}, order = [] }) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await this.Model.findAndCountAll({
        where,
        limit,
        offset,
        order,
      });

      return {
        data: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: limit,
          hasNext: page < Math.ceil(count / limit),
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw new Error(`Error in pagination: ${error.message}`);
    }
  }
}

module.exports = BaseRepository;
