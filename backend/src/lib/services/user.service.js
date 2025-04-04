import User from "../../models/user.model.js";

const userFindService = async (email, passwordOption = "-password") =>
    await User.findOne({ email }).select(passwordOption);

const userCreateService = async ({
    fullname,
    email,
    phoneNumber,
    password,
    role,
}) => {
    return await User.create({
        fullname,
        email,
        phoneNumber: Number(phoneNumber),
        password,
        role: role || "student",
    });
};

const UpdateProfileService = async (
    _id,
    fullname,
    email,
    phoneNumber,
    role,
    bio,
    skills
) => {
    return await User.findOneAndUpdate(
        { _id },
        {
            fullname,
            email,
            phoneNumber,
            role,
            profile: {
                bio,
                skills: skills.split(","),
            },
        },
        { new: true }
    );
};
export { userFindService, userCreateService, UpdateProfileService };
