import { GraphqlContext } from "../../common/Interfaces";
import { register } from "../../services/auth/auth";
import { verifyOtpAndCompleteAuth } from "../../services/auth";

const signupWithPhoneAndPassword = async (_: any, { input }) => {
    return await register(input);
};

const verifyOtp = async (_: any, { input }) => {
    return await verifyOtpAndCompleteAuth(input);
};

export const authResolver = {
    Mutation: {
        signupWithPhoneAndPassword,
        verifyOtp
    }
};