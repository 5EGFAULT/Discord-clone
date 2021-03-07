const router = require("express").Router();
const Channel = require("../Models/Channel");
require("dotenv").config();

router.get("/getall/:id", async function (req, res) {
  Channel.getChannelData(req.params.id)
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

module.exports = router;
