const { default: mongoose } = require("mongoose");

const Userschema = mongoose.Schema({
    Name: {
        type: String,
        required: [true, "first Name is required"]
    },
    email:{
        type: String,
        required:[true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required:[true, "password is required"],
    }
});

module.exports = mongoose.model("User", Userschema);