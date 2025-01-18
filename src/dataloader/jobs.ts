import DataLoader from "dataloader";
import { jobModel } from "../models";

export const createJobsLoader = () => {
  const getJobsByIds = async (ids: readonly string[]) => {
    const jobs = await jobModel.find({ createdBy: { $in: ids } });
    return ids.map((id) => jobs.find((job) => job.createdBy.toString() === id));
  };

  return new DataLoader(getJobsByIds);
};
