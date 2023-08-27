const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//Auth using passport
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password !== password) {
            req.flash("error", "Invalid Username/Password");
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch((err) => {
          req.flash("error", err);
          console.log("Error in finding the user", err);
          return done(err);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("USER", user)
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    console.log("Error in finding user --> passport", err);
    return done(err);
  }
});


passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/signin");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;