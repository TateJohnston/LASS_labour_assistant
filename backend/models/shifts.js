const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Shifts extends Model {}

Shifts.init(
  {
    shift_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "shifts",
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Shifts;
