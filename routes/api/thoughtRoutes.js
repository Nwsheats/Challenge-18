const router = require('express').Router();

const { getAllThoughts, getOneThought, createThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought)

router.route('/:id').get(getOneThought).delete(deleteThought).put(updateThought)

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction)

module.exports = router