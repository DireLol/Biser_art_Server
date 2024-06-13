const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const userService = require('../service/userService');
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/user/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userService.googleLogin(profile);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;