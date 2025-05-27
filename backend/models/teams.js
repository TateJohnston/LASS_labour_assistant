const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Teams extends Model {}

Teams.init(
  {
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    shift_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "shifts",
        key: "shift_id",
      },
    },
    bonus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    work_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "teams",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Teams;
