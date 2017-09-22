switch ((process.env.NODE_ENV).trim()) {
  case 'uat':
  case 'production':
    module.exports = require('./config/webpack.prod.js');
    break;
  case 'dev':
  case 'integration':
  default:
    module.exports = require('./config/webpack.dev.js');
}