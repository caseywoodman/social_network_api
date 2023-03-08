const { Thought, User } = require("../models");

module.exports = {
  // Get all Thoughts
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //   Get a single Thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  // create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
      })
      .then((user) => (!user ? res.status(404).json({ message: "Thought created, but found no user with that ID" }) : res.json("Created the Thought 🎉")))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //  update a Thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  //   delete a Thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        return User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { thoughts: thought._id } }, { new: true });
      })
      .then((user) => (!user ? res.status(404).json({ message: "Thought deleted, but found no user with that ID" }) : res.json("Deleted the Thought 🎉")))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
