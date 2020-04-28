const config = require('./config.json');

export const getApplicationConfig = () => ({
  Port: config.api.port,
  Server: config.api.server,
});

export const getCopyright = () => ({
  Year: config.copyright.year,
  Author: config.copyright.author,
});

export const getGoogleParams = () => ({
  client_id: config.google.clientId,
  scope: config.google.scope,
  accessType: config.google.accessType,
  cookiePolicy: config.google.cookiePolicy,
  fetchBasicProfile: config.google.fetchBasicProfile,
});
