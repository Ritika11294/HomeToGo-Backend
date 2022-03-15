const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        "name" : {type: String, required: true},
        "email" : {type: String, required: true},
        "password" : {type: String, required: true},
        "role" : {type: String, required: true, enum: ["admin", "user", "property_owner"]}

    }, 
    {
        versionKey: false,
        timestamps: true
    }
);

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcryptjs.hash(this.password, 8);
    return next();
});

userSchema.methods.matchPassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
}

module.exports = mongoose.model("user", userSchema);