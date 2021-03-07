require("dotenv").config();
const bcrypt = require("bcrypt");
const oracledb = require("oracledb");

oracledb.autoCommit = true;
class User {
  constructor(
    username = "",
    password = "",
    email = "",
    date_of_birth = new Date()
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.date_of_birth = new Date(date_of_birth);
  }
  static async getAll() {}
  static async findEmail(email, password) {
    let connection;
    let data;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });

      const result = await connection.execute(
        `select * from users where email = '${email}'`
      );
      // console.log(result.rows);
      if (result.rows.length > 0) {
        if (bcrypt.compareSync(password, result.rows[0][3])) {
          result.rows[0].splice(3, 1); //?remove password from rows array
          data = result.rows[0];
        } else {
          Error = "password dont match";
        }
      } else {
        Error = "no user found";
      }
    } catch (err) {
      console.error(err);
      Error = err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
          Error = err;
        }
      }
      return { data: data, err: Error };
    }
  }
  static async find(id) {
    let connection;
    let data;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });

      const result = await connection.execute(
        `select * from users where id = ${id}`
      );
      data = result.rows;
    } catch (err) {
      console.error(err);
      Error = err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
          Error = err;
        }
      }
      return { data: data, err: Error };
    }
  }
  //   async exits() {}
  async create() {
    let connection;
    let data;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });
      const finduser = await connection.execute(
        `select * from users where email = '${this.email}'`
      );
      if (finduser.rows.length === 0) {
        const result = await connection.execute(
          `INSERT INTO users values(null,'${this.username}','${this.email}','${
            this.password
          }',to_date('${this.date_of_birth.getDay()}-${
            this.date_of_birth.getMonth() + 1
          }-${this.date_of_birth.getFullYear()}','dd-mm-yyyy'),null)`
        );
        const finduseragain = await connection.execute(
          `select * from users where email = '${this.email}'`
        );
        finduseragain.rows[0].splice(3, 1); //?remove password from rows array

        data = finduseragain.rows[0];
      } else {
        Error = "Email already used";
      }
    } catch (err) {
      console.error(err);
      data = null;
      Error = err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
          data = null;
          Error = err;
        }
      }
      return { data: data, err: Error };
    }
  }
  static async edit(id, username, user_pic) {
    let connection;
    let data;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });
      let pic = id + user_pic;
      console.log("pic", pic);

      // await connection.execute(
      //   `UPDATE users set username='${username}', profile_pic='${pic}' where id=${id}`
      // );
      await connection.execute(
        "UPDATE users set username = :un, profile_pic = :pp where id=:id",
        {
          un: username,
          pp: pic,
          id: id,
        }
      );
      console.log(`profile_pic='${id + user_pic}'`);

      // const result = await connection.execute(
      //   `select username,profile_pic from users where id = ${id}`
      // );
      // data = result.rows;
    } catch (err) {
      console.error(err);
      Error = err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
          Error = err;
        }
      }
      return { data: data, err: Error };
    }
  }
}

module.exports = User;
