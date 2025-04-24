import {
    createApplicationService,
    checkExistingApplicationService,
    getApplicationByIdService,
    updateApplicationStatusService,
} from "../lib/services/application.service.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.util.js";
import {
    getApplicantsJobService,
    getJobByIdService,
} from "../lib/services/job.service.js";
import { validationResult } from "express-validator";

const applyJob = asyncHandler(async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    // extract user id and job id from request
    const { _id: jobId } = request.params;
    const { _id: userId } = request.user;

    // check if the user has already applied for the job
    const existingApplication = await checkExistingApplicationService({
        jobId,
        userId,
    });

    if (existingApplication) {
        throw new CustomError("You have already applied for this job", 400);
    }

    // check if the job exists
    const job = await getJobByIdService(jobId);

    if (!job) {
        throw new CustomError("Job not found", 404);
    }

    // create a new application and save it into job applications
    const newApplicant = await createApplicationService({
        job: jobId,
        applicant: userId,
    });
    job.applications.push(newApplicant._id);
    await job.save();

    response.status(200).json({
        message: "Job application submitted successfully",
    });
});

const appliedJobs = asyncHandler(async (request, response) => {
    // extract user id from request
    const { _id: userId } = request.user;

    // check if the user has any applications
    const applications = await getApplicationByIdService(userId);
    if (!applications) {
        throw new CustomError("No applications found", 404);
    }

    response.status(200).json({
        message: "Applied jobs fetched successfully",
        data: applications,
    });
});

const applicantsJob = asyncHandler(async (request, response) => {
    // extract job id from request
    const { _id: jobId } = request.params;

    // check if the job exists
    const jobs = await getApplicantsJobService(jobId);
    if (!jobs) {
        throw new CustomError("No applicants found", 404);
    }

    response.status(200).json({
        message: "Applicants fetched successfully",
        jobs,
    });
});

const updateStatus = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract data and user id from request
    const { status } = request.body;
    const { _id: applicationId } = request.params;

    const application = await updateApplicationStatusService({
        id: applicationId,
        status,
    });
    response.status(200).json({
        message: "Application status updated successfully",
        data: application,
    });
});

export { applyJob, appliedJobs, applicantsJob, updateStatus };
