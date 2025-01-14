// import { Router } from 'express';
// import job from '../../controllers/jobs';
// import validate from '../../middlewares/validators';
// import auth from '../../services/authservices/jwt'
// import { validateJob, ValidateUpdateJob } from '../../middlewares/validators/validate';

// const router = Router();
// router.route('/search')
// .get(job.searchJobs);

// router.route('/jobs')
// .get(job.getAllJobs);

// router.route('/job')
// .post(auth.authorize,validate(validateJob),job.createJob);

// router.route('/jobs/user')
// .get(auth.authorize,job.getAllJobsByUser);

// router.route('/job/user')
// .get(auth.authorize,job.getJob);

// router.route('/job')
// .put(auth.authorize,validate(ValidateUpdateJob),job.updateJob);

// router.route('/job')
// .delete(auth.authorize,job.deleteJob);

// export default router;