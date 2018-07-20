app.component('gridItem', {

    bindings:
        {
            item:'<',
            properties:'<'
        },
    transclude:true,
    templateUrl:"components/grid-item/view.html"
    });