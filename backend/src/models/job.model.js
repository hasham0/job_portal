import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minLength: [3, "Title must be at least 3 characters"],
            maxLength: [50, "Title must be at most 50 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            minLength: [3, "Description must be at least 3 characters"],
            maxLength: [50, "Description must be at most 50 characters"],
        },
        requirements: [
            {
                type: String,
                required: [true, "Requirement is required"],
                minLength: [3, "Requirement must be at least 3 characters"],
                maxLength: [50, "Requirement must be at most 50 characters"],
            },
        ],
        salary: {
            type: Number,
            required: [true, "Salary is required"],
        },
        experience: {
            type: Number,
            required: [true, "Experience is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            minLength: [3, "Location must be at least 3 characters"],
            maxLength: [50, "Location must be at most 50 characters"],
        },
        jobType: {
            type: String,
            required: [true, "Job Type is required"],
            minLength: [3, "Job Type must be at least 3 characters"],
            maxLength: [50, "Job Type must be at most 50 characters"],
        },
        position: {
            type: Number,
            required: [true, "Position is required"],
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: [true, "Company is required"],
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        application: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application",
            },
        ],
    },
    { timestamps: true }
);

const Job = models.Job || model("Job", jobSchema);

export default Job;
