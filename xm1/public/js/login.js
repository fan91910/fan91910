$(function () {
    // 实现登录
    // 请求地址：/admin/user/login
    // 请求方式：post
    $('.input_sub').on('click', function () {
        // console.log('aaa');
        $.ajax({
            type: 'post',
            url: itcast.user_login,
            data: $('.login_form').serialize(),
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                // 给前面的p标签赋值
                $('.logininfo').text(res.msg)
                // 如果等于200 模态框显示 
                if (res.code == 200) {
                    // 将后台存储的token值保存到本地
                    localStorage.setItem('bignews_token_58', res.token)

                    $('#myModal').modal('show');
                    // show 方法调用之后立即触发该事件  hidden.bs.modal 模态框隐藏后触发的事情  跳转到index 页面 hide以后要干的事情
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        location.href = './index.html'
                    })
                } else {
                    $('#myModal').modal('show')
                }
            }
        })
    })
    $('.btnconfirm').on('click', function () {
        $('#myModal').modal('hide')
    })
})