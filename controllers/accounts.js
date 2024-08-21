const Account = require("../models/account");

module.exports = {
  createAccount,
  getAccount,
};

async function getAccount(req, res) {
  try {
    const account = await Account.findOne({ user: req.user._id });

    res.json(account);
  } catch (error) {
    console.error("Error finding account", error);
    res.status(500).json({ error: "Failed to find the account" });
  }
}

async function createAccount(req, res) {
  try {
    const userID = req.body.userID;
    const newAccount = await Account.create({ user: userID });
    res.json(newAccount);
  } catch (error) {
    console.error("error creating account", error);
  }
}
