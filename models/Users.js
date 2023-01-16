const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
    }, {
        toJSON: {
            virtuals: true
        }
    },
);

userSchema.virtual('friendsCount').get(function () {
    return this.friends.length;
})

const Users = model('user', userSchema);

module.exports = Users;