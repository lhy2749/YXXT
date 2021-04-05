

$(function () {
	layui.use(['form', 'layedit', 'laydate', 'layer'], function () {
		var laydate = layui.laydate,
			layer = layui.layer;
		//执行一个laydate实例
		laydate.render({
			elem: '#test1', //指定元素
			type: 'year',
			format:'yyyy年'
		});
	})
})

/*添加案件*/
function tjaj() {
		top.layer.open({
			type: 2,
			title: '添加案件',
			maxmin: false,
			shadeClose: true, //点击遮罩关闭层
			shade: 0.4,
			scrollbar: true,
			area: ['80%', '90%'],
			content: 'Tjaj',
			move: true,
			moveType: 1,
			moveOut: true,
//			zIndex: layer.zIndex,
			end:function(){
				location.reload();
			}
		});
	
} 

/*查看详情*/
function ckxq(ajbh) {

	layer.open({
		type: 2,
		title: '查看详情',
		maxmin: false,
		shadeClose: true, //点击遮罩关闭层
		shade: 0.4,
		scrollbar: true,
		area: ['80%', '90%'],
		content: 'viewAjxx?ajbh='+ajbh,
		move: true,
		moveType: 1,
		moveOut: true,
		zIndex: layer.zIndex,
	});
}


function member_start(obj, ajbh) {
	var jcbz = 1;
	layer.confirm('确认要启用监测吗？', function() {
		$.ajax({
			type : "post",
			url : "updateJcbz.action",
			dataType : 'json',
			data : {
				'jcbz' : jcbz,
				'ajbh' : ajbh
			},
			success : function(data, textStatus) {
				if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
					ajbh = "\"" +ajbh+ "\""; 
					var str = "<span class='layui-btn layui-btn-lg radius' style='font-size:16px;background-color:#5cb85c' onclick='member_stop(this," + ajbh + ")' href='javascript:;' title='停用'>监测</span>";
					$(obj).parents("tr").find(".td-status").html(str);
					$(obj).remove();
					layer.msg('已监测!', {
						icon : 6,
						time : 1000
					});
				} else {
					layer.msg('设置失败，请联系管理员!', {
						icon : 5,
						time : 1000
					});
				}
			},
			error : function() {
				layer.msg('请求数据失败，请联系管理员!', {
					icon : 5,
					time : 1000
				});
			}
		});

	}); 
}

/*取消监测*/
function member_stop(obj, ajbh) {
	var jcbz = 0;

	layer.confirm('确认要取消监测吗？', function() {
		$.ajax({
			type : "post",
			url : "updateJcbz.action",
			dataType : 'json',
			data : {
				'jcbz' : jcbz,
				'ajbh' : ajbh
			},
			success : function(data, textStatus) {
				if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
					ajbh = "\"" +ajbh+ "\""; 
					var str = "<span class= 'layui-btn layui-btn-lg  radius' style='font-size:16px;color:#fff;background-color:#d2d2d2' onclick='member_start(this," + ajbh + ")' href='javascript:;' title='监测'>监测</span>";
					$(obj).parents("tr").find(".td-status").html(str);
					$(obj).remove();
					layer.msg('已停止监测!', {
						icon : 5,
						time : 1000
					});
				} else {
					layer.msg('设置失败，请联系管理员!', {
						icon : 5,
						time : 1000
					});
				}
			},
			error : function() {
				layer.msg('请求数据失败，请联系管理员!', {
					icon : 5,
					time : 1000
				});
			}
		});

	}); 
}

/*dateTable*/
jQuery(function($) {
	var oTable1 = $('#sample-table').dataTable({
		  /*  "aaSorting": [
                [1, "desc"]
            ], */ //默认第几个排序
		"bStateSave": false, //状态保存
		"aoColumnDefs": [{
			"orderable": false,
			"aTargets": [0,8]
		} // 制定列不参与排序
		]
	})
})

function reset1() {
	document.getElementById("province").value = "";
	document.getElementById("city").value = "";
	document.getElementById("area").value = "";
	document.getElementById("ajztdm").value = "";
	document.getElementById("test1").value = "";
	document.getElementById("dsrorah").value = "";  
}