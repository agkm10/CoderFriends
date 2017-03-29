angular.module('githubApp').service('githubService', function($http, $q){
  this.testtest = "service test"
    this.getGithubInfo = function() {
      return $http({
          method: "GET",
          url: 'http://localhost:3000/api/userinfo'
        })
    }
    this.getGithubFriends = function() {
      return $http({
          method: "GET",
          url: 'http://localhost:3000/api/github/following'
        })
    }

});
