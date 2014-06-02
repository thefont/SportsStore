angular.module("sportsStore")
    .constant("dataUrl" , "http://api.everlive.com/v1/GdEbsTfoplVswoss/Product")
    .constant("orderUrl", "http://api.everlive.com/v1/GdEbsTfoplVswoss/Orders")
    .controller("sportsStoreCtrl", function($scope, $http, $location, dataUrl, orderUrl, cart){
        $scope.data = {};

        $http.get(dataUrl)
            .success(function(data){
                var products = data.Result;
                $scope.data.products = products;
            })
            .error(function(error){
                $scope.data.error = error;
            });

        $scope.sendOrder = function(shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();

            console.log("order", order);

            $http.post(orderUrl, order)
                .success(function(data){
                    $scope.data.orderId = data.Id;
                    cart.getProducts().length = 0;
                })
                .error(function(error){
                    $scope.data.orderError = error;
                })
                .finally(function() {
                    $location.path("/complete");
                });
        }
    });