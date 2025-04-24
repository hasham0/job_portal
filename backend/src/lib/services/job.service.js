import Job from "../../models/job.model.js";

const createJobService = async (data) => await Job.create(data);
const allJobsService = async (keyword = "") => {
    return await Job.find({
        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ],
    })
        .populate({
            path: "company",
        })
        .sort({ createdAt: -1 });
};

const getJobByIdService = async (jobId) =>
    await Job.findById({ _id: jobId })
        .populate({
            path: "applications",
        })
        .sort({ createdAt: -1 });

const getAdminJobsService = async (adminId) =>
    await Job.find({ created_by: adminId })
        .populate({
            path: "company",
        })
        .sort({ createdAt: -1 });

const getApplicantsJobService = async (jobId) =>
    await Job.findById(jobId).populate({
        path: "applications",
        options: { sort: { createdAt: -1 } },
        populate: {
            path: "applicant",
        },
    });

export {
    createJobService,
    allJobsService,
    getJobByIdService,
    getAdminJobsService,
    getApplicantsJobService,
};
