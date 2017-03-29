angular.module('githubApp').controller('mainCtrl', function($scope, githubService) {
    $scope.test="hello world"
    $scope.testtest = githubService.testtest;
    githubService.getGithubInfo().then(function(result){
          console.log(result.data)
          $scope.userInfo = result.data;
    })
    $scope.getFriends = function() {
      githubService.getGithubFriends().then(function(result){
        console.log(result.data)
            $scope.userFriends = result.data;
            console.log($scope.userFriends)
      })
    }
  })
