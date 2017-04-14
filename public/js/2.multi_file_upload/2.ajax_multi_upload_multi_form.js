


var submit = document.getElementById('submitButton');

submit.onclick = function(){
    console.log('准备上传');
    upload('myForm1', 'progressId1');
    upload('myForm2', 'progressId2');
    upload('myForm3', 'progressId3');
};


function upload( formID,  progressId) {
    var xhr = new XMLHttpRequest();
    var myForm = document.getElementById(formID);
    var progressBar = document.getElementById(progressId);
    var formData = new FormData(myForm);

    xhr.onload = function (event) {
        console.log('收到服务器的响应', xhr.responseText);
    };

    xhr.upload.onload = function (event) {
        console.log('数据上传完成');
    };
    xhr.upload.onprogress = function (event) {
        // event.lengthComputable   Boolean类型     进度信息是否可用
        if (event.lengthComputable) {
            var loaded = event.loaded;      // event.loaded     number类型    已经下载的字节数
            var total = event.total;        // event.total      number类型    总共需要下载的字节数
            var rate = Math.floor( 100 * loaded / total );      // 已经下载的百分比
            rate = rate + '%';
            console.log(progressId, rate);

            //设置 progressBar
            progressBar.max = total;
            progressBar.value = loaded;
        }
    };


    xhr.open('post', '/multi_upload_ajax', true);

    xhr.send(formData);
}










































