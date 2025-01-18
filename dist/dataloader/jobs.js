"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobsLoader = void 0;
const dataloader_1 = __importDefault(require("../dataloader"));
const models_1 = require("../models");
const createJobsLoader = () => {
    const getJobsByIds = async (ids) => {
        const jobs = await models_1.jobModel.find({ createdBy: { $in: ids } });
        return ids.map((id) => jobs.find((job) => job.createdBy.toString() === id));
    };
    return new dataloader_1.default(getJobsByIds);
};
exports.createJobsLoader = createJobsLoader;
//# sourceMappingURL=jobs.js.map