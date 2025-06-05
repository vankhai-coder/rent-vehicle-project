import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GitHubStrategy } from 'passport-github'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()


// Common OAuth Callback Function
async function handleOAuthCallback(accessToken, refreshToken, profile, done, provider) {
    try {
        let user = await User.findOne({ providerId: profile.id, provider });

        if (!user) {
            user = new User({
                provider,
                providerId: profile.id,
                email: profile.emails?.[0]?.value || "",
                fullName: profile.displayName,
                image: profile.photos?.[0]?.value || "",
                role: 'customer',
                authMethod: 'oauth'

            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        console.log('error when handle OAuth callback : ', error);
        
        return done(error, null);
    }
}

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => handleOAuthCallback(accessToken, refreshToken, profile, done, "google")));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "emails", "name", "picture.type(large)"]
}, (accessToken, refreshToken, profile, done) => handleOAuthCallback(accessToken, refreshToken, profile, done, "facebook")));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => handleOAuthCallback(accessToken, refreshToken, profile, done, "github")));