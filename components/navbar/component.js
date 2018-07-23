app.component('navbar', {
        bindings: {
            links:'<',
            type:'@'

        },
        controller: function ($state) {
            var self = this;
            self.isActive=function (link) {

                 return $state.current.name == link.active.state  && $state.params.module == link.active.module;

            };
            self.toggleNavbar=function () {
                document.body.classList.toggle("sidebar-toggle");
            }



        },
    transclude:true,
    templateUrl:"components/navbar/view.html"
    });