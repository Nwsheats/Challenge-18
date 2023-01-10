const { ObjectId } = require('bson');
const { Schema, model} = require('mongoose');

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
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [{
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
            },
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return Object.keys(this.reactions).length;
})


const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;
