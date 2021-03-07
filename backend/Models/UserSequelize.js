const { DB_TYPE_VARCHAR, DB_TYPE_NUMBER, DB_TYPE_DATE } = require("oracledb");
const Database = require("../config");
const bcrypt = require("bcrypt");

const User = Database.define(
  "users",
  {
    id: {
      type: DB_TYPE_NUMBER,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DB_TYPE_VARCHAR,
      allowNull: false,
    },
    username: {
      type: DB_TYPE_VARCHAR,
      allowNull: false,
    },
    password: {
      type: DB_TYPE_VARCHAR,
      allowNull: false,
    },
    birth_date: {
      type: DB_TYPE_DATE,
      allowNull: false,
    },
    profile_pic: {
      type: DB_TYPE_VARCHAR,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hashSync(password, 10);
      },
      validPassword(password) {
        // console.log(this.password);
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);

module.exports = User;
