$(function () {
    // 获取所有的文章数据额 实现文章数据的渲染
    // 请求地址：/admin/article/query
    // 请求方式：get


    // 搞一个全局的页码 因为局部他不能在下面使用
    let page = 1, perpage = 6
    // 封装
    function init() {
        $.ajax({
            url: itcast.article_query,
            data: {
                page: page, // 当前页码
                perpage: perpage, // 每页展示的数量
                type: $('#selCategory').val(), // 文章的分类，如果为''则查询所有分类的文章数据  拿到  点击的 其中 所有分类res.data[i].id 的值
                state: $('#selStatus').val() // 文章的状态，如果为''则查询所有状态的文章数据    拿到  点击的 其中 所有状态res.data[i].name 的值
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                if (res.code == 200) {
                    // 渲染列表数据
                    $('tbody').html(template('articleListTemp', res.data));
                    // 渲染分页结构  进行判断 如果没有查询到你要的数据 就只生产一个页码 不会出现多余的
                    // setPage(res.data.totalPage)
                    if (res.data.data.length == 0) {
                        setPage(1)
                    } else {
                        setPage(res.data.totalPage)
                    }
                }
            }
        })
    }
    //  这个调用是页面加载,默认渲染的数据 页面数据那些 文章列表
    init();

    // 实现分页功能  
    // pageSum  总页数
    // setPage 页码要展示数量   总页数/每页展示几条 
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
                console.log(cpage);
                // 当前点击的页码数量传值给全局的页码数量 
                page = cpage
                // 然后重新发起请求 进行渲染
                init()
            }
        })
    }

    // 分类数据的动态渲染
    // 5、所有文章类别
    // 请求地址：/admin/category/list
    // 请求方式：get
    $.ajax({
        url: itcast.category_list,
        dataType: 'json',
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                let str = `<option value="">所有分类</option>`

                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
                }
                $('#selCategory').html(str)
            }
        }
    })
    // 实现数据筛选 点击事件
    $('#btnSearch').on('click', function (e) {
        // console.log($('#selCategory').val());
        e.preventDefault()
        // 每次筛选应该从第一页最开始的页面开始 筛选
        page = 1
        init()
    })

    // 文章删除
    // 14、删除文章
    // 请求地址：/admin/article/delete
    // 请求方式：post
    $('tbody').on('click', '.delete', function () {
        let _this = this

        // 获取id
        // data():在jq中通过data()获取指定元素中所有自定义属性 以对象方式存储
        console.log($(this).data());
        let id = $(this).data().id
        // console.log(id);
        if (confirm('请问是否删除?')) {
            $.ajax({
                type: "post",
                url: itcast.article_delete,
                data: { id },
                dataType: 'json',
                success: function (res) {
                    // console.log(res);
                    if (res.code == 204) {
                        init()
                    }
                }
            })
        }
    })

})
