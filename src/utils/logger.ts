import * as bunyan from 'bunyan';

const pkgInfo = require('../../package.json');

export const logger = bunyan.createLogger({
  name: pkgInfo.name,
  level: 'info'
});
