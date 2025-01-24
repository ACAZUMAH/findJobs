import { Router, Express } from 'express';
import oauthRoute from './oauth-route';
//import jobRoute from './jobs-route';

const routes: { path: string, router: Router }[] = [
  {
    path: '/oauth',
    router: oauthRoute
  },
]


export const applyRouters = (app: Express ) => {
  routes.map((route) => { app.use(route.path, route.router)});
};

