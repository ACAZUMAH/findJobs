import { FilterQuery, QueryOptions, Types } from "mongoose";
import { jobModel } from "../../models";
import { queryType, update } from "../types";
import createError from "http-errors";
import { validateJobData } from "./validators";
import { createJob, jobDocument, jobsfilter } from "../../common/Interfaces";
import { 
  getPageConnection, 
  getSanitizeLimit, 
  getSanitizeOffset, 
  getSanitizePage 
} from "src/common/helpers";

/**
 * create job
 * @param data job information
 * @returns saved job
 * @throws Error if job creation failed
 */
export const saveJob = async (data: createJob) => {
  validateJobData(data);
  
  const create = await jobModel.create({ ...data });

  if (!create) throw new Error("Job creation failed");

  return create;
};

/**
 * get jobs 
 * @param query query parameters
 * @returns all jobs
 * @throws Error if no jobs found
 */
export const getJobs = async (filter: jobsfilter) => {
  const query: FilterQuery<jobDocument> = {
    ...(filter.createdBy && { createdBy: filter.createdBy }),
    ...(filter.company && { company: filter.company }),
    ...(filter.location && { location: filter.location }),
    ...(filter.position && { position: filter.position }),
    ...(filter.workArrangement && { workArrangement: filter.workArrangement }),
    ...(filter.search && { 
      $or: [
        { description: { $regex: filter.search, $options: 'i'} },
        { company: { $regex: filter.search, $options: 'i' } },
        { position: { $regex: filter.search, $options: 'i' } },
        { requirements: [{ $regex: filter.search, $options: 'i' }] },
        { location: { $regex: filter.search, $options: 'i' } },
        { workArrangement: { $regex: filter.search, $options: 'I' } }
      ]
    })
  };
  
  const page = getSanitizePage(filter.page);
  const limit = getSanitizeLimit(filter.limit);
  const skip = getSanitizeOffset(page, limit);

  const options: QueryOptions = {
    skip,
    lean: true,
    limit: limit + 1,
    sort: { createdAt: -1 }
  };

  const jobs = await jobModel.find(query, null, options);

  return getPageConnection(jobs, page, limit);
};

/**
 * get all jobs posted by a user
 * @param userId user id
 * @returns all jobs by user
 * @throws BadRequest if user has no posted jobs
 */
export const findAllJobsByUser = async (filter: jobsfilter) => {
  if(!Types.ObjectId.isValid(filter.createdBy!)) throw new createError.BadRequest("Invalid createdBy id");

  const query: FilterQuery<jobDocument> = {
    ...(filter.createdBy && { createdBy: filter.createdBy } )
  }

  const page = getSanitizePage(filter.page);
  const limit = getSanitizeLimit(filter.limit);
  const skip = getSanitizeOffset(page, limit);

  const options: QueryOptions = { 
    skip,
    lean: true,
    limit: limit + 1,
    sort: { createdAt: -1 }
  }
  const jobs = await jobModel.find(query, null, options);

  return getPageConnection(jobs, page, limit)
};

/**
 * this function gets a one job from the database by id
 * @param userId user id
 * @param jobId job id
 * @returns one job by id
 * @throws BadRequest if job not found
 */
export const findJobById = async (
  userId: string | Types.ObjectId,
  jobId: string | Types.ObjectId
) => {
  const data = await jobModel.findOne({ createdBy: userId, _id: jobId });
  if (!data) throw new createError.BadRequest("job not found");
  return data;
};

/**
 * this function updates a job in the database
 * @param data userId, jobId and new job data to update
 * @returns updated job
 */
export const updateJob = async (data: update) => {
  if (data.company || data.position || data.status || data.salary) {
    const newUpdate = await jobModel.findOneAndUpdate(
      {
        _id: data.jobId,
        createdBy: data.userId,
      },
      { $set: { ...data } }
    );
    return newUpdate;
  }
};

/**
 * this function deletes a job from the database
 * @param userId user id
 * @param jobId job id
 * @returns true if job is deleted
 * @throws BadRequest if job not found
 */
export const deleteJob = async (
  userId: string | Types.ObjectId,
  jobId: string | Types.ObjectId
) => {
  const deleted = await jobModel.findOneAndDelete({ createdBy: userId, _id: jobId});
  if (!deleted) throw new createError.BadRequest("job not found");
  return true
};

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

export default { 
  saveJob, 
  getJobs, 
  findAllJobsByUser, 
  findJobById, 
  updateJob,
  deleteJob,
};
