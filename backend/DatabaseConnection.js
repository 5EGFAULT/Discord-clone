const oracledb = require("oracledb");
oracledb.autoCommit = true;
async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.user,
      password: process.env.password,
      connectString: "localhost:1521/xe",
    });

    const result = await connection.execute(
      `select ora_database_name from dual`
    );
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
