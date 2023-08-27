const User = require('../models/user')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Home Dashboard
module.exports.homeDashboard = async function (req, res) {
    res.render('login_dashboard', {
        title: 'Profile',
    });
}

// Sign Up
module.exports.signup = async function (req, res) {
    req.flash("success", "Navigated");
    return res.render('sign_up', {
        title: 'Sign Up',
    });
};

//Create on sign up
module.exports.createUser = async function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
        req.flash('error', "Passwords do not match");
        return res.redirect("back");
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            req.flash('success', 'Successfully signUp')
            return res.redirect("/users/signin");
        } else {
            return res.redirect("/users/signin");
        }
    } catch (err) {
        console.log('Error in creating the user:', err);
        req.flash("error", "An error occurred");
        return res.redirect("/users/signin");
    }
};

//sign In
module.exports.signIn = function (req, res) {
    return res.render("sign_in", {
        title: "Sign In",
    });
};

module.exports.createSession = function (req, res) {
    console.log('Create Session')
    req.flash("success", "Logged in Successfully");
    return res.redirect("/users/update");
};

module.exports.update = async function (req, res) {
    return res.render("reset_password", {
        title: "Reset Password",
    });
}

module.exports.reset = async function (req, res) {
    const message = req.flash('error', 'reseted');
    res.render('back');
}

module.exports.resetNew = async function (req, res) {
    const { email } = req.body;
    console.log(req.body.email);

    try {
        const user = await User.findOne({ email });
        console.log('User:', user);

        if (!user) {
            req.flash('error', 'No user with that email address found');
            return res.redirect('/users/update');
        }

        const newPassword = crypto.randomBytes(10).toString('hex');
        const saltRounds = 10;
        // const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        user.password = newPassword;
        await user.save();

        // Send password reset email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "YOUR_CLIENT_EMAIL",
                pass: "YOUR_CLIENT_PASS",
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `Your new password: ${newPassword}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        req.flash('success', 'Password reset email sent');
        console.log('Correct');
        res.redirect('/users/signin');
    } catch (err) {
        console.error('Error in password reset:', err);
        req.flash('error', 'An error occurred');
        res.redirect('/users/signin');
    }
}

module.exports.auth = async function (req, res) {
    req.flash("success", "Logged in Successfully");
    return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log("Error during logout:", err);
            return res.redirect("/");
        }
        req.flash("success", "Logged out Successfully");
        return res.redirect("/");
    });
};
