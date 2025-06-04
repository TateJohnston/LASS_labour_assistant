const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Payslips extends Model {}

Payslips.init(
  {
    payslip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "employee_id",
      },
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    overtime: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bonus: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    upgrades: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    gross: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    net: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    super: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    pay_day: {
      type: DataTypes.DATEONLY,
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
