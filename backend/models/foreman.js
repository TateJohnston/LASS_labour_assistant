const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Foreman extends Model {}

Foreman.init(
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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ticket_expiry: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    has_skill: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "foreman",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Foreman;
