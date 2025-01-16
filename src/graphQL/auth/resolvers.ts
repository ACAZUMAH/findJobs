import { login, register } from "../../services/auth/auth";
import { verifyOtpAndCompleteAuth } from "../../services/auth";
import { 
    MutationLoginWithPhoneAndPasswordArgs, 
    MutationSignupWithPhoneAndPasswordArgs, 
    MutationVerifyOtpArgs 
} from "../../common/Interfaces/graphql/graphql";

const signupWithPhoneAndPassword = async (_: any, args: MutationSignupWithPhoneAndPasswordArgs ) => {
    return await register(args.data!);
};

const loginWithPhoneAndPassword = async (_: any, args: MutationLoginWithPhoneAndPasswordArgs) => {
    return await login(args.data!);
}

const verifyOtp = async (_: any, args: MutationVerifyOtpArgs) => {
    return await verifyOtpAndCompleteAuth(args.data!.code);
};

export const authResolvers = {
    Mutation: {
        signupWithPhoneAndPassword,
        loginWithPhoneAndPassword,
        verifyOtp
    },
};