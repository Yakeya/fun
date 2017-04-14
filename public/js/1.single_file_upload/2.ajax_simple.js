
//找到上传按钮
var submit = document.getElementById('submit');

//点击提交按钮
submit.onclick = function(){
    console.log('提交按钮被点击');

    //创建 xhr 对象
    var xhr = new XMLHttpRequest();

    //创建 form 对象
    var myForm = document.getElementById('myForm');
    var formData = new FormData(myForm);

    //这是回调函数
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log('上传成功: ', xhr.responseText);
        }
    };

    //设置参数
    xhr.open('post', '/upload', true);
    //发送数据  注意：使用了FormData就不用设置请求头
    xhr.send(formData);

};




















