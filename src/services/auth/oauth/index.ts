import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import { createGoogleUser, findUserByEmail } from 'src/services/user';
import { logger } from 'src/logger';
import { userDocument } from 'src/common/Interfaces';

passport.serializeUser((user, done) => {
    return done(null, user)
});

passport.deserializeUser( async (user: userDocument, done) => {
    const found = await findUserByEmail(user.email);
    return found ? done(null, found) : done(null, null);
});

export default passport.use(
    new Strategy({
        clientID: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
        callbackURL: `${process.env.REDIRECT_URL}`,
        scope: [
            'email', 
            'profile'
        ]
    }, async (_accessToken, _refreshToken, profile, done) => {
        try {
            const user = await findUserByEmail(`${profile._json.email}`);
            if(user) return done(null, user);
            const newUser = await createGoogleUser({
                email: `${profile._json.email}`,
                username: profile.username!
            });
            return done(null, newUser);
        } catch (error) {
            logger.error(error)
            return done(error);
        };
    })
);

