const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        validate: [validate.isEmail, "Provide a valid email"],
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
        validate: {
            validate: function (value) {
                return value === this.password;
            },
            message: "Password don't match"
        }
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid mobile number"]
    },
    role: {
        type: String,
        enum: ["user", "admin", "others"],
        default: "user"
    },
    birthDay: Date,


}, { timestamps: true });

UserSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hash(password);
    this.confirmPassword = hashedPassword;
    this.confirmPassword = undefined;
    next();
})

module.exports = mongoose.model("User", UserSchema);