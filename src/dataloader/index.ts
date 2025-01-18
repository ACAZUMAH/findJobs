import { createUserLoader } from "./users";
import { createJobsLoader } from "./jobs";

export const createDataLoaders = () => ({ 
    userLoader: createUserLoader(),
    jobLoader: createJobsLoader()
})