const router = require("express").Router();
const User = require("../Models/User");
const Database = require("../config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async function (req, res) {
  // const Bdate = new Date(req.body.date_of_birth);
  // const datestring =
  //   Bdate.getDay() + "-" + Bdate.getMonth() + 1 + "-" + Bdate.getFullYear();
  // console.log(datestring);
  // let newid =
  //   (await Database.query("select max(id) from users"))[0][0]["MAX(ID)"] + 1;
  // // console.log(newid[0][0]["MAX(ID)"]);
  // const user = User.build({
  //   id: newid,
  //   username: req.body.username,
  //   password: req.body.password,
  //   email: req.body.email,
  //   birth_date: Bdate,
  // });
  // user.password = user.generateHash(req.body.password);

  // await user.save().catch((err) => {
  //   if (err != {}) {
  //     res.json({ err });
  //   }
  // });

  // let token = jwt.sign(
  //   { id: user.id, username: user.username, email: user.email },
  //   process.env.jwtsecret
  // );
  // //! TODO Dont sen token here but set it in header !!
  // res.json({
  //   data: { id: user.id, username: user.username, email: user.email },
  //   token,
  // });

  let user = new User(
    req.body.username,
    bcrypt.hashSync(req.body.password, 10),
    req.body.email,
    req.body.date_of_birth
  );
  user
    .create()
    .then((resolve) => {
      if (resolve.err == null) {
        let token = jwt.sign({ ...resolve }, process.env.jwtsecret);
        //! TODO Dont sen tocken here but set it in header !!
        res.json({ ...resolve, token });
      } else {
        res.json({ data: null, err: resolve.err });
      }
    })
    .catch((err) => {
      console.log("somthing went wrong");
      console.log(err);

      if (err != null) {
        res.json({ data: null, err: err });
      } else {
        res.json({ data: null, err: "somthing went wrong" });
      }
    });
});

module.exports = router;
