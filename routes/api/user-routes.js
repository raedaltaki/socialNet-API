const router = require('express').Router();
const { User } = require('../../models');

router.get('/',(req,res)=>{
    User.find()
    .populate(
      {
        path: 'friends thoughts',
        select: '-__v'
    })
    .select('-__v')
    .then(userData => res.json(userData))
    .catch(err => 
    {
        console.log(err);
        res.status(400).json(err);
    });
});

router.get('/:id',(req,res)=>{
  User.findOne({ _id: req.params.id })
  .populate(
    {
      path: 'friends thoughts',
      select: '-__v'
  })
  .select('-__v')
  .then(userData => 
  {
    if (!userData) 
    {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
    }
    res.json(userData);
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.post('/',(req,res)=>{
  User.create(req.body)
  .then(userData => res.json(userData))
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.put('/:id',(req,res)=>{
  User.findOneAndUpdate({ _id: req.params.id },req.body,{ new: true, runValidators: true })
  .then(userData => 
  {
    if (!userData) 
    {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
    }
    res.json(userData);
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.delete('/:id',(req,res)=>{
  User.findOneAndDelete({ _id: req.params.id })
  .then(userData => 
  {
    if (!userData) 
    {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
    }
    res.json(userData);
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.post('/:userId/friends/:friendId',(req,res)=>{
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {$push: {friends:req.params.friendId}},
    { new: true, runValidators: true })
  .then(userData => 
  {
    if (!userData) 
    {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
    }
    res.json(userData);
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

router.delete('/:userId/friends/:friendId',(req,res)=>{
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: {friends:req.params.friendId}},
    { new: true})
  .then(userData => 
  {
    if (!userData) 
    {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
    }
    res.json(userData);
  })
  .catch(err => 
  {
      console.log(err);
      res.status(400).json(err);
  });
});

module.exports = router;