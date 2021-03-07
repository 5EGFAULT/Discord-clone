const router = require("express").Router();
const User = require("../Models/User");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

router.post("/edit", async function (req, res) {
  let form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    if (files.hasOwnProperty("image")) {
      //   console.log(server);
      User.edit(fields.user_id, fields.username, path.extname(files.image.name))
        .then((resolve) => {
          console.log(
            process.env.uploadpath +
              "users/" +
              fields.user_id +
              path.extname(files.image.name)
          );
          if (resolve.err == null) {
            // console.log(resolve.data[resolve.data.length - 1]);
            const oldpath = files.image.path;
            const newpath =
              process.env.uploadpath +
              "users/" +
              fields.user_id +
              path.extname(files.image.name);
            console.log(newpath);
            fs.copyFile(oldpath, newpath, (err) => {
              if (err) throw err;
            });
            res.json({
              data: {
                users_pic: fields.user_id + path.extname(files.image.name),
              },
              err: null,
            });
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
    }

    //   console.log(req.file);
    //   res.json(req.file);
  });
});
module.exports = router;
