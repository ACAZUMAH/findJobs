import { Router, Express } from 'express';
//import authRoute from './auth-route';
//import jobRoute from './jobs-route';

const routes: { path: string, router: Router }[] = [
  // {
  //   path: '/api',
  //   router: authRoute
  // },
  // {
  //   path: '/api',
  //   router: jobRoute
  // }
]


export const applyRouters = (app: Express ) => {
  routes.map((route) => { app.use(route.path, route.router)});
};

