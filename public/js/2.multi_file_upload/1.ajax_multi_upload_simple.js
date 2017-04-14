

var myForm = document.getElementById('myForm');
var submit = document.getElementById('submitButton');

submit.onclick = function(){
    var xhr = new XMLHttpRequest();
    var formData = new FormData(myForm);

    xhr.upload.onload = function (event) {
        console.log('xhr.upload.onload', xhr.responseText);
    };
    xhr.onload = function (event) {
        console.log('xhr.onload', xhr.responseText);
    };


    xhr.open('post', '/multi_upload_ajax', true);

    xhr.send(formData);

};












































