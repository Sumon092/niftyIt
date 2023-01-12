const { mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    gender: String,
    birthDay: {
        type: String,
        default: "10-10-1997"
    },
    isSubscribed: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 10
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },

    confirmPassword: {
        type: String,
        required: [true, "Please confirm your Password"],
    },
    role: {
        type: String,
        enum: ["user", "admin", "others"],
        default: "user"
    },



}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);