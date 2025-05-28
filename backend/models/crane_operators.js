const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class CraneOperators extends Model {}

CraneOperators.init(
  {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: {
        model: "employees",
        key: "employee_id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "role_id",
      },
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
    modelName: "crane_operators",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = CraneOperators;
