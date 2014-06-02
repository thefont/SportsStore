angular.module("cart", [])
    .factory("cart", function(){
        var cartData = [];

        return {
            addProduct: function(Id, name, price) {
                var addedToExistingItem = false;

                for(var i=0; i<cartData.length; i++){
                    if(cartData[i].Id == Id){
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }

                if(!addedToExistingItem) {
                    cartData.push({
                        count: 1, Id: Id, price: price, name: name
                    });
                }
            },

            removeProduct: function(Id){
                for(var i=0; i<cartData.length; i++){
                    if(cartData[i].Id == Id){
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },

            getProducts: function(){
                return cartData;
            }
        }
    })
    .directive("cartSummary", function(cart){
        return {
            restrict: "E",
            templateUrl: "components/cart/cartSummary.html",
            controller: function($scope){
                var cartData = cart.getProducts();

                $scope.total = function() {
                    var total = 0;
                    for(var i=0; i<cartData.length; i++)
                        total += (cartData[i].price * cartData[i].count);
                    return total;
                }

                $scope.itemCount = function(){
                    var total = 0;
                    for(var i=0; i<cartData.length; i++)
                        total += cartData[i].count;
                    return total;
                }
            }
        };
    });