const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Payslips extends Model {}

Payslips.init(
  {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "employees",
        key: "employee_id",
      },
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    overtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pay_day: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    release: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "payslips",
    timestamps: true,
    createdAt: false,
    freezeTableName: true,
  }
);
module.exports = Payslips;
