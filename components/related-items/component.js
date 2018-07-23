app.component('relatedItems', {
        bindings: {
            module:'=',
            model:'=',
            parentKey:'='
        },
        transclude:true,
        controller: function ($scope,$timeout) {

            var self =this;
            self.selectExistant=function () {

                self.selectedItems=[];
                self.openList = true;

                $timeout(function () {
                    $scope.$apply();
                })

            }


        },
    templateUrl:"components/related-items/view.html"
    });