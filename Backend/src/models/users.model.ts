import mongoose from "mongoose";

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


UserSchema.pre("save", function () {
    this.updated_at = new Date();
});

UserSchema.set("toJSON", {
    transform: function (doc, ret) {
        // @ts-ignore
        delete ret.password;
        return ret;
    }
});

export const User = mongoose.model("User", UserSchema, "users");