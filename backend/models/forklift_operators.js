const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class ForkliftOperators extends Model {}

ForkliftOperators.init(
  {
    fo_id: {
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
    ticket_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "forklift_operators",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = ForkliftOperators;
