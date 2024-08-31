const express = require("express");
const router = express.Router();
const accountCtrl = require("../controllers/accounts");

router.post("/", accountCtrl.createAccount);

router.get("/getaccount", accountCtrl.getAccount);

router.put("/updatepp", accountCtrl.updatePP);

router.put("/updateperks", accountCtrl.updatePerks);

module.exports = router;
