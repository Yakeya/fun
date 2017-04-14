


var submit = document.getElementById('submitButton');

var processBarId = 'progressId';
var resultSpanId = 'resultSpan';
submit.onclick = function(){
    console.log('准备下载');
    download(processBarId, resultSpanId);
};


function download(processBarId, resultSpanId) {

    var progressBar = document.getElementById(processBarId);
    var resultSpan = document.getElementById(resultSpanId);

    var xhr = new XMLHttpRequest();

    // 50ms左右 检查一次
    xhr.onprogress = function (event) {
        // event.lengthComputable   Boolean类型     进度信息是否可用
        if (event.lengthComputable) {
            var loaded = event.loaded;      // event.loaded     number类型    已经下载的字节数
            var total = event.total;        // event.total      number类型    总共需要下载的字节数
            var rate = Math.floor( 100 * loaded / total );      // 已经下载的百分比
            rate = rate + '%';
            console.log('下载进度', rate);

            //设置 progressBar
            progressBar.max = total;
            progressBar.value = loaded;
        }
    };


    //注册回调函数
    //当下载结束的时候 调用
    xhr.onload = function (event) {
        if (xhr.status === 200 || xhr.status === 304) {

            console.log('下载成功');
            var myblobData = xhr.response;  //拿到服务器返回的数据
            resultSpan.innerHTML = '下载成功';

        }else {
            console.log('下载出错');
            resultSpan.innerHTML = '下载失败';
        }
    };

    xhr.responseType = 'blob';  //设置请求返回数据的类型，为二进制类型数据
    xhr.open('get', '/download', true);

    xhr.send();
}







































