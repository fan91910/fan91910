$(function () {
    // 文章列表分类数据
    // 5、所有文章类别
    // 请求地址：/admin/category/list
    // 请求方式：get

    // 封装查询所有页面数据 因为后面新增了还需要调用
    function init() {
        $.ajax({
            url: itcast.category_list,
            dataType: 'json',
            success: function (res) {
                console.log(res);
                $('tbody').html(template('cateTemp', res))
            }
        })

    }


    // 调用第一次查询默认数据
    init()

    //6、新增文章类别
    // 请求地址：/admin/category/add
    // 请求方式：post
    $('.btnopt').on('click', function () {
        console.log('aa');
        // 获取表单名为name数据
        let obj = $('form').serialize()
        console.log(obj);
        if ($(this).text() == "编辑") {
            opt(itcast.category_edit, $('form').serialize() + '&id=' + id)
        } else if ($(this).text() == "新增") {
            opt(itcast.category_add, $('form').serialize())
        }
    })

    // 封装
    function opt(url, data) {
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            success: function (res) {
                if (res.code == 201) {
                    // catedata = res.data
                    alert('添加成功')
                }

                if (res.code == 200 || res.code == 201) {
                    alert(res.msg)
                    $("#myModal").modal('hide')
                    // 重新调用 加载新增的
                    init()
                }

            }
        })
    }

    // 弹出新增的模态框
    $('#xinzengfenlei').on('click', function () {
        // 修改模态框的信息
        $('.modal-title').text('新增分类')
        $('.btnopt').text('新增')

        // 弹出模态框
        $('#myModal').modal('show')
        // 重置之前可能有的数据
        $('#name').val('')
        $('#slug').val('')
    })

    // 编辑操作时数据的展示
    $('tbody').on('click', '.btnedit', function () {
        // 获取自定义属性的数据
        let obj = $(this).data()
        console.log(obj);
        // 修改模态框的信息
        $('.modal-title').text('编辑分类')
        $('.btnopt').text('编辑')

        // 弹出模态框
        $('#myModal').modal('show')
        id = obj.id
        // 为dom元素赋值
        $('#name').val(obj.name)
        $('#slug').val(obj.slug)
    })


    // 9、删除文章类别
    // 请求地址：/admin/category / delete
    //     请求方式：post

    // 事件委托 动态生成的元素 需要找到他的父元素进行事件委托
    //  $('tbody')实际存在的  
    $('tbody').on('click', '.btndel', function () {
        let id = $(this).data().id
        console.log(id);
        $.ajax({
            type: 'post',
            url: itcast.category_delete,
            data: { id },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.code == 204) {
                    alert(res.msg)
                    init()
                }
            }
        })
    })
})