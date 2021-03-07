require("dotenv").config();
const oracledb = require("oracledb");

oracledb.autoCommit = true;
class Channel {
  static async getChannelData(id) {
    let connection;
    let data;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });

      const Channels = await connection.execute(
        `select * from Channels where id = ${id}`
      );
      const Messages = await connection.execute(
        `select u.username,u.profile_pic,m.text from messages m join users u on u.id= m.user_id where m.Channel_id= ${id}`
      );
      // const Channels = await connection.execute(
      //   `select * from Channels where group_id in (select id from GROUPs where server_id = ${id})`
      // );

      data = {
        channel: Channels.rows,
        messages: Messages.rows,
      };
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
  static async InsertMessage(user_id, channel_id, text) {
    let connection;
    let data = null;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });

      const result = await connection.execute(
        `INSERT INTO messages values(null,${channel_id},${user_id},'${text}')`
      );
      const message = await connection.execute(
        `select u.username,u.profile_pic,m.text from messages m join users u on u.id= m.user_id where m.Channel_id= ${channel_id} and m.user_id= ${user_id} and m.id in (select max(id) from messages)`
      );
      data = message.rows;
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
}

module.exports = Channel;
