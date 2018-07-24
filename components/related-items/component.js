app.component('relatedItems', {
        bindings: {
            module:'=',
            model:'=',
            parentKey:'=',
            childKey:'=',
            relationType:'=',
            properties:'=',
            label:'='
        },
        transclude:true,
        controller: function ($scope,$timeout) {


            var self =this;


            self.$onInit=function () {
                self.relationType =!self.relationType?'child':self.relationType;

                self.model = self.model?self.model:[];
                self.unrelate=function (k) {
                   //TODO: unrelate
                }
                self.toolbarActions=function (listCtrl) {


                    return [{'label':'Seleccionar','icon':'fas fa-check',visible:listCtrl.defaultToolbarActions[1].visible,'action':function () {

                       var selected = angular.copy(self.selectedItems);
                       for(var k in selected)
                       {
                           selected[k]._relationData = ! selected[k]._relationData?{}: selected[k]._relationData;
                           selected[k]._relationData.module=self.module;
                           if(self.childKey)
                           {
                               selected[k]._relationData.child_key = self.childKey;
                           }
                           if(self.parentKey)
                           {
                               selected[k]._relationData.parent_key = self.parentKey;
                           }
                           if(self.relationType == 'child')
                           {
                               self.relationType.child_position = k;
                           }
                           else {
                               self.relationType.parent_position = k;
                           }


                           self.model.push(selected[k])
                       }
                        self.openList=false;

                    }},listCtrl.defaultToolbarActions[1]];


                };
            }
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