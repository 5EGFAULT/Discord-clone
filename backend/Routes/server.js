const router = require("express").Router();
const Server = require("../Models/Server");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// router.use(); add middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log("Time: ", Date.now());
//   next();
// });
router.post("/create", async function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (files.hasOwnProperty("image")) {
      let server = new Server(
        fields.creator_id,
        fields.servername,
        fields.visablity,
        path.extname(files.image.name)
      );
      //   console.log(server);
      server
        .create()
        .then((resolve) => {
          if (resolve.err == null) {
            // console.log(resolve.data[resolve.data.length - 1]);
            const oldpath = files.image.path;
            const newpath =
              process.env.uploadpath +
              "servers/" +
              resolve.data[resolve.data.length - 1][2];
            fs.copyFile(oldpath, newpath, (err) => {
              if (err) throw err;
              // console.log(ImageNewName + " was copied ");
            });
            res.json({
              data: {
                id: resolve.data[resolve.data.length - 1][0],
                servername: resolve.data[resolve.data.length - 1][1],
                serverpic:
                  process.env.uploadpath +
                  "servers/" +
                  resolve.data[resolve.data.length - 1][2],
                visability: resolve.data[resolve.data.length - 1][3],
                creator_id: resolve.data[resolve.data.length - 1][4],
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

router.get("/getall/:id", async function (req, res) {
  Server.getAllPublic(req.params.id)
    .then((resolve) => {
      if (resolve.err == null) {
        // console.log(resolve.data[resolve.data.length - 1]);
        res.json({ data: resolve.data, err: null });
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
router.get("/find/:id", async function (req, res) {
  Server.getServerData(req.params.id)
    .then((resolve) => {
      if (resolve.err == null) {
        // console.log(resolve.data[resolve.data.length - 1]);
        res.json({ data: resolve.data, err: null });
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
router.get("/user-servers/:id", async function (req, res) {
  Server.GetUserServers(req.params.id)
    .then((resolve) => {
      if (resolve.err == null) {
        // console.log(resolve.data[resolve.data.length - 1]);
        res.json({ data: resolve.data, err: null });
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
router.post("/join", async function (req, res) {
  // res.json({ data: req.body, err: null });

  Server.JoinServer(req.body.server_id, req.body.user_id)
    .then((resolve) => {
      if (resolve.err == null) {
        res.json({ data: resolve.data, err: null });
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
router.post("/create-group", async function (req, res) {
  Server.CreateGroup(req.body.server_id, req.body.group_name)
    .then((resolve) => {
      if (resolve.err == null) {
        res.json({ data: resolve.data, err: null });
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
router.post("/create-Channel", async function (req, res) {
  Server.CreateChannel(req.body.group_id, req.body.Channel_name)
    .then((resolve) => {
      if (resolve.err == null) {
        res.json({ data: resolve.data, err: null });
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
