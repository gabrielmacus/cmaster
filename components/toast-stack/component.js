app.component('toastStack', {
    bindings: {
        toasts:'='
    },
    transclude:true,
    controller: function ($scope,$timeout,AuthenticationFactory) {

        var self = this;

        self.goAway=function (k) {

            if(self.toasts[k])
            {
                delete self.toasts[k];
            }

        }

        self.startTimeout=function (item,k) {

            if(item.timeout)
            {
                $timeout(function () {

                    self.goAway(k);


                },item.timeout)
            }


        }


    },
    templateUrl:"components/toast-stack/view.html"
});

app.factory("ToastStack", function($rootScope) {


    return {

        push:function (toast,idx) {
            $rootScope.ToastStack = !$rootScope.ToastStack?{}:$rootScope.ToastStack;
            $rootScope.ToastStack[idx] = toast;
        },
        remove:function (idx) {

            if($rootScope.ToastStack[idx])
            {
                delete $rootScope.ToastStack[idx];
            }
        }



    }
});