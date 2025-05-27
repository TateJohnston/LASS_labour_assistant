const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class LeaveBalances extends Model {}

LeaveBalances.init(
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
    al_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lsl_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sl_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dil_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ml_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "leave_balances",
    timestamps: true,
    createdAt: false,
    freezeTableName: true,
  }
);
module.exports = LeaveBalances;
