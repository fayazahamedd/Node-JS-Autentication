const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require('./environment');
console.log('Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
passport.use(
  new googleStrategy(
    {
      clientID: "45267445678-qvoa1fkousnr3g9ofa5aaqevgmel88du.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          console.log('Created User', newUser);
          return done(null, newUser);
        }
      } catch (error) {
        console.log('Error in OAuth', error);
        return;
      }
    }
  )
);

module.exports = passport;