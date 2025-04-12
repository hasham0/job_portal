import User from "../../models/user.model.js";

const userFindService = async (email, passwordOption = "-password") =>
    await User.findOne({ email }).select(passwordOption);

const userFindServiceById = async (_id) => await User.findById({ _id });
const userCreateService = async ({
    fullname,
    email,
    phoneNumber,
    password,
    role,
    profilePhoto,
}) => {
    return await User.create({
        fullname,
        email,
        phoneNumber: Number(phoneNumber),
        password,
        role: role || "student",
        profile: {
            profilePhoto,
        },
    });
};

const UpdateProfileService = async (
    _id,
    fullname,
    email,
    phoneNumber,
    role,
    bio,
    skills,
    resume,
    resumeOriginalName,
    profilePhoto
) => {
    return await User.findByIdAndUpdate(
        { _id },
        {
            fullname,
            email,
            phoneNumber,
            role,
            profile: {
                bio,
                skills: skills.split(/[,\s]+/),
                resume,
                resumeOriginalName,
                profilePhoto,
            },
        },
        { new: true }
    );
};
export {
    userFindService,
    userFindServiceById,
    userCreateService,
    UpdateProfileService,
};
