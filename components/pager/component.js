app.component('pager', {
    bindings: {

        pagination:'='

    },
    controller: function () {

        /*
        var currentPage = pagination.offset;
        var pagerStart =  currentPage - $scope.offset;
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

        this.pagerArray = pagerArray;
*/

        this.pagerArray = [{number:1},{number:2,active:true},{number:3}];

    },
    templateUrl:"components/pager/view.html"
});