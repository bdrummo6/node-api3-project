const express = require('express');
const router = express.Router();
const db = require('./postDb')
const validatePost = require('../middleware/validatePost')
const validatePostId = require('../middleware/validatePostId')

router.get('/', (req, res, next) => {
  // do your magic!
  db.get()
    .then(posts=>{
      return res.status(200).json(posts)
    })
    .catch(next)
});

router.get('/:id', validatePostId(), (req, res, next) => {
  // do your magic!
  db.getById(req.params.id)
    .then(post=>{
      return res.status(200).json(post)
    })
    .catch(next)
});

router.delete('/:id', validatePostId(), (req, res, next) => {
  // do your magic!
  db.remove(req.params.id)
    .then(success=>{
      if (success===1) {
        return res.status(200).json({message: "Post deleted"})
      } else {
        return res.status(500).json({message: "Post could not be deleted"})
      }
    })
    .catch(next)
});

router.put('/:id', validatePostId(), validatePost(), (req, res, next) => {
  // do your magic!
  db.update(req.params.id,req.body)
    .then(success=>{
      return db.getById(req.params.id)
    })
    .then(post=>{
      return res.status(200).json(post)
    })
    .catch(next)
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
