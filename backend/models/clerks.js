const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Clerks extends Model {}

Clerks.init(
  {
    clerk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "employees",
        key: "employee_id",
      },
    },
    shift_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    last_voc: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "clerks",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Clerks;
