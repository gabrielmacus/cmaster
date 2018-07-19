app.component('lightbox', {
    transclude:true,
    bindings:
        {
          opened:"="
        },
    templateUrl:"components/lightbox/view.html"
});