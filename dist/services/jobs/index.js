"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.findJobById = exports.findAllJobsByUser = exports.getJobs = exports.saveJob = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../../models");
const http_errors_1 = __importDefault(require("http-errors"));
const validators_1 = require("./validators");
const helpers_1 = require("src/common/helpers");
/**
 * create job
 * @param data job information
 * @returns saved job
 * @throws Error if job creation failed
 */
const saveJob = async (data) => {
    (0, validators_1.validateJobData)(data);
    const create = await models_1.jobModel.create({ ...data });
    if (!create)
        throw new Error("Job creation failed");
    return create;
};
exports.saveJob = saveJob;
/**
 * get jobs
 * @param query query parameters
 * @returns all jobs
 * @throws Error if no jobs found
 */
const getJobs = async (filter) => {
    const query = {
        ...(filter.createdBy && { createdBy: filter.createdBy }),
        ...(filter.company && { company: filter.company }),
        ...(filter.location && { location: filter.location }),
        ...(filter.position && { position: filter.position }),
        ...(filter.workArrangement && { workArrangement: filter.workArrangement }),
        ...(filter.search && {
            $or: [
                { description: { $regex: filter.search, $options: 'i' } },
                { company: { $regex: filter.search, $options: 'i' } },
                { position: { $regex: filter.search, $options: 'i' } },
                { requirements: [{ $regex: filter.search, $options: 'i' }] },
                { location: { $regex: filter.search, $options: 'i' } },
                { workArrangement: { $regex: filter.search, $options: 'I' } }
            ]
        })
    };
    const page = (0, helpers_1.getSanitizePage)(filter.page);
    const limit = (0, helpers_1.getSanitizeLimit)(filter.limit);
    const skip = (0, helpers_1.getSanitizeOffset)(page, limit);
    const options = {
        skip,
        lean: true,
        limit: limit + 1,
        sort: { createdAt: -1 }
    };
    const jobs = await models_1.jobModel.find(query, null, options);
    return (0, helpers_1.getPageConnection)(jobs, page, limit);
};
exports.getJobs = getJobs;
/**
 * get all jobs posted by a user
 * @param userId user id
 * @returns all jobs by user
 * @throws BadRequest if user has no posted jobs
 */
const findAllJobsByUser = async (filter) => {
    if (!mongoose_1.Types.ObjectId.isValid(filter.createdBy))
        throw new http_errors_1.default.BadRequest("Invalid createdBy id");
    const query = {
        ...(filter.createdBy && { createdBy: filter.createdBy })
    };
    const page = (0, helpers_1.getSanitizePage)(filter.page);
    const limit = (0, helpers_1.getSanitizeLimit)(filter.limit);
    const skip = (0, helpers_1.getSanitizeOffset)(page, limit);
    const options = {
        skip,
        lean: true,
        limit: limit + 1,
        sort: { createdAt: -1 }
    };
    const jobs = await models_1.jobModel.find(query, null, options);
    return (0, helpers_1.getPageConnection)(jobs, page, limit);
};
exports.findAllJobsByUser = findAllJobsByUser;
/**
 * this function gets a one job from the database by id
 * @param userId user id
 * @param jobId job id
 * @returns one job by id
 * @throws BadRequest if job not found
 */
const findJobById = async (userId, jobId) => {
    const data = await models_1.jobModel.findOne({ createdBy: userId, _id: jobId });
    if (!data)
        throw new http_errors_1.default.BadRequest("job not found");
    return data;
};
exports.findJobById = findJobById;
/**
 * this function updates a job in the database
 * @param data userId, jobId and new job data to update
 * @returns updated job
 */
const updateJob = async (data) => {
    if (data.company || data.position || data.status || data.salary) {
        const newUpdate = await models_1.jobModel.findOneAndUpdate({
            _id: data.jobId,
            createdBy: data.userId,
        }, { $set: { ...data } });
        return newUpdate;
    }
};
exports.updateJob = updateJob;
/**
 * this function deletes a job from the database
 * @param userId user id
 * @param jobId job id
 * @returns true if job is deleted
 * @throws BadRequest if job not found
 */
const deleteJob = async (userId, jobId) => {
    const deleted = await models_1.jobModel.findOneAndDelete({ createdBy: userId, _id: jobId });
    if (!deleted)
        throw new http_errors_1.default.BadRequest("job not found");
    return true;
};
exports.deleteJob = deleteJob;
/**
 * filter jobs by company, position, status, salary, page, limits and sortBy
 * and return the result
 * @param query query parameters
 * @returns result of filtered jobs
 * @throws BadRequest if no jobs found
 */
// export const filterJobs = async( query: queryType) => {
//   const { company, position, status, salary, page, limits, sortBy } = query;
//   const queryObject: queryType = {};
//   if (company) queryObject.company = company;
//   if (position) queryObject.position = position;
//   if (status) queryObject.status = status;
//   if (salary){
//     const operatorMap = {
//       '>': '$gt',
//       '>=': '$gte',
//       '=': '$eq',
//       '<': '$lt',
//       '<=': '$lte'
//     }
//     const regEx = /\b(<|>|>=|=|<|<=)\b/g;
//     const filter = (salary as string).replace(regEx, (matched) => `-${operatorMap[matched]}-`);
//     filter.split(',')
//     .forEach((item) => {
//       const [field, operator, value] = item.split('-');
//       queryObject[field] = { [operator]: Number(value) };
//     });
//   }
//   let result = job.find(queryObject);
//   if (sortBy){
//     const sortfields = (sortBy as string).split(',').join(' ')
//     result = result.sort(sortfields)
//   }else{
//     result = result.sort('createdAt')
//   }
//   const pages = Number(page) || 1
//   const limit = Number(limits) || 20
//   const skip = (pages - 1) * limit
//   result = result.skip(skip).limit(limit)
//   const product = await result
//   if (!product) throw new createHttpError.BadRequest("No jobs found");
//   return product;
// }
exports.default = {
    saveJob: exports.saveJob,
    getJobs: exports.getJobs,
    findAllJobsByUser: exports.findAllJobsByUser,
    findJobById: exports.findJobById,
    updateJob: exports.updateJob,
    deleteJob: exports.deleteJob,
};
//# sourceMappingURL=index.js.map