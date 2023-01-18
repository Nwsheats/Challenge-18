const { Thoughts, Users } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        Users.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        console.log("hello world")
        Users.findOne({_id: req.params.id})
            .populate('friends')
            .populate('thoughts')
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        Users.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        Users.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {runValidators: true, new: true})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    }, 
    deleteUser(req, res) {
        Users.findOneAndDelete({_id: req.params.id})
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID'})
                : Thoughts.deleteMany({ _id: { $in: user.thoughts}})
        )
        .then(() => res.json({ message: 'User was deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        Users.findOneAndUpdate({_id: req.params.userid}, {$addtoSet: {friends: req.params.friendId}}, {new: true})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        Users.findOneAndUpdate({_id: req.params.userid}, {$pull: {friends: req.params.friendId}}, {new: true})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
}