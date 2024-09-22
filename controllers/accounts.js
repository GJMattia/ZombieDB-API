const Account = require("../models/account");

module.exports = {
  createAccount,
  getAccount,
  updatePerks,
  updateBio,
};

async function updateBio(req, res) {
  try {
    const account = await Account.findOne({ user: req.user._id }, { bio: 1 });
    account.bio = req.body.bio;

    await account.save();
    res.json(account.bio);
  } catch (error) {
    console.error("Error updating bio", error);
    res.status(500).json({ error: "error updating bio" });
  }
}

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
