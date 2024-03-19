const dynamo = require("dynamodb");
const Joi = require("joi");

class Cat {
  constructor() {
    this.tableName = "cat";
    this.tableSchema = dynamo.define(this.tableName, {
      hashKey: "id",
      timestamps: true,
      schema: {
        id: Joi.string(),
        name: Joi.string(),
        kind: Joi.string(),
        createdAt: Joi.number().default(new Date().getTime()),
      },
    });
  }

  create(item, callback) {
    return this.tableSchema.create(item, callback);
  }
  getAll(callback) {
    return this.tableSchema.scan().loadAll().exec(callback);
  }
  getById(id, callback) {
    return this.tableSchema.get(id, callback);
  }
  update(newItem, callback) {
    return this.tableSchema.update(newItem, callback);
  }
  deleteById(id, callback) {
    return this.tableSchema.destroy(id, callback);
  }
}

module.exports = new Cat();
