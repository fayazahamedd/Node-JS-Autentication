const express = require('express');
const router = express.Router();
const passport = require("passport");

const homeController = require('../controller/home_controller')

router.get('/signup', homeController.signup);
router.post('/create', homeController.createUser);
router.get("/signin", homeController.signIn);
// use passport as a middleware to authenticate
router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/users/signin" }),
    homeController.createSession
);

//Rest the password
router.get('/update', homeController.update);

// router.get('/forgot-password', homeController.reset);
router.post('/forgot-password', homeController.resetNew);

router.get("/sign-out", homeController.destroySession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), homeController.createSession);

module.exports = router;