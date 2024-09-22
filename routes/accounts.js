const express = require("express");
const router = express.Router();
const accountCtrl = require("../controllers/accounts");

router.post("/", accountCtrl.createAccount);

router.get("/getaccount", accountCtrl.getAccount);

router.put("/updateperks", accountCtrl.updatePerks);

router.put("/updatebio", accountCtrl.updateBio);

module.exports = router;
