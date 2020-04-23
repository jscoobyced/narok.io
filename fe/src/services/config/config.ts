const config = require('./config.json');

export const getApplicationConfig = () => ({
  Port: config.api.port,
  Server: config.api.server,
});

export const getCopyright = () => ({
  Year: config.copyright.year,
  Author: config.copyright.author,
});
