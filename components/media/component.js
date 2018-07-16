app.component('media', {
        bindings: {
            src:'=',
            caption:'='

        },
        controller: function () {

            this.detectMediaType=function(src) {
                var ext ='';
                var regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                if(src.match(regex)){
                    ext = 'youtube';
                }
                else
                {
                    src = src.split(".");
                    ext = src[src.length-1];
                }




                switch (ext.toLowerCase())
                {
                    case 'jpg':
                    case 'bmp':
                    case 'jpeg':
                    case 'gif':
                    case 'png':
                    case 'svg':
                        return 'image';
                        break;
                    case 'youtube':
                        return 'iframe';
                        break;
                    default:
                        return 'binary';
                        break;
                }

            }


        },
    templateUrl:"components/media/view.html"
    });