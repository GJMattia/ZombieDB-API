const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts");

router.post("/createpost", postCtrl.createPost);

router.get("/get10", postCtrl.getPosts);

module.exports = router;
