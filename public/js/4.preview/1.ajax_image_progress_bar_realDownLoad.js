
var resultObj = null;


var previewBtn = document.getElementById('previewBtn');

var processBarId = 'progressId';
var resultSpanId = 'resultSpan';
previewBtn.onclick = function(){
    console.log('预览图片');
    preview(processBarId, resultSpanId);
};

function preview(processBarId, resultSpanId) {

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
            // console.log(typeof myblobData);
            // console.log('是 Blob 类型吗：', myblobData instanceof Blob);
            // console.log('myblobData.size', myblobData.size);
            resultSpan.innerHTML = '下载成功';

            var type = xhr.getResponseHeader('content-type');
            resultObj = {
                data : myblobData,
                type : type
            };
            var myUrl = createLocalUrl(resultObj);

            document.getElementById('imgId').src = myUrl;
            document.getElementById('imgId').style.display = 'block';
        }else {
            console.log('下载出错');
            resultSpan.innerHTML = '下载失败';
        }
    };

    xhr.responseType = 'blob';  //设置请求返回数据的类型，为二进制类型数据
    xhr.open('get', '/download_img', true);

    xhr.send();
}


function createLocalUrl(options) {
    var data = options.data;
    var type = options.type;
    var myBlob = new Blob([data], {type: type, endings: 'native' });
    var myUrl = URL.createObjectURL(myBlob);
    return myUrl;
}

function realDownload(localUrl, fileName, divId) {

    //创建 a 标签
    var link = document.createElement('a'); //创建事件对象
    link.setAttribute('href', localUrl);
    link.setAttribute('download', fileName); //此处 访问的目的是下载文件

    //把标签添加到 dom 树里
    var myDIV = document.getElementById(divId);
    myDIV.appendChild(link);

    //模拟鼠标点击
    link.click();
}

document.getElementById('downloadBtn').onclick = function () {
    console.log('下载图片');
    if(resultObj){
        var myUrl = createLocalUrl(resultObj);
        var fileName = 'sun';
        var divId = 'resultDiv';
        realDownload(myUrl, fileName, divId);
    }else {
        alert('请先点击预览图片');
    }
};

