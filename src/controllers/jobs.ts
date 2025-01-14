import { Request, Response } from "express";
import job, { saveJob } from "../services/jobs";

/**
 * this controller gets all jobs from the database
 * @param _req Request
 * @param _res Response
 * @returns all jobs
 */
export const getAllJobs = async (_req: Request, _res: Response) =>{    
    const jobs = await job.getJobs(_req.query);
    return  _res.status(200).json({ status: 'success', data: jobs });
};

/**
 * this controller gets all jobs posted by a user
 * @param _req Request
 * @param _res Response
 * @throws BadRequest if user has no posted jobs
 */
export const getAllJobsByUser = async (req: Request, res: Response) =>{
    const jobs = await job.findAllJobsByUser(req.user._id, req.query);
    return  res.status(200).json({ status: 'success', data: jobs });
}

/**
 * this controller gets a one job from the database by id
 * @param _req Request
 * @param _res Response
 * @returns one job by id
 * @throws BadRequest if job not found
 */
export const getJob = async (_req: Request, _res: Response) =>{
    const jobId = _req.params.id;
    const data = await job.findJobById(_req.user._id, jobId);
    return _res.status(200).json({ status: 'success', data: data });
}; 

/**
 * this controller saves a job to the database
 * @param _req Request
 * @param _res Response
 * @returns saved job
 * @throws BadRequest if job creation failed and if validation fails
 */
export const createJob = async (_req: Request, _res: Response) =>{
    const save = await saveJob({ ..._req.body, createdBy: _req.user._id, });
    return _res.status(201).json({ status: 'success', data: save });
};

/**
 * this controller updates a job in the database
 * @param _req Request
 * @param _res Response
 * @returns updated job
 * @throws BadRequest if job not found and if validation fails
 */
export const updateJob = async (_req: Request, _res: Response) =>{  
    const { id } = _req.query;
    const update = await job.updateJob({ userId: _req.user._id, jobId: id, ..._req.body })
    return _res.status(200).json({ status: 'success', data: update });
};

/**
 * this controller deletes a job from the database
 * @param _req Request
 * @param _res Response
 * @returns success message
 */
export const deleteJob = async (_req: Request, _res: Response) =>{
    const { id } = _req.query;
    await job.deleteJob(_req.user._id, id as string);
    return _res.status(204).json({ status: 'success' });
};

export const searchJobs = async (_req: Request, _res: Response) => {
    const result = await job.filterJobs({ ..._req.query });
    if(result.length === 0)
        return _res.status(404).json({ status: 'failure', message: 'No result found' });
    return _res.status(200).json({ status: 'success', data: result });
};

export default { 
    getAllJobsByUser,
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    searchJobs
}  