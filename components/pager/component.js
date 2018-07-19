app.component('pager', {
    bindings: {

        pagination:'<'

    },
    controller: function () {

        var self = this;
        self.$onChanges = function (changes) {

            if (changes.pagination) {
/*

                var currentPage = self.pagination.offset;
                var pagerStart =  currentPage - self.pagination.offset;
                var pagerEnd = currentPage + $scope.offset;
                var pagerArray = [];

                for(var i=pagerStart;i<=pagerEnd;i++)
                {
                    if(i>-1)
                    {
                        var number = i+1;
                        if(number <= pagination.pages)
                        {
                            pagerArray.push({number:number});
                        }


                    }

                }

                this.pagerArray = pagerArray;*/

            }
        };

    },
    templateUrl:"components/pager/view.html"
});