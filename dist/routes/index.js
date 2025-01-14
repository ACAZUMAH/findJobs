"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRouters = void 0;
//import authRoute from './auth-route';
//import jobRoute from './jobs-route';
const routes = [
// {
//   path: '/api',
//   router: authRoute
// },
// {
//   path: '/api',
//   router: jobRoute
// }
];
const applyRouters = (app) => {
    routes.map((route) => { app.use(route.path, route.router); });
};
exports.applyRouters = applyRouters;
//# sourceMappingURL=index.js.map