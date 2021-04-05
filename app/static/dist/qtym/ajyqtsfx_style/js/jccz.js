 /*添加监测词组*/
 function ckxq() {

     layer.open({
         type: 2,
         title: '添加监测词组',
         maxmin: true,
         shadeClose: true, //点击遮罩关闭层
         shade: 0.4,
         scrollbar: true,
         area: ['30%', '80%'],
         content: 'tjjccz/tjjccz.html',
         move: true,
         moveType: 0,
         moveOut: true,
         zIndex: layer.zIndex,
     });
 }


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
     });


 })

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

 /*用户-启用*/
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
