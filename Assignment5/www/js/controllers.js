angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {

  $scope.form = {}

  $scope.search = function() {
    console.log("search() called");

    abv = "";
    ibu = "";
    org = "";
    yr = "";

    if ($scope.form.abvmin != null && $scope.form.abvmax != null) {
      abv = "" + $scope.form.abvmin + "," + $scope.form.abvmax;
    }

    else if ($scope.form.abvmin != null) {
      abv = "%2B" + $scope.form.abvmin;
    }

    else if ($scope.form.abvmax != null) {
      abv = "-" + $scope.form.abvmax;
    }

    if ($scope.form.ibumin != null && $scope.form.ibumax != null) {
      ibu = "" + $scope.form.ibumin + "," + $scope.form.ibumax;
    }

    else if ($scope.form.ibumin != null) {
      ibu = "%2B" + $scope.form.ibumin;
    }

    else if ($scope.form.ibumax != null) {
      ibu = "-" + $scope.form.ibumax;
    }


    if ($scope.form.organic == true) {
      org = "Y";
    }

    if ($scope.form.vintage) {
    yr = "" + $scope.form.vintage;
    }

    $http({
      method: 'GET',
      url: "https://salty-taiga-88147.herokuapp.com/beers",
      params: {
        name: $scope.form.name,
        abv: abv,
        ibu: ibu,
        year: yr,
        isOrganic: org
      }
    }).then(function successCallback(response) {

      console.log(response);
      BeerData.data = response;

      console.log('Got a response from BreweryDB!');

      $state.go('app.beers');

    }, function errorCallback(response) {
      console.log("ERROR: search() failed");
      console.log(response);
    });

  }
  
}) 

.controller('BeersCtrl', function($scope, BeerData) {

  console.log("BeersCtrl");

  $scope.beers = BeerData.data.data.data;


})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {

  var id = $stateParams.id;

  for (i = 0; i < BeerData.data.data.data.length; i++) {
    if (BeerData.data.data.data[i].id == id) $scope.beer = BeerData.data.data.data[i];
  }

  console.log($scope.beer);
  
})

.factory('BeerData', function() {

  return {data: {}};

});