require("dotenv").config();
const oracledb = require("oracledb");

oracledb.autoCommit = true;
class Server {
  constructor(
    creator_id = null,
    servername = "",
    visability = "",
    server_pic = "",
    id = null
  ) {
    this.creator_id = creator_id;
    this.id = id;
    this.servername = servername;
    this.visability = visability;
    this.server_pic = server_pic;
  }
  static async getAllPublic(user_id) {
    let connection;
    let data;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });

      const servers = await connection.execute(
        // `select * from servers where VISIBILITY = 'public' order by id`
        `select * from servers where creator_id <> ${user_id} 
          and id not in (select server_id from Servermembers where user_id = ${user_id})
        order by id`
      );
      //   console.log(servers.rows);
      data = servers.rows;
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
  static async getServerData(id) {
    let connection;
    let data;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });

      const server = await connection.execute(
        `select * from servers where id = ${id}`
      );
      const Groups = await connection.execute(
        `select * from GROUPs where server_id= ${id}`
      );
      const Channels = await connection.execute(
        `select * from Channels where group_id in (select id from GROUPs where server_id = ${id})`
      );

      //   console.log(servers.rows);
      data = {
        server: server.rows,
        groups: Groups.rows,
        channels: Channels.rows,
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
  static async GetUserServers(user_id) {
    let connection;
    let data;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });

      const servers = await connection.execute(
        `select id,SERVERNAME,SERVER_PIC from servers left outer join Servermembers on Servermembers.server_id = servers.id  where  creator_id = ${user_id} or user_id=${user_id}`
      );
      //   console.log(servers.rows);
      data = servers.rows;
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
  static async JoinServer(serverid, user_id) {
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
        `INSERT INTO Servermembers values('${serverid}','${user_id}')`
      );
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
  static async CreateGroup(serverid, group_name) {
    let connection;
    let data = null;
    let Error = null;
    try {
      connection = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectString: process.env.connectString,
      });
      console.log(
        `INSERT INTO groups values(null,'${group_name}',${serverid})`
      );
      const result = await connection.execute(
        `INSERT INTO groups values(null,'${group_name}',${serverid})`
      );
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
  static async CreateChannel(group_id, channel_name) {
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
        `INSERT INTO channels values(null,'${channel_name}',${group_id})`
      );
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

      const result = await connection.execute(
        `INSERT INTO servers values(null,'${this.servername}','${this.server_pic}','${this.visability}',${this.creator_id})`
      );

      const servers = await connection.execute(
        `select * from servers where creator_id = ${this.creator_id} order by id`
      );
      //   console.log(servers.rows);
      data = servers.rows;
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

module.exports = Server;
