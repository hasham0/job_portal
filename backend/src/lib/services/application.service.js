import mongoose from "mongoose";
import Application from "../../models/application.model.js";

const checkExistingApplicationService = async ({ jobId, userId }) =>
    await Application.findOne({
        job: jobId,
        applicant: userId,
    });

const createApplicationService = async (data) => await Application.create(data);

const getApplicationByIdService = async (id) =>
    await Application.find({ applicant: id })
        .sort({ createdAt: -1 })
        .populate({
            path: "job",
            model: "Job",
            populate: [
                {
                    path: "company",
                    model: "Company",
                },
                {
                    path: "applications",
                    model: "Application",
                },
                {
                    path: "created_by",
                    model: "User",
                },
            ],
        });

const updateApplicationStatusService = async ({ id, status }) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid application ID");
    }
    const updatedApplication = await Application.findByIdAndUpdate(
        { _id: id },
        { status },
        { new: true }
    );

    if (!updatedApplication) {
        throw new Error("Application not found");
    }

    return updatedApplication;
};

export {
    checkExistingApplicationService,
    createApplicationService,
    getApplicationByIdService,
    updateApplicationStatusService,
};
