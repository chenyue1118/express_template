// get config from environment variables
// let config = {
//   env: process.env.NODE_ENV,
//   serverPort: process.env.SERVER_PORT,
// };
const config = {
  env: process.env.NODE_ENV,
  serverPort: process.env.SERVER_PORT || 6001,
  logLevel: 'info',
  secret: 'cc is api key'
};

module.exports = config;
