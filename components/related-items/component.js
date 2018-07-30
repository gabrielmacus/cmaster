app.component('relatedItems', {
        bindings: {
            module:'=',
            model:'=',
            parentKey:'=',
            childKey:'=',
            relationType:'=?',
            properties:'=',
            unrelateArray:'=',
            label:'=',
            errors:'=?',
            singleItem:'=?'
        },
        transclude:true,
        controller: function ($scope,$timeout) {


            var self =this;

            self.moveRelated=function (direction,actualPosition) {

                var arr = self.model;

                if(arr && (actualPosition + direction) >= 0 && (actualPosition + direction) < arr.length)
                {
                    var posA = actualPosition;
                    var posB = actualPosition + direction;
                    var temp = angular.copy(arr[posA]);
                    arr[posA] = angular.copy(arr[posB]);
                    arr[posB] = temp;


                    /*

                    for(var k in arr)
                    {
                        if(self.relationType == 'child')
                        {
                            console.log("CHILD POS");
                            console.log(k);
                            console.log(arr[k].name)

                            arr[k]._relationData.child_position = k;
                        }
                        else {
                            arr[k]._relationData.parent_position = k;
                        }

                    }*/


                }


            };

            self.createNew=function () {
                self.openCreate=true;
            }

            self.onCreatedItem=function (item) {

                if(item)
                {

                    self.model.push(item);
                }
                else {
                    self.openCreate=false;
                }

            }

            self.$onInit=function () {
                self.relationType =!self.relationType?'child':self.relationType;

                self.model = self.model?self.model:[];

                $scope.$watchCollection("$ctrl.model",function (newCollection) {

                    if(newCollection)
                    {

                        self.errors=false;

                        for(var k in newCollection)
                        {
                            newCollection[k]._relationData = ! newCollection[k]._relationData?{}: newCollection[k]._relationData;
                            newCollection[k]._relationData.module=self.module;
                            newCollection[k]._relationData.type = self.relationType;
                            if(self.childKey)
                            {

                                newCollection[k]._relationData.childKey = self.childKey;
                            }
                            if(self.parentKey)
                            {
                                newCollection[k]._relationData.parentKey = self.parentKey;
                            }

                        }
                    }

                },true);


                self.clone=function (item) {
                    self.model.push(angular.copy(item));
                }

                self.unrelate=function (k) {

                    self.unrelateArray = !self.unrelateArray?[]:self.unrelateArray;
                    self.unrelateArray.push(angular.copy(self.model[k]));
                    self.model.splice(k,1);

                };

                self.toolbarActions=function (listCtrl) {


                    return [{id:'select','label':'Seleccionar','icon':'fas fa-check',visible:listCtrl.defaultToolbarActions[1].visible,'action':function () {

                       var selected = angular.copy(self.selectedItems);
                       for(var k in selected)
                       {


                           if(!self.model){
                               self.model=[];
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