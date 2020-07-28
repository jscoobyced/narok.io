const config = require('./config.json');

export const getApplicationConfig = (mode: string) => {
  let applicationConfig = config.api.development;
  if (mode === 'production') {
    applicationConfig = config.api.production;
  }
  return {
    Port: applicationConfig.port,
    Server: applicationConfig.server,
    isSecure: applicationConfig.secure,
  };
};

export const getGoogleParams = () => ({
  client_id: config.google.clientId,
  scope: config.google.scope,
  accessType: config.google.accessType,
  cookiePolicy: config.google.cookiePolicy,
  fetchBasicProfile: config.google.fetchBasicProfile,
});
