app.component('fieldUpload', {
        bindings: {
            label:'=',
            model:'=',
            multiple:'='

        },
        controller: function ($scope) {

            var self = this;
            self.readBase64=function (arr,callback,onProgress,results,index) {
                index = !index?0:index;
                if(arr[index])
                {
                    results = !results?[]:results;

                    var file = arr[index];
                    var reader = new FileReader();
                    reader.onloadend=function (e) {

                        results.push({file:file,name:file.name,base64:e.target.result});
                        if(index + 1 == arr.length)
                        {
                            return callback(results);
                        }
                        else
                        {
                            index++;
                            self.readBase64(arr,callback,onProgress,results,index);
                        }

                    };
                    if(onProgress)
                    {
                        reader.onprogress=function (e) {
                            onProgress(e);
                        }
                    }
                    reader.readAsDataURL(file)

                }
                else
                {
                    callback([]);
                }
            }

            self.previews = [];

            self.previewsChanged=function () {
                console.log("Previews changed!");
                self.model = [];

                if(self.previews)
                {
                    for(var k in self.previews)
                    {
                        var file = self.previews[k].file;
                        var p  =self.previews[k];
                        delete p.file;
                        p.file = file;
                        if(self.multiple)
                        {
                            self.model.push(p);
                        }
                        else{
                            self.model= p;
                        }



                    }
                }
            }
            self.deletePreview=function (k) {
                self.previews.splice(k,1);
                self.previewsChanged();
            }


                var fileInput = document.createElement("input");
            fileInput.type="file";
            fileInput.addEventListener("change",function () {

                console.log(fileInput.files);
                self.readBase64(fileInput.files,function (results) {


                    for(var i=0;i<results.length;i++)
                    {
                        self.previews.push(results[i]);
                    }


                    self.previewsChanged();
                    $scope.$apply();


                },function (e) {
                    //(Math.ceil((e.loaded* 100) / e.total));
                })


            });

            self.$onInit=function () {
               fileInput.multiple = self.multiple?true:false;

            };

            self.loadFile=function () {

                fileInput.value = "";
                fileInput.click();


            }

        },
    templateUrl:"components/field-upload/view.html"
    });