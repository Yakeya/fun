


var submit = document.getElementById('submitButton');

submit.onclick = function(){
    console.log('准备下载');
    download();
};


function download() {

    var xhr = new XMLHttpRequest();

    //注册回调函数
    //当下载结束的时候 调用
    xhr.onload = function (event) {
        if (this.status == 200) {
            console.log('下载成功');
            var myblobData = xhr.response;  //拿到服务器返回的数据
            console.log(typeof myblobData);
            console.log('是 Blob 类型吗：', myblobData instanceof Blob);
            console.log('myblobData.size', myblobData.size);
        }else {
            console.log('非 200');
        }
    };

    xhr.responseType = 'blob';  //设置请求返回数据的类型，为二进制类型数据
    xhr.open('get', '/download', true);

    xhr.send();
}










































