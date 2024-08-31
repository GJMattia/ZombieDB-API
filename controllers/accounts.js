const Account = require("../models/account");

module.exports = {
  createAccount,
  getAccount,
  updatePP,
  updatePerks,
};

async function updatePerks(req, res) {
  try {
    const account = await Account.findOne({ user: req.user._id }, { perks: 1 });
    account.perks = req.body.perks;

    await account.save();
    res.json(account.perks);
  } catch (error) {
    console.error("Error updating perks", error);
    res.status(500).json({ error: "error updating perks" });
  }
}

async function updatePP(req, res) {
  try {
    const account = await Account.findOne({ user: req.user._id }, { pic: 1 });
    account.pic = req.body.pic;
    await account.save();
    res.json(account.pic);
  } catch (error) {
    console.error("Error changing profile picture", error);
    res.status(500).json({ error: "error changing profile picture" });
  }
}

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
