const Post = require("../models/post");

module.exports = {
  createPost,
  getPosts,
  likePost,
  dislikePost,
  deletePost,
};

async function deletePost(req, res) {
  try {
    const post = await Post.findOneAndDelete({ _id: req.body.id });
    res.json(true);
  } catch (error) {
    console.error("error deleting post", error);
    res.status(500).json({ error: "Failed deleting post" });
  }
}

async function dislikePost(req, res) {
  try {
    const post = await Post.findOne({ _id: req.body.id });
    post.rating.dislikes = post.rating.dislikes - 1;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error("error disliking post", error);
    res.status(500).json({ error: "Failed disliking post" });
  }
}

async function likePost(req, res) {
  try {
    const post = await Post.findOne({ _id: req.body.id });
    post.rating.likes = post.rating.likes + 1;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error("error liking post", error);
    res.status(500).json({ error: "Failed liking post" });
  }
}

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
