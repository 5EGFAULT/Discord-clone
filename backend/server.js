const express = require("express");
var cors = require("cors");
const oracledb = require("oracledb");
const app = express();
oracledb.autoCommit = true;
async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "usr",
      password: "pwd",
      // connectString: "localhost:1521:DiscordClone",
      connectString: "localhost:1521/xe",
    });

    const result = await connection.execute(
      `select ora_database_name from dual`
      // bind value for :id
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
// var corsOptions = {
//   // origin: true,
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "*",
//   "Access-Control-Allow-Headers": "*",
// };
// console.log(cors(corsOptions));
app.use(cors());
app.use(express.json());

// var corsOptions = {
//   origin: "http://localhost:3000",
// };

// app.use(cors(corsOptions));
app.get("/", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body);
  res.send({ ff: "ee" });
});
app.post("/register", function (req, res) {
  res.setHeader("Content-Type", "application/json");

  console.log(req.body);
  // let userinfo = JSON.parse(req.body);
  let userinfo = req.body;

  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(userinfo);
});
app.listen(3003);
// app.listen(3003, function () {
//   console.log("CORS-enabled web server listening on port 3003");
// });
