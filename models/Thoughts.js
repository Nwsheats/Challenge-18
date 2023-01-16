const { ObjectId } = require('bson');
const { Schema, model} = require('mongoose');

const reactionSchema = new Schema({
        reactionId: {
            type: ObjectId,
            default: new ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (Date) {
                return Date
            }
        },
    })

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (Date) {
                return Date
                // use Moment or Day or just JS to format the timestamp
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;
