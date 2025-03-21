import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const companySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [50, "Name must be at most 50 characters"],
        },
        description: {
            type: String,
        },
        website: {
            type: String,
        },
        location: {
            type: String,
        },
        logo: {
            type: String,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
    },
    { timestamps: true }
);

const Company = models.Company || model("Company", companySchema);

export default Company;
