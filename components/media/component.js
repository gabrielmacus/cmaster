app.component('media', {
        bindings: {
            src:'=',
            caption:'='

        },
        controller: function () {

            this.detectMediaType=function(src) {

                if(src)
                {
                    src = src.split("?")[0];

                    var ext ='';
                    var regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                    if(src.match(regex)){
                        ext = 'youtube';
                    }
                    else
                    {

                        var mime = src.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

                        if(mime && mime.length == 2)
                        {
                            //is base64 encoded
                            ext  = mime[1].split("/");
                            ext= ext[1];

                        }
                        else
                        {

                            src = src.split(".");
                            ext = src[src.length-1];
                        }



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
                        case 'mp3':
                            return 'audio';
                            break;
                        case 'mp4':
                            return 'video';
                            break;
                        default:
                            return 'binary';
                            break;
                    }
                }

                return false;

            }


        },
    templateUrl:"components/media/view.html"
    });