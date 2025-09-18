import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_manager", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.sync(); // Sync all models

export default sequelize;