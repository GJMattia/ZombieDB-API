const Post = require("../models/post");

module.exports = {
  createPost,
  getPosts,
};

async function getPosts(req, res) {
  try {
    const posts = await Post.find().limit(10);
    res.json(posts);
  } catch (error) {
    console.error("error getting posts", error);
    res.status(500).json({ error: "Failed getting posts" });
  }
}

async function createPost(req, res) {
  try {
    const userID = req.user._id;
    const newPost = await Post.create({
      user: userID,
      content: req.body.content,
    });
    res.json(newPost);
  } catch (error) {
    console.error("error creating post", error);
  }
}
