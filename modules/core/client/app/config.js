(function (window) {
  'use strict';

  var applicationModuleName = 'mean';
  var application = window.application || false;

  var service = {
    applicationModuleName: applicationModuleName,
    applicationLanguage: application.language || 'en-us',
    applicationLanguages: application.languages || ['en-us'],
    applicationModuleVendorDependencies: ['ngResource', 'ngCookies', 'tmh.dynamicLocale', 'pascalprecht.translate', 'ngAnimate', 'ngMessages', 'ui.router', 'ui.bootstrap', 'angularFileUpload'],
    registerModule: registerModule
  };

  window.ApplicationConfiguration = service;

  // Add a new vertical module
  function registerModule(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  }
}(window));
