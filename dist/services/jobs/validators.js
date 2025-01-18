"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJobData = void 0;
const ajv_1 = __importDefault(require("ajv"));
const http_errors_1 = __importDefault(require("http-errors"));
const validateJobData = (data) => {
    const ajv = new ajv_1.default();
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
    const isValid = validate(data);
    if (!isValid) {
        const errs = validate.errors?.map(err => {
            return { key: err.instancePath, message: err.message };
        });
        throw new http_errors_1.default.BadRequest(JSON.stringify(errs));
    }
    ;
    return true;
};
exports.validateJobData = validateJobData;
//# sourceMappingURL=validators.js.map