const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Licenses extends Model {}

Licenses.init(
  {
    license_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    licenser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost_per_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "licenses",
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Licenses;
