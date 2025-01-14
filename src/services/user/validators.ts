import Ajv from "ajv";
import addformat from "ajv-formats";
import createError from 'http-errors';
import { createUserInput } from "../../common/Interfaces";

export const validateCreateUserData = (data: createUserInput) => {
  const ajv = new Ajv();
  addformat(ajv);

  ajv.addFormat("phone", {
    type: "string",
    validate: (value: string) => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(value);
    },
  });

  const schema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        phone: { type: 'string', format: 'phone' },
        password: { type: 'string' }
    },
    required: ['username', 'phone', 'password' ]
  };

  const validate = ajv.compile(schema);
  const isValid = validate(data)

  if(!isValid) {
    const errors = validate.errors?.map(err => {
        return { key: err.instancePath, message: err.message }
    })
    throw new createError.BadRequest(JSON.stringify(errors))
  }
};

