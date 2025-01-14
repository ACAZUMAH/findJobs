"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterJobs = exports.deleteJob = exports.updateJob = exports.findJobById = exports.findAllJobsByUser = exports.getJobs = exports.saveJob = void 0;
const jobs_1 = __importDefault(require("../../models/jobs/jobs"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * this function saves a job to the database
 * @param data job information
 * @returns saved job
 * @throws Error if job creation failed
 */
const saveJob = async (data) => {
    const create = await jobs_1.default.create({ ...data });
    if (!create)
        throw new Error("Job creation failed");
    return create;
};
exports.saveJob = saveJob;
/**
 * this function gets all jobs from the database
 * @param query query parameters
 * @returns all jobs
 * @throws Error if no jobs found
 */
const getJobs = async (query) => {
    let page = Number(query.page) || 1;
    let limit = Number(query.limits) || 10;
    const skips = (page - 1) * limit;
    const jobs = jobs_1.default.find({});
    const result = await jobs.skip(skips).limit(limit);
    if (!result)
        throw new Error("No jobs found");
    return result;
};
exports.getJobs = getJobs;
/**
 * this function gets all jobs posted by a user
 * @param userId user id
 * @returns all jobs by user
 * @throws BadRequest if user has no posted jobs
 */
const findAllJobsByUser = async (userId, query) => {
    let page = Number(query.page) || 1;
    let limit = Number(query.limits) || 10;
    const skips = (page - 1) * limit;
    const jobs = jobs_1.default.find({ createdBy: userId });
    const result = await jobs.skip(skips).limit(limit);
    if (!result)
        throw new http_errors_1.default.BadRequest("user has no posted jobs");
    return result;
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
    const data = await jobs_1.default.findOne({ createdBy: userId, _id: jobId });
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
        const newUpdate = await jobs_1.default.findOneAndUpdate({
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
    const deleted = await jobs_1.default.findOneAndDelete({ createdBy: userId, _id: jobId });
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
const filterJobs = async (query) => {
    const { company, position, status, salary, page, limits, sortBy } = query;
    const queryObject = {};
    if (company)
        queryObject.company = company;
    if (position)
        queryObject.position = position;
    if (status)
        queryObject.status = status;
    if (salary) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        const filter = salary.replace(regEx, (matched) => `-${operatorMap[matched]}-`);
        filter.split(',')
            .forEach((item) => {
            const [field, operator, value] = item.split('-');
            queryObject[field] = { [operator]: Number(value) };
        });
    }
    let result = jobs_1.default.find(queryObject);
    if (sortBy) {
        const sortfields = sortBy.split(',').join(' ');
        result = result.sort(sortfields);
    }
    else {
        result = result.sort('createdAt');
    }
    const pages = Number(page) || 1;
    const limit = Number(limits) || 20;
    const skip = (pages - 1) * limit;
    result = result.skip(skip).limit(limit);
    const product = await result;
    if (!product)
        throw new http_errors_1.default.BadRequest("No jobs found");
    return product;
};
exports.filterJobs = filterJobs;
exports.default = {
    saveJob: exports.saveJob,
    getJobs: exports.getJobs,
    findAllJobsByUser: exports.findAllJobsByUser,
    findJobById: exports.findJobById,
    updateJob: exports.updateJob,
    deleteJob: exports.deleteJob,
    filterJobs: exports.filterJobs
};
//# sourceMappingURL=index.js.map