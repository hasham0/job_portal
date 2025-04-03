import { validationResult } from "express-validator";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import {
    allJobsService,
    createJobService,
    getAdminJobsService,
    getJobByIdService,
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

const postJob = asyncHandler((request, response) => {
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
        companyId,
        applicationId,
    } = request.body;
    const { _id: userId } = request.user;

    const job = createJobService({
        title,
        description,
        requirements: requirements.split(","),
        salary,
        location,
        jobType,
        experienceLevel: Number(experience),
        position,
        company: companyId,
        created_by: userId,
        application: applicationId,
    });

    return response
        .status(201)
        .json({ message: "Job created successfully", job });
});

export { allJobs, getAdminJobs, getJobById, postJob };
