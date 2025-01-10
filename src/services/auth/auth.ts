import createHttpError from "http-errors";
import { comparePassword, hashPassword, sendSms } from "../../common/helpers";
import { createUser, checkUserExists } from "../user";
import { authInput } from "../../common/Interfaces";
import { createAuth } from ".";
import { isDevelopment } from "../../common/contstants";

/**
 * register the user and send otp code
 * @returns user name and token
 * @throws BadRequest if validation fails and user already exists
 */
export const register = async (input: authInput) => {
   const { phone } = input;
   await checkUserExists(phone);
   const hash = await hashPassword(input.password);
   const user = await createUser({ ...input, password: hash });
   const token = await createAuth(user._id, 5);

   const message = `Your verification code is ${token}`;

   await sendSms(phone, message);
   
   if(isDevelopment) return { message: `otp: ${token}` };

   return { message: 'OTP send to your phone' };
};

/**
 * this controller logs in a user
 * @param _req Request
 * @param _res Response
 * @returns user name and token
 * @throws BadRequest if validation fails,
 * user does not exist or password is incorrect
 */
// export const login = async (_req: Request, _res: Response) => {
//   const { email, password } = _req.body;
//   const user = await findUserByEmail(email);
//   const match = await comparePassword(password, user.password);
//   if (!match) throw new createHttpError.BadRequest("Invalid credentials");
//   const token = genAccestoken({ _id: user._id, email: user.email });
//   return _res
//     .status(200)
//     .json({ status: "success", data: { user: user.name, token } });
// };
