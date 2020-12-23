$(function () {
    //   获取用户信息
    // 请求地址：/admin/user/info
    // 请求方式：get
    $.ajax({
        url: itcast.user_info,
        dataType: 'json',
        // // 获取token值
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', localStorage.getItem('bignews_token_58'))
        // }, //放到js的全局函数里面了
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                $('.user_info > img').attr('src', res.data.userPic)
                $('.user_info > span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
            }
        }
    })

    // 实现左侧菜单的展开与合并
    $('.level01').on('click', function () {
        // 排他 给每个添加蓝色背景 active样式
        $(this).addClass('active').siblings().removeClass('active')
        // 判断当前被单击的菜单项的下一个兄弟元素是否有level02样式，如果是说明单击了文章管理，那么就要让子项展开
        if ($(this).next().hasClass('level02')) {
            // slideToggle:展开和合并的切换
            $(this).next().slideToggle()
            $('.level01').find('b').toggleClass('rotate0')
        } else {
            // 不管之前菜单项是否展开，都收到
            $('.level02').slideUp()
            // 清除之前子项可能添加的active
            $('.level02>li').removeClass('active')
        }
    })

    // 单击子项，让子项添加active样式 这是第二个菜单项的展开与合并
    $('.level02>li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 右上角退出登录
    $('.logout').on('click', function () {
        // 删除之前存储的token  
        // 然后跳转到登录页
        localStorage.removeItem('token')
        location.href = './login.html'
    })
})