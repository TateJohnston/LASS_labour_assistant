const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class LeaveRequests extends Model {}

LeaveRequests.init(
  {
    leave_request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "employee_id",
      },
    },
    roster_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "rosters",
        key: "roster_id",
      },
    },
    leave_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "leave_requests",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = LeaveRequests;
