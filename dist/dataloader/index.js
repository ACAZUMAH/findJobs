"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataLoaders = void 0;
const users_1 = require("./users");
const jobs_1 = require("./jobs");
const createDataLoaders = () => ({
    userLoader: (0, users_1.createUserLoader)(),
    jobLoader: (0, jobs_1.createJobsLoader)()
});
exports.createDataLoaders = createDataLoaders;
//# sourceMappingURL=index.js.map