import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  priority: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
  due_date: { type: DataTypes.DATEONLY },
  due_date_time: { type: DataTypes.TIME },
});

export default Task;
