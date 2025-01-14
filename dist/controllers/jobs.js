"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchJobs = exports.deleteJob = exports.updateJob = exports.createJob = exports.getJob = exports.getAllJobsByUser = exports.getAllJobs = void 0;
const jobs_1 = __importStar(require("../services/jobs"));
/**
 * this controller gets all jobs from the database
 * @param _req Request
 * @param _res Response
 * @returns all jobs
 */
const getAllJobs = async (_req, _res) => {
    const jobs = await jobs_1.default.getJobs(_req.query);
    return _res.status(200).json({ status: 'success', data: jobs });
};
exports.getAllJobs = getAllJobs;
/**
 * this controller gets all jobs posted by a user
 * @param _req Request
 * @param _res Response
 * @throws BadRequest if user has no posted jobs
 */
const getAllJobsByUser = async (req, res) => {
    const jobs = await jobs_1.default.findAllJobsByUser(req.user._id, req.query);
    return res.status(200).json({ status: 'success', data: jobs });
};
exports.getAllJobsByUser = getAllJobsByUser;
/**
 * this controller gets a one job from the database by id
 * @param _req Request
 * @param _res Response
 * @returns one job by id
 * @throws BadRequest if job not found
 */
const getJob = async (_req, _res) => {
    const jobId = _req.params.id;
    const data = await jobs_1.default.findJobById(_req.user._id, jobId);
    return _res.status(200).json({ status: 'success', data: data });
};
exports.getJob = getJob;
/**
 * this controller saves a job to the database
 * @param _req Request
 * @param _res Response
 * @returns saved job
 * @throws BadRequest if job creation failed and if validation fails
 */
const createJob = async (_req, _res) => {
    const save = await (0, jobs_1.saveJob)({ ..._req.body, createdBy: _req.user._id, });
    return _res.status(201).json({ status: 'success', data: save });
};
exports.createJob = createJob;
/**
 * this controller updates a job in the database
 * @param _req Request
 * @param _res Response
 * @returns updated job
 * @throws BadRequest if job not found and if validation fails
 */
const updateJob = async (_req, _res) => {
    const { id } = _req.query;
    const update = await jobs_1.default.updateJob({ userId: _req.user._id, jobId: id, ..._req.body });
    return _res.status(200).json({ status: 'success', data: update });
};
exports.updateJob = updateJob;
/**
 * this controller deletes a job from the database
 * @param _req Request
 * @param _res Response
 * @returns success message
 */
const deleteJob = async (_req, _res) => {
    const { id } = _req.query;
    await jobs_1.default.deleteJob(_req.user._id, id);
    return _res.status(204).json({ status: 'success' });
};
exports.deleteJob = deleteJob;
const searchJobs = async (_req, _res) => {
    const result = await jobs_1.default.filterJobs({ ..._req.query });
    if (result.length === 0)
        return _res.status(404).json({ status: 'failure', message: 'No result found' });
    return _res.status(200).json({ status: 'success', data: result });
};
exports.searchJobs = searchJobs;
exports.default = {
    getAllJobsByUser: exports.getAllJobsByUser,
    getAllJobs: exports.getAllJobs,
    getJob: exports.getJob,
    createJob: exports.createJob,
    updateJob: exports.updateJob,
    deleteJob: exports.deleteJob,
    searchJobs: exports.searchJobs
};
//# sourceMappingURL=jobs.js.map