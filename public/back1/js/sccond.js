

$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            datatype: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('secondTpl', info);
                $('tbody').html(htmlStr);

                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }

    // 点击添加分类/
    $('#addcate').click(function () {
        $('#secondModal').modal('show');

        // 获取下拉菜单一级分类ul
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 1000
            },
            datatype: 'json',
            success: function (info) {
                // console.log(info);v
                var htmlStr = template('ulTpl', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    // 表单验证
    $('#form').bootstrapValidator({
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: "二级分类名称不能为空"
                    }
                }
            }
        }
    })
    
    // 图片预览
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            var src = data.result.picAddr;
            $('#imgbox img').attr('src',src);
        }
    });
    
    // 下拉菜单选择功能
    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        $('.adddropdown').text(txt);
    })
})