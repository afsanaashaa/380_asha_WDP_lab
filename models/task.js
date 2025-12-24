'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Task extends Model {
    static associate(models) {
      // define associations here if needed
    }
  }

  Task.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('pending','in-progress','completed'),
      defaultValue: 'pending'
    },
    priority: {
      type: DataTypes.ENUM('low','medium','high'),
      defaultValue: 'medium'
    },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',   // map createdAt to created_at
    updatedAt: 'updated_at',   // map updatedAt to updated_at
    paranoid: true,
    deletedAt: 'deleted_at'    // map deletedAt to deleted_at
  });

  return Task;
};
