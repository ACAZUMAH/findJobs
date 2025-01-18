import { FilterQuery, QueryOptions, Types } from "mongoose";
import { jobModel } from "../../models";
import createError from "http-errors";
import { validateJobData } from "./validators";
import { createJob, jobDocument, jobsfilter, updateJob } from "../../common/Interfaces";
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
 * get job by id
 * @param userId user id
 * @param jobId job id
 * @returns one job by id
 * @throws BadRequest if job not found
 */
export const findJobById = async (jobId: string | Types.ObjectId) => {
  if(!Types.ObjectId.isValid(jobId)) throw new createError.BadRequest('Invalid job id');

  const data = await jobModel.findOne({ _id: jobId });

  if (!data) throw new createError.BadRequest("job not found");

  return data;
};

/**
 * this function updates a job in the database
 * @param data userId, jobId and new job data to update
 * @returns updated job
 */
export const updateJobById = async (data: updateJob) => {
  
  const job = await findJobById(data.id);

  const updateData = {
    ...(data.company && { company: data.company }),
    ...(data.location && { location: data.location }),
    ...(data.position && { position: data.position }),
    ...(data.description && { description: data.description }),
    ...(data.workArrangement && { workArrangement: data.workArrangement}),
    ...(data.requirements && { requirements: data.requirements }),
    ...(data.salary && { salary: data.salary })
  };

  return await jobModel.findByIdAndUpdate(
    { _id: job._id },
    { $set:  updateData },
    { new: true }
  );
};

/**
 * this function deletes a job from the database
 * @param userId user id
 * @param jobId job id
 * @returns true if job is deleted
 * @throws BadRequest if job not found
 */
export const deleteJob = async (userId: string | Types.ObjectId, jobId: string | Types.ObjectId) => {
  if(!Types.ObjectId.isValid(jobId) || !Types.ObjectId.isValid(userId))
    throw new createError.BadRequest("Invalid job Id or user id");

  const deleted = await jobModel.findOneAndDelete({ createdBy: userId, _id: jobId});

  if (!deleted) throw new createError.BadRequest("job not found");

  return deleted;
};
