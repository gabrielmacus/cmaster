app.component('dataset', {
        bindings: {
            properties:'=',
            items:'=',
            pagination:'=',
            changePage:'<',
            individualActions:'=',
            generalActions:'=',
            gridMode:'=',
            pagerOffset:'<',
            selectedItems:'=',
            singleSelection:'=',
            loading:'=',
            emptyMessage:'='
        },
        controller: function ($scope,$window,$timeout) {
            var self = this;


            self.$onInit=function () {



                self.onUpdateItemSelection=function (item) {

                    $timeout(function () {
                        
                        self.selectedItems =self.items.filter(function (t) { return t._selected });
                        $scope.$apply();
                    })
                }

                self.viewMode = 'grid-list';
                if(self.gridMode !== true)
                {
                    self.viewMode = 'table';


                    self.checkBreakpoint=function() {

                        if($window.innerWidth<=self.gridMode)
                        {
                            self.viewMode = 'grid-list';
                        }
                        else {
                            self.viewMode = 'table';
                        }
                        $timeout(function () {
                            $scope.$apply()
                        })

                    }

                    if(self.gridMode)
                    {
                        angular.element($window).bind('resize', function(){

                            self.checkBreakpoint();


                        });

                        self.checkBreakpoint();
                    }







                }
            }


        },
    templateUrl:"components/dataset/view.html"
    });