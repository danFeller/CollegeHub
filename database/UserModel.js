const mongoose = require("mongoose");
const dbConfig = require("./dbConfig")
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model("User", UserSchema);
UserSchema.set(dbConfig.collections[0].name, "custom_user")
module.exports = {User};