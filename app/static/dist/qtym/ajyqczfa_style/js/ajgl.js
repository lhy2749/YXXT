$(function () {
    $(".find_span").click(function () {
        $("#open").show();
        $(this).hide();
        $(".find_span1").show();
        $("#but_close02").hide();
        $("#but_open").hide();

    })
    $(".find_span1").click(function () {
        $("#open").hide();
        $(this).hide();
        $(".find_span").show();
        $("#but_open").show();
        $("#but_close02").show();

    })

})

$(function () {
    layui.use('laydate', function () {
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#test1', //指定元素
            type: 'year'
        });
    })
})

/*查看详情*/
function ckxq() {

    layer.open({
        type: 2,
        title: '查看详情',
        maxmin: false,
        shadeClose: true, //点击遮罩关闭层
        shade: 0.4,
        scrollbar: true,
        area: ['80%', '90%'],
        content: 'xxxx.html',
        move: true,
        moveType: 1,
        moveOut: true,
        zIndex: layer.zIndex,
    });
}


/*编辑*/
function member_edit(id) {
    layer.open({
        type: 2,
        title: '编辑信息',
        maxmin: false,
        shadeClose: true, //点击遮罩关闭层
        shade: 0.4,
        scrollbar: false,
        area: ['30%', '66%'],
        content: 'bj.html',
    });
}


/*监测*/
function member_stop(obj, id) {
    layer.confirm('确认要取消监测吗？', function (index) {
        $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius" onClick="member_start(this,id)" href="javascript:;" title="监测">监测</span>');
        $(obj).remove();
        layer.msg('已停止监测!', {
            icon: 5,
            time: 1000
        });
    });
}

/*取消监测*/
function member_start(obj, id) {
    layer.confirm('确认要启用监测吗？', function (index) {

        $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius" onClick="member_stop(this,id)" href="javascript:;" title="监测">监测</span>');

        $(obj).remove();
        layer.msg('已监测!', {
            icon: 6,
            time: 1000
        });
    });
}
