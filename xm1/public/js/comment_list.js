$(function () {
    let page = 1, perpage = 6

    function init() {
        // #### 19、文章评论搜索
        // 请求地址：/admin/comment / search
        // 请求方式：get

        $.ajax({
            url: itcast.comment_list,
            data: {
                page, perpage
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    $('tbody').html(template('commentTemp', res.data))

                    // 生成分页结构
                    setPage(res.data.totalPage)
                }
            }
        })
    }

    init()
    // pageSum:总页数
    function setPage(pageSum) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: page,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, cpage) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                // page就是用户当前所单击的页码，我们只需要让ajax根据这个页码重新获取数据就可以
                // 重置全局page
                // 发起ajax请求
                page = cpage
                init()
            }
        })
    }

    // 批准拒绝和删除
    // 批准拒绝和删除
    function commentOpt(id, url) {
        $.ajax({
            type: 'post',
            url: url,
            data: { id },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    alert(res.msg)
                    init()
                }
            }
        })
    }
    // 批准
    // 20、评论审核通过
    // 请求地址：/admin/comment/pass
    // 请求方式：post

    $('tbody').on('click', '.btnaccept', function () {
        let id = $(this).data().id
        console.log(id);
        commentOpt(id, itcast.comment_pass)
    })

    $('tbody').on('click', '.btnreject', function () {
        let id = $(this).data().id
        console.log(id);
        commentOpt(id, itcast.comment_reject)

    })

    $('tbody').on('click', '.btndelete', function () {
        let id = $(this).data().id
        console.log(id);
        if ($('tbody').find('tr').length == 1) {
            if (page > 1) {
                page--
            }
        }
        commentOpt(id, itcast.comment_delete)
    })

})