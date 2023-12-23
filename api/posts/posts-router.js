// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Posts.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: "The posts information could not be retrieved" });
    }
  });
  

// GET a post by id
router.get('/:id', async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
    } catch (err) {
      res.status(500).json({ message: "The post information could not be retrieved" });
    }
  });
  

// POST a new post
router.post('/', async (req, res) => {
    try {
      const { title, contents } = req.body;
      if (title && contents) {
        const newPost = await Posts.insert({ title, contents });
        
        const fullPost = await Posts.findById(newPost.id);
        res.status(201).json(fullPost);
  
      } else {
        res.status(400).json({ message: "Please provide title and contents for the post" });
      }
    } catch (err) {
      res.status(500).json({ message: "There was an error while saving the post to the database" });
    }
  });
  
  

// PUT update a post
router.put('/:id', async (req, res) => {
    try {
      const { title, contents } = req.body;
      if (!title || !contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" });
      }
  
      const postToUpdate = await Posts.findById(req.params.id);
      if (!postToUpdate) {
        return res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
  
      await Posts.update(req.params.id, { title, contents });

      const updatedPost = await Posts.findById(req.params.id);
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json({ message: "The post information could not be modified" });
    }
  });
  
  
// DELETE a post
router.delete('/:id', async (req, res) => {
    try {
      const postToDelete = await Posts.findById(req.params.id);
      if (!postToDelete) {
        return res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
  
      await Posts.remove(req.params.id);
      res.json(postToDelete);
    } catch (err) {
      res.status(500).json({ message: "The post could not be removed" });
    }
  });
  

// GET comments for a post
router.get('/:id/comments', async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
  
      const comments = await Posts.findPostComments(req.params.id);
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: "The comments information could not be retrieved" });
    }
  });
  

module.exports = router;
