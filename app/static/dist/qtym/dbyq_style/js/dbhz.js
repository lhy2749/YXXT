//弹窗 
function db() {

    layer.open({
        type: 2,
        title: '督办',
        maxmin: false,
        shadeClose: true, //点击遮罩关闭层
        shade: 0.4,
        scrollbar: true,
        area: ['80%', '90%'],
        content: 'db.html',
        zIndex: layer.zIndex,
    });
}
//日期
$(function () {

    laydate({
        elem: '#start',
        event: 'focus'
    });
    laydate({
        elem: '#end',
        event: 'focus'
    })

})
