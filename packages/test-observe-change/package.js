Package.describe({
  name: 'test:observe-change',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'test server side observe #change',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.use('ecmascript');
  api.use('mongo');
  api.use(['templating'], 'client');
  Npm.depends({lodash: '4.17.5'});
  api.mainModule('change_client.js', 'client');
  api.mainModule('change_server.js', 'server');
});

