import { login, register } from "../../services/auth/auth";
import { verifyOtpAndCompleteAuth } from "../../services/auth";
import { 
    MutationLoginWithPhoneAndPasswordArgs, 
    MutationSignupWithPhoneAndPasswordArgs, 
    MutationVerifyOtpArgs 
} from "../../common/Interfaces/graphql/graphql";

const signupWithPhoneAndPassword = async (_: any, args: MutationSignupWithPhoneAndPasswordArgs ) => {
    return await register(args.input!);
};

const loginWithPhoneAndPassword = async (_: any, args: MutationLoginWithPhoneAndPasswordArgs) => {
    return await login(args.input!);
}

const verifyOtp = async (_: any, args: MutationVerifyOtpArgs) => {
    return await verifyOtpAndCompleteAuth(args.input!.code);
};

export const authResolver = {
    Mutation: {
        signupWithPhoneAndPassword,
        loginWithPhoneAndPassword,
        verifyOtp
    },
};