import createError from "http-errors";
import { comparePassword, hashPassword, jwtSign } from "../../common/helpers";
import {
  createUser,
  checkUserExists,
  getUserByPhone,
  getUserById,
} from "../user";
import { createUserInput, loginUserInput } from "../../common/Interfaces";
import { createAuth } from ".";
import { isDevelopment } from "../../common/contstants";
import { sendSms } from "../messaging";
/**
 * register the user and send otp code
 * @returns user name and token
 * @throws BadRequest if validation fails and user already exists
 */
export const register = async (input: createUserInput) => {
  const { phone } = input;
  await checkUserExists(phone);
  const hash = await hashPassword(input.password);
  const user = await createUser({ ...input, password: hash });
  const token = await createAuth(user._id, 5);

  await sendSms(phone, token);

  if (isDevelopment) return { message: `otp: ${token}` };

  return "OTP send to your phone";
};

/**
 * login user
 * @returns user and token
 * @throws BadRequest if validation fails,
 * user does not exist or password is incorrect
 */
export const login = async (input: loginUserInput) => {
  const { phone, password } = input;
  const auth = await getUserByPhone(phone);
  const isMatch = await comparePassword(password, auth.password);
  if (!isMatch) throw new createError.BadRequest("Invalid password");
  if (!auth.isAuthenticated) {
    const token = await createAuth(auth._id, 5);
    await sendSms(phone, token);
    return "OTP send to your phone";
  }
  const user = await getUserById(auth._id);
  const token = jwtSign({ id: user._id });
  return { user, token };
};
