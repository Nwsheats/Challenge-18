const { application } = require('express');
const { Thoughts, Users } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        Users.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        Users.findOne({_id: req.params.userID})
            .select('-__v')
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.status(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        Users.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        Users.delete({_id: req.params.userID})
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID'})
                : Thoughts.deleteMany({ _id: { $in: user.thoughts}})
        )
        .then(() => res.json({ message: 'User was deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
};

