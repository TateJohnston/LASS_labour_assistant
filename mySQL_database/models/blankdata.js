const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class blank extends Model {}

blank.init(
  {},
  {
    sequelize: sequelizeInstance,
    modelName: "blank",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = blank;
