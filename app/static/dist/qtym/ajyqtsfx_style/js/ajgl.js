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

        //ִ��һ��laydateʵ��
        laydate.render({
            elem: '#test1', //ָ��Ԫ��
            type: 'year'
        });
    })
})

/*�鿴����*/
function ckxq() {

    layer.open({
        type: 2,
        title: '�鿴����',
        maxmin: false,
        shadeClose: true, //������ֹرղ�
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


/*�༭*/
function member_edit(id) {
    layer.open({
        type: 2,
        title: '�༭��Ϣ',
        maxmin: false,
        shadeClose: true, //������ֹرղ�
        shade: 0.4,
        scrollbar: false,
        area: ['30%', '66%'],
        content: 'bj.html',
    });
}


/*���*/
function member_stop(obj, id) {
    layer.confirm('ȷ��Ҫȡ�������', function (index) {
        $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius" onClick="member_start(this,id)" href="javascript:;" title="���">���</span>');
        $(obj).remove();
        layer.msg('��ֹͣ���!', {
            icon: 5,
            time: 1000
        });
    });
}

/*ȡ�����*/
function member_start(obj, id) {
    layer.confirm('ȷ��Ҫ���ü����', function (index) {

        $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius" onClick="member_stop(this,id)" href="javascript:;" title="���">���</span>');

        $(obj).remove();
        layer.msg('�Ѽ��!', {
            icon: 6,
            time: 1000
        });
    });
}
