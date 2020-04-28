const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    myself: {
        description: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        year: {
            type: Number
        },
        userId: {
            type: String,
            required: true
        },
        ioKey: String,
        connection: Boolean,
        warnings: {
            count: {
                type: Number,
                required: true
            },
            banned: Boolean,
            bannedTimer: Date
        },

    },
    companion: {
        themes: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        year: {
            type: Number
        },

    }
});




module.exports = model("User", userSchema);




