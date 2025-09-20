import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";


const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  priority: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
  due_date: { type: DataTypes.DATEONLY },
  due_date_time: { type: DataTypes.TIME },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: 'Users', key: 'id' }
  },
},
{
  tableName: 'Tasks',
  timestamps: true // Set to true if you want Sequelize to manage createdAt/updatedAt automatically
});

export default Task;
