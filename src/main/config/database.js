const path = require('path');

module.exports = {
  development: {
    storage: path.join(__dirname, '../../../crud.db'),
    logging: console.log,
  },
  production: {
    storage: path.join(process.resourcesPath, 'crud.db'),
    logging: false,
  }
};
