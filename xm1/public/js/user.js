$(function () {
    // 3 获取用户详情
    // 请求地址：/admin/user / detail
    // 请求方式：get

    // 用户信息的默认展示
    $.ajax({
        url: itcast.user_detail,
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                $('#inputEmail1').val(res.data.username)
                $('#inputEmail2').val(res.data.nickname)
                $('#inputEmail3').val(res.data.email)
                $(".user_pic").attr('src', res.data.userPic)
                $('#inputEmail4').val(res.data.password)
            }
        }
    })

    // 实现图片的预览 一选择文件就进行预览
    $('#exampleInputFile').on('change', function () {
        // 预览本地图片使用URL.createObjectURL
        // 这个方法可以根据指定的文件对象生成一个托管在服务器中资源路径
        // 固定写法
        let file = $(this)[0].files[0]
        let myurl = URL.createObjectURL(file)
        $('.user_pic').attr('src', myurl)
    })


    // 实现用户的编辑
    // 4、编辑用户信息
    // 请求地址：/admin/user / edit
    // 请求方式：post

    $('.btn-edit').on('click', function () {
        console.log('aa');
        // 手机表单数据
        let formdata = new FormData($('#form')[0])
        console.log(formdata);

        $.ajax({
            type: 'post',
            url: itcast.user_edit,
            data: formdata,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.code == 200) {
                    alert(res.msg)
                    window.parent.location.reload()
                }
            }
        })
    })
})