
$(function () {

    //创建 form 表单
    var createUploadForm = function (id, fileElementId) {
        var formId = 'uploadForm' + id;
        var fileId = 'uploadFile' + id;
        var $form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');

        var $oldElement = $('#' + fileElementId);
        var $newElement = $($oldElement).clone();
        $($oldElement).attr('id', fileId);
        $($oldElement).before($newElement);
        $($oldElement).appendTo($form);
        $form.css('position', 'absolute');
        $form.css('top', '-1200px');
        $form.css('left', '-1200px');
        $form.appendTo('body');
        return $form;
    };

    //创建 iframe
    var createUploadIframe = function (id) {
        var frameId = 'uploadFrame' + id;
        var $iframe = $('<iframe id="' + frameId + '" name="' + frameId + '">');
        $iframe.css('position', 'absolute');
        $iframe.css('top', '-2000px');
        $iframe.css('left', '-2000px');
        $iframe.appendTo(document.body);
        return $iframe;
    };


    var actionURL = "/iframe_file";
    $('#uploadInput').change(function () {
        //动态创建表单 和 动态创建iframe
        var id = new Date().getTime() ;
        var frameId = 'uploadFrame' + id;
        var formId = 'uploadForm' + id;
        var $form = createUploadForm(id, "uploadInput");
        var $iframe = createUploadIframe(id);

        //动态提交表单
        var form = $('#' + formId);
        $(form).attr('action', actionURL);
        $(form).attr('method', 'POST');
        $(form).attr('target', frameId);
        $(form).attr('enctype', 'multipart/form-data');
        $(form).submit();
    });

});






















