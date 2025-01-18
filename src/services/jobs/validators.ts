import Ajv from "ajv";
import createError from 'http-errors'
import { createJob } from "src/common/Interfaces";

export const validateJobData = (data: createJob) => {
    const ajv = new Ajv();

    const schema = {
        type: 'object',
        properties: {
            createdBy: { type: 'string' },
            company: { type: 'string' },
            location: { type: 'string' },
            workArrangement: { type: 'string' },
            position: { type: 'string' },
            description: { type: 'string' },
            requirements: { type: 'array', items: { type: 'string' } },
            salary: { type: 'number' }
        },
        required: [
            'createdBy', 
            'company', 
            'location', 
            'workArrangement', 
            'position', 
            'description',
            'requirements',
            'salary'
        ]
    };
    const validate = ajv.compile(schema);
    const isValid = validate(data)

    if(!isValid){
        const errs = validate.errors?.map(err => {
            return { key: err.instancePath, message: err.message }
        })
        throw new createError.BadRequest(JSON.stringify(errs))
    };
    return true
}