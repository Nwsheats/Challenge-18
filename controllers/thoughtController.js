const { Thoughts } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thoughts.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        console.log("hello world")
        Thoughts.findOne({_id: req.params.id})
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {runValidators: true, new: true})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    }, 
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({_id: req.params.id})
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : Thoughts.deleteMany({ _id: { $in: thought.reactions}})
        )
        .then(() => res.json({ message: 'Thought was deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$addtoSet: {reactions: req.params.reactionId}}, {new: true})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: req.params.reactionId}}, {new: true})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
}
