$(function () {
    $('#inputCover').on('change', function () {
        // 1.获取当前所选择文件对象
        let myfile = $('#inputCover')[0].files[0]
        // console.log(myfile);
        // // 2.通过URL的createObjectUrl获取托管在服务器端的资源路径
        let myurl = window.URL.createObjectURL(myfile)
        // console.log(myurl);
        // // 3.将url赋值给img的src属性
        $('.article_cover').attr('src', myurl)
    })

    function publishArticle(state) {
        // 接口文档要formdata
        // formData:可以收集指定表单中拥有name属性的表单元素的value值，并生成formdata对象
        let formdata = new FormData($('#form')[0])
        // 将富文本框的内容添加到formdata
        // append:可以追加参数到formdata
        // 追加一个content属性 后面是值 到表单数据里面 
        formdata.append('content', tinymce.activeEditor.getContent())

        // 添加文章的状态
        formdata.append('state', state)
        console.log(...formdata)

        //  发布文章
        // 请求地址：/admin/article/publish
        // 请求方式：post

        $.ajax({
            type: 'post',
            url: itcast.article_publish,
            data: formdata,
            dataType: 'json',
            processData: false, // formdata有自己的数据处理方式，不需要ajax处理
            contentType: false, // formdata有自己的编码格式，不需要ajax来设置
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    alert(res.msg)
                    location.href = './article_list.html'
                }
            }
        })
    }
    // 发布文章
    $('.btn-release').on('click', function () {
        publishArticle('已发布')
    })
    // 存为草稿
    $('.btn-draft').on('click', function () {
        publishArticle('已发布')
    })




})
