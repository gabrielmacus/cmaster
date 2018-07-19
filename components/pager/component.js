app.component('pager', {
    bindings: {

        pagination:'<',
        pagerOffset:'<',
       changePage:'<'

    },
    controller: function () {

        var self = this;

        self.goToPage=function (number) {

            self.changePage(number);
        }

        self.$onChanges = function (changes) {

            if (changes.pagination && changes.pagination.currentValue) {



                var currentPage = self.pagination.offset;
                var pagerStart =  currentPage - self.pagerOffset;
                var pagerEnd = currentPage + self.pagerOffset;
                this.pagerArray = [];


                for(var i=pagerStart;i<=pagerEnd;i++)
                {
                    if(i>-1)
                    {
                        var number = i+1;
                        if(number <= self.pagination.pages)
                        {
                            var page = {number:number};
                            if(page.number == (currentPage+1))
                            {
                                page.active=true;
                            }
                            console.log(page);
                            this.pagerArray.push(page);
                        }


                    }

                }



            }
        };

    },
    templateUrl:"components/pager/view.html"
});