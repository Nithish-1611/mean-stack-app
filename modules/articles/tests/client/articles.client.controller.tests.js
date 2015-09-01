'use strict';

(function () {
  // Articles Controller Spec
  describe('Articles List Controller Tests', function () {
    // Initialize global variables
    var ArticlesListController,
      scope,
      rootScope,
      $httpBackend,
      $state,
      Authentication,
      Articles,
      mockArticle;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _Articles_) {
      // Set a new global scope
      scope = $rootScope.$new();
      rootScope = $rootScope;

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      Articles = _Articles_;

      // create mock article
      mockArticle = new Articles({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Article about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Articles controller.
      ArticlesListController = $controller('ArticlesListController', {
        $scope: scope,
        article: {}
      });

      //Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockArticles,
          sampleArticleData;

      beforeEach(function () {
        // Create a sample article object
        sampleArticleData = new Articles({
          title: 'An Article about MEAN',
          content: 'MEAN rocks!'
        });

        mockArticles = [mockArticle, sampleArticleData];
      });

      it('should send a GET request and return all articles', inject(function (Articles) {
        // Set POST response
        $httpBackend.expectGET('api/articles').respond(mockArticles);


        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.articles.length).toEqual(2);
        expect(scope.articles[0]).toEqual(mockArticle);
        expect(scope.articles[1]).toEqual(sampleArticleData);

        // Test URL redirection after the article was created
        //expect($state.go).toHaveBeenCalledWith('articles.view', {articleId: mockArticle._id});
      }));
    });
  });
}());
