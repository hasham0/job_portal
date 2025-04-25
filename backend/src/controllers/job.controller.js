import { validationResult } from "express-validator";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import {
    allJobsService,
    createJobService,
    getAdminJobsService,
    getJobByIdService,
    deleteJobByIdService,
    updateJobByIdService,
} from "../lib/services/job.service.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.util.js";

const allJobs = asyncHandler(async (request, response) => {
    const { keyword } = request.query;
    const jobs = await allJobsService(keyword);
    if (!jobs) {
        throw new CustomError("Jobs not found", 404);
    }

    return response
        .status(200)
        .json({ message: "Jobs found successfully", jobs });
});

const getJobById = asyncHandler(async (request, response) => {
    const { _id: jobId } = request.params;

    const job = await getJobByIdService(jobId);
    if (!job) {
        throw new CustomError("Job not found", 404);
    }
    return response
        .status(200)
        .json({ message: "Job found successfully", job });
});

const getAdminJobs = asyncHandler(async (request, response) => {
    const { _id: adminId } = request.user;
    const jobs = await getAdminJobsService(adminId);
    if (!jobs) {
        throw new CustomError("Jobs not found", 404);
    }
    return response
        .status(200)
        .json({ message: "Admin Jobs found successfully", jobs });
});

const postJob = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    const {
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        experience,
        position,
        company,
        applicationId,
    } = request.body;

    const { _id: userId } = request.user;

    const job = await createJobService({
        title,
        description,
        requirements: requirements.split(/[,\s]+/),
        salary,
        location,
        jobType,
        experienceLevel: Number(experience),
        position,
        company,
        created_by: userId,
        application: applicationId,
    });

    return response
        .status(201)
        .json({ message: "Job created successfully", job });
});

const updatejob = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    const { _id: jobId } = request.params;
    const { _id: userId } = request.user;
    const {
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        experience,
        position,
        company,
        applicationId,
    } = request.body;

    const job = await getJobByIdService(jobId);
    if (!job) {
        throw new CustomError("Job not found", 404);
    }

    const updatedJob = await updateJobByIdService(jobId, {
        title,
        description,
        requirements: requirements.split(/[,\s]+/),
        salary,
        location,
        jobType,
        experience,
        position,
        company,
        applicationId,
    });

    return response
        .status(200)
        .json({ message: "Job updated successfully", updatedJob });
});

const deleteJobById = asyncHandler(async (request, response) => {
    const { _id: jobId } = request.params;
    const { _id: userId } = request.user;

    const job = await deleteJobByIdService(jobId, userId);
    if (!job) {
        throw new CustomError("Job not found", 404);
    }
    return response
        .status(200)
        .json({ message: "Job deleted successfully", job });
});

export { allJobs, getAdminJobs, getJobById, postJob, deleteJobById, updatejob };
