// const fs = require('fs');
// const rfs = require('rotating-file-stream');
// const path = require('path');

// const logDirectory = path.join(__dirname, '../productionLogs');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = rfs.createStream('access.log', {
//   interval: '1d',
//   path: logDirectory
// });

// const development = {
//   name: 'development',
//   // assert_path: './asserts',
//   session_cookie_key: 'blahsomething',
//   db: 'codeialDev-sample',
//   smtp: {
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "fayazahamed035@gmail.com",
//       pass: "ldnjydvrcomzzfuy",
//     },
//   },
//   google_clientID: "732898388691-a60om93v1shr2bhnk6469pc5p9k0qi6t.apps.googleusercontent.com",
//   google_clientSecret: "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",
//   google_callbackURL: "http://localhost:8000/users/auth/google/callback",
//   jwt_secret_key: 'codeial',
//   morgan: {
//     mode: 'dev',
//     options: { stream: accessLogStream }
//   }
// }

// const production = {
//   name: 'production',
//   // assert_path: './asserts',
//   session_cookie_key: process.env.session_cookie_key,
//   db: 'codeialDev_production',
//   smtp: {
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "fayazahamed035@gmail.com",
//       pass: "ldnjydvrcomzzfuy",
//     },
//   },
//   google_clientID: process.env.google_clientID,
//   google_clientSecret: process.env.google_clientSecret,
//   google_callbackURL: process.env.google_callbackURL,
//   jwt_secret_key: process.env.jwt_secret_key,
//   morgan: {
//     mode: 'combined',
//     options: { stream: accessLogStream }
//   }
// }

// module.exports = eval(process.env.codial_environment) === undefined ? development : production;
// // module.exports = development; //