import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const applicationSchema = new Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: [true, "Job is required"],
        },
        application: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: [true, "Application is required"],
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Application =
    models.Application || model("Application", applicationSchema);

export default Application;
