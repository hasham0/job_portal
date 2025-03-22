import asyncHandler from "../middlewares/async-handler.middleware.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.js";
import { validationResult } from "express-validator";
import {
    companyFindService,
    companyCreateService,
    companiesFindByUserIdService,
    companyFindByIdService,
    companiesService,
    updateCompanyDetailsByIdService,
} from "../lib/services/company.service.js";

const registerCompany = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract data and user id from request
    const { name: companyName } = request.body;
    const { _id: userId } = request.user;

    // check if company already exists and validate
    const isCompanyExists = await companyFindService(companyName);
    if (isCompanyExists) {
        throw new CustomError("Company already exists", 400);
    }

    // create new company
    const newCompany = await companyCreateService({ companyName, userId });

    return response
        .status(201)
        .json({ message: "Company created successfully", company: newCompany });
});

const getCompaniesByUserId = asyncHandler(async (request, response) => {
    // extract user id from request
    const { _id: userId } = request.user;

    // find company by user id and validate
    const company = await companiesFindByUserIdService(userId);
    if (!company) {
        throw new CustomError("Companies not found", 404);
    }

    return response
        .status(200)
        .json({ message: "Company found successfully", company });
});

const getCompanies = asyncHandler(async (request, response) => {
    const companies = await companiesService();
    if (!companies) {
        throw new CustomError("Companies not found", 404);
    }

    return response
        .status(200)
        .json({ message: "Companies found successfully", companies });
});

const getCompany = asyncHandler(async (request, response) => {
    // extract company id from request
    const { _id: companyId } = request.params;

    // find company by user id and validate
    const company = await companyFindByIdService(companyId);
    if (!company) {
        throw new CustomError("Company not found", 404);
    }

    return response
        .status(200)
        .json({ message: "Company found successfully", company });
});

const updateCompanyDetails = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    const { name, description, website, location } = request.body;
    const { _id: companyId } = request.params;
    // const { file } = request.files;

    const company = await updateCompanyDetailsByIdService(companyId, {
        name,
        description,
        website,
        location,
    });
    if (!company) {
        throw new CustomError("Company not found", 404);
    }
    return response
        .status(200)
        .json({ message: "Company updated successfully", company });
});

export {
    registerCompany,
    getCompaniesByUserId,
    getCompanies,
    getCompany,
    updateCompanyDetails,
};
