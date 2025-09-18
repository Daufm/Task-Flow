import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

verified: {
   type: DataTypes.BOOLEAN,
  defaultValue: false 
},
verificationCode: {
   type: DataTypes.STRING
   }
});

export default User;
