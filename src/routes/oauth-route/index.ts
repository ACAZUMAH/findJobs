require('../../services/auth/oauth/index')
import { Router } from 'express';
import passport from 'passport';
import { googleAuth } from 'src/controllers';


const router = Router();


router.get(
    '/google', 
    passport.authenticate("google", { scope: ['email', 'profile'] } )
);


router.get('/redirect', passport.authenticate('google'), googleAuth);

export default router;
