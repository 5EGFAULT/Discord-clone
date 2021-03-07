const oracledb = require("oracledb");
oracledb.autoCommit = true;

module.exports = oracledb
  .getConnection({
    user: process.env.user,
    password: process.env.password,
    connectString: process.env.connectString,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("unable to connect to database: ", err);
  });
