const router = require("express").Router();
const User = require("../Models/User");
// const User = require("../Models/UserSequelize");
const { use } = require("./register");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// router.use(); add middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log("Time: ", Date.now());
//   next();
// });
router.post("/", async function (req, res) {
  // const user = await User.findAll({ where: { email: req.body.email } }).catch(
  //   (err) => {
  //     if (err != {}) {
  //       res.json({ err });
  //     }
  //   }
  // );
  // // res.json(user.password);
  // console.log(user);

  // if (user === null) {
  //   console.log("Not found!");
  //   res.json({ err: "user not found" });
  // } else {
  //   if (true) {
  //     // console.log(user.validPassword(req.body.password));
  //     // console.log(user.validPassword);
  //     let token = jwt.sign(
  //       { id: user.id, username: user.username, email: user.email },
  //       process.env.jwtsecret
  //     );
  //     //! TODO Dont sen token here but set it in header !!
  //     // res.json({
  //     //   data: user,
  //     //   token,
  //     // });
  //   } else {
  //     res.json({ err: "password incorrect" });
  //   }
  // }

  User.findEmail(req.body.email, req.body.password)
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
      if (err != {}) {
        res.json({ data: null, err: err });
      } else {
        res.json({ data: null, err: "somthing went wrong" });
      }
    });
});

module.exports = router;
