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
    await Job.findById(jobId)
        .populate({
            path: "applications",
        })
        .populate({
            path: "company",
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

const jobsFindByCompanyIdAndDeleteService = async (companyId) =>
    await Job.deleteMany({ company: companyId });

const deleteJobByIdService = async (jobId) =>
    await Job.findByIdAndDelete(jobId);

const updateJobByIdService = async (jobId, data) => {
    return await Job.findByIdAndUpdate(jobId, data, {
        new: true,
        runValidators: true,
    });
};

export {
    createJobService,
    allJobsService,
    getJobByIdService,
    getAdminJobsService,
    getApplicantsJobService,
    jobsFindByCompanyIdAndDeleteService,
    deleteJobByIdService,
    updateJobByIdService,
};
