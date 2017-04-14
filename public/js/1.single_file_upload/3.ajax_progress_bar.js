
var progressBar = document.getElementById('progressId');

var submit = document.getElementById('submit');

//点击提交按钮
submit.onclick = function(){
    console.log('提交按钮被点击');

    //创建 xhr 对象
    var xhr = new XMLHttpRequest();

    //创建 form 对象
    var myForm = document.getElementById('myForm');
    var formData = new FormData(myForm);

    // 上传结束
    xhr.upload.onload = function (event) {
        console.log('onload' , '事件');
        console.log('上传完成');
    };

    // 上传进度
    xhr.upload.onprogress = function (event) {
        // event.lengthComputable   Boolean类型     进度信息是否可用
        if (event.lengthComputable) {
            var loaded = event.loaded;      // event.loaded     number类型    已经下载的字节数
            var total = event.total;        // event.total      number类型    总共需要下载的字节数
            var rate = Math.floor(loaded / total);      // 已经下载的百分比
            rate = rate + '%';
            console.log('上传进度', rate, '\txhr.readyState', xhr.readyState);

            //设置 progressBar
            progressBar.max = total;
            progressBar.value = loaded;
        }
    };

    xhr.open('post', '/upload', true);

    xhr.send(formData);

};




















