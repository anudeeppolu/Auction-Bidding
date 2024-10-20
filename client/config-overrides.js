// config-overrides.js
module.exports = function override(config) {
    config.resolve.fallback = {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
    };
  
    return config;
  };
  