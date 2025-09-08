import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_manager", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

export default sequelize;