$(function () {
    $.ajax({
        url: itcast.category_list,
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                let str = ``

                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
                }
                $('.category').html(str)
            }
        }
    })

    // 日期插件的初始化
    //加载日期插件
    jeDate('#testico', {
        trigger: 'click', // 如果操作载体会弹出日期插件，默认为click
        theme: { bgcolor: "#682c9e", pnColor: "#FF6653" }, //绿色主题  theme--主题
        format: "YYYY-MM-DD", // 日期格式
        isinitVal: true, // is init value,是否有初始的时间
    })
    // 富文本框插件的初始化
    tinymce.init({
        selector: '#mytextarea', //容器，可使用css选择器
        language: 'zh_CN', //调用放在langs文件夹内的语言包
        height: '450px',
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste imagetools wordcount",
            "code"
        ], // 指定你 想使用的插件
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code"  // 工具条
    });
})