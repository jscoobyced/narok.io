const config = require('./config.json');

export const getApplicationConfig = () => ({
  Port: config.api.port,
  Server: config.api.server,
});

export const getGoogleParams = () => ({
  client_id: config.google.clientId,
  scope: config.google.scope,
  accessType: config.google.accessType,
  cookiePolicy: config.google.cookiePolicy,
  fetchBasicProfile: config.google.fetchBasicProfile,
});
