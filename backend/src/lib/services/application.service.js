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
        .sort({
            createdAt: -1,
        })
        .populate({
            path: "job",
            options: {
                sort: { createdAt: -1 },
            },
            populate: {
                path: "company",
                options: {
                    sort: { createdAt: -1 },
                },
            },
        });

const updateApplicationStatusService = async ({ id, status }) =>
    await Application.findOneAndUpdate({ id }, { status }, { new: true });

export {
    checkExistingApplicationService,
    createApplicationService,
    getApplicationByIdService,
    updateApplicationStatusService,
};
