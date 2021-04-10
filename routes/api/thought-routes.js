const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/',(req,res)=>{
    Thought.find()
    .then(thoughtData => res.json(thoughtData))
    .catch(err => 
    {
        console.log(err);
        res.status(400).json(err);
    });
});

router.get('/:id',(req,res)=>{
  Thought.findOne({ _id: req.params.id })
  .then(thoughtData => 
  {
    if (!thoughtData) 
    {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
    }
    res.json(thoughtData)
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.post('/',(req,res)=>{
  Thought.create(req.body)
  .then(thoughtData => 
  {
    return User.findByIdAndUpdate(
      {_id:req.body.userId},
      {$push: {thoughts:thoughtData}},
      {new:true}
      );
  })
  .then(userData=>res.json(userData))
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.put('/:id',(req,res)=>{
  Thought.findOneAndUpdate({ _id: req.params.id },req.body,{ new: true, runValidators: true })
  .then(thoughtData => 
  {
    if (!thoughtData) 
    {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
    }
    res.json(thoughtData)
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.delete('/:id',(req,res)=>{
  Thought.findOneAndDelete({ _id: req.params.id })
  .then(thoughtData => 
  {
    if (!thoughtData) 
    {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
    }
    res.json(thoughtData)
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.post('/:thoughtId/reactions',(req,res)=>{
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $push: {reactions:req.body}},
    { new: true, runValidators: true })
  .then(thoughtData => 
  {
    if (!thoughtData) 
    {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
    }
    res.json(thoughtData);
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.delete('/:thoughtId/reactions',(req,res)=>{
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: {reactions: { reactionId: req.body.reactionId}}},
    { new: true })
  .then(thoughtData => res.json(thoughtData))
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

module.exports = router;