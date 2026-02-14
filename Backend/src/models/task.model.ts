import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    due_date: {
        type: Date,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
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


TaskSchema.pre("save", function () {
    this.updated_at = new Date();
});

TaskSchema.index({ owner: 1 });

export const TaskModel = mongoose.model("TaskModel", TaskSchema, "tasks");