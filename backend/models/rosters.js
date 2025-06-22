const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const Teams = require("./teams");

class Rosters extends Model {}

Rosters.init(
  {
    roster_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "employee_id",
      },
    },
    shift_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "shifts",
        key: "shift_id",
      },
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "teams",
        key: "team_id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "roles",
        key: "role_id",
      },
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "rosters",
    timestamps: false,
    freezeTableName: true,
  }
);

Rosters.belongsTo(Teams, {
  foreignKey: {
    name: "team_id",
    allowNull: true,
  },
  onDelete: "SET NULL",
});
module.exports = Rosters;
