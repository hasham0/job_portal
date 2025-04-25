import Company from "../../models/company.model.js";

const companyFindService = async (companyName) =>
    await Company.findOne({ name: companyName });

const companyCreateService = async ({ companyName, userId }) =>
    await Company.create({
        name: companyName,
        userId,
    });

const companiesFindByUserIdService = async (userId) =>
    await Company.find({ userId });

const companyFindByIdService = async (companyId) =>
    await Company.findById({ _id: companyId });

const updateCompanyDetailsByIdService = async (companyId, data) =>
    await Company.findByIdAndUpdate({ _id: companyId }, data, { new: true });

const companiesService = async () => await Company.find();

const companyFindByIdAndDeleteService = async (companyId) =>
    await Company.findByIdAndDelete({ _id: companyId });

export {
    companyFindByIdService,
    companyFindService,
    companyCreateService,
    companiesFindByUserIdService,
    companyFindByIdAndDeleteService,
    updateCompanyDetailsByIdService,
    companiesService,
};
