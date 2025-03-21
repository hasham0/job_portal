import "dotenv/config";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: [true, "Fullname is required"],
            minLength: [3, "Fullname must be at least 3 characters"],
            maxLength: [50, "Fullname must be at most 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "Password must be at least 6 characters"],
            select: false,
        },
        phoneNumber: {
            type: Number,
            required: [true, "Phone number is required"],
            unique: true,
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            enum: ["student", "recruiter", "admin"],
            default: "student",
        },
        profile: {
            bio: {
                type: String,
            },
            skills: [{ type: String }],
            resume: {
                type: String,
            },
            resumeOriginalName: {
                type: String,
            },
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company",
            },
            profilePhoto: {
                type: String,
                default: "",
            },
        },
    },
    { timestamps: true }
);

// encrypt password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

// compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

// Generate Auth Token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, timestamp: Date.now() },
        process.env.JWT_SECRET_KEY || "defaultSecret",
        { expiresIn: "24h" }
    );
};

const User = models.User || model("User", userSchema);

export default User;
