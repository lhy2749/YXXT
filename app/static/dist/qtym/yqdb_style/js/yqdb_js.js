//督办分配
function dbb(sjbh){
	layer.open({
		
		type: 2,
		title: '督办',
		maxmin: false,
		shadeClose: true, //点击遮罩关闭层
		shade: 0.4,
		shift:-1,
		scrollbar: true,
		area: ['80%', '90%'],
		content: 'dbxx?sjbh='+sjbh,
		zIndex: layer.zIndex,		
	});
	//督办单号
	
}

$(function(){
	function getNow(s) {
		return s < 10 ? '0' + s: s;
		}

		var myDate = new Date();             

		var year=myDate.getFullYear();        //获取当前年
		var month=myDate.getMonth()+1;   //获取当前月
		var date=myDate.getDate();            //获取当前日


		var h=myDate.getHours();              //获取当前小时数(0-23)
		var m=myDate.getMinutes();          //获取当前分钟数(0-59)
		var s=myDate.getSeconds();
		
		var dbbh =  year+getNow(month)+getNow(date)+getNow(h)+getNow(m)+getNow(s);
		
	$(".dbfq_dbbh").attr("value",dbbh);
});


//承办回复
function cb_huifu(dbbh){
	layer.open({		
		type: 2,
		title: '承办',
		maxmin: false,
		shadeClose: true, //点击遮罩关闭层
		shade: 0.4,
		scrollbar: true,
		area: ['80%', '90%'],
		content: 'cbxx?dbbh='+dbbh,
		zIndex: layer.zIndex,		
	})
}

//督办查看
function db_chakan(dbbh){
	layer.open({		
		type: 2,
		title: '督办查看',
		maxmin: false,
		shadeClose: true, //点击遮罩关闭层
		shade: 0.4,
		scrollbar: true,
		area: ['80%', '90%'],
		content: 'dbck?dbbh='+dbbh,
		zIndex: layer.zIndex,		
	}
	);
	console.log(dbbh);
}


//灰接收按钮
$(function(){
	
	var ztmc = $('.ztmc');
	var i=0;
	for(i=0;i<ztmc.length;i++){
		if($(ztmc.get(i)).text()=="执行中" || $(ztmc.get(i)).text()=="督办信息已反馈"|| $(ztmc.get(i)).text()=="已完成")
		{			
		$(ztmc.get(i)).next().next().next().children().attr({ disabled: "disabled" ,style:"background-color:#505050"});	
		}
	}

});

//灰督办事项接收按钮
$(function(){
	
	var ztmc = $('.dbsx_ztmc');
	var i=0;
	for(i=0;i<ztmc.length;i++){
		if($(ztmc.get(i)).text()=="执行中" || $(ztmc.get(i)).text()=="新建督办" || $(ztmc.get(i)).text()=="已完成")
		{			
		$(ztmc.get(i)).next().next().next().next().children().attr({ disabled: "disabled" ,style:"background-color:#505050"});	
		}
	
		
		
	}

});

//灰回复按钮
$(function(){
	
	var ztmc = $('.clztmc');
	var i=0;
	for(i=0;i<ztmc.length;i++){
		if($(ztmc.get(i)).text()=="督办信息已反馈")
		{
			
		$(ztmc.get(i)).next().next().next().children().attr({ disabled: "disabled" ,style:"background-color:#505050"});	
		}
			
	}
});




//关框
function custom_close(){
	var index = parent.layer.getFrameIndex(window.name); 
	parent.layer.close(index);
	}


function doSubmitForm1(){
			
	layer.confirm('是否确提交回复信息？',{offset: '200px'}, function(index) {		
	var params= $("form").serialize();
		$.ajax({
			type : "post",
			url : "cbxxhf.action",
			dataType : 'json',
			data : params,
			 
			success: function(data, textStatus) {
				if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {


					window.parent.location.reload();
					var index = parent.layer.getFrameIndex(window.name); 
					parent.layer.close(index);

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
	layer.close(index);
});
	
	
	
}

function doSubmitForm(){

	if($(".db_dbjb").val()==3){
		layer.msg('请填写督办级别',{
			icon : 2,
			time : 2000,
			anim: 6		
		});
		return false;
	}

	if(($(".dbfq_dbbh").val()).trim()==""){
		layer.msg('请填写督办编号',{
			icon : 2,
			time : 2000,
			anim: 6
			
		});
		return false;
	}
	
	if(($(".db_wcqx").val()).trim()==""){
		
		layer.msg('请填写完成期限',{
			icon : 2,
			time : 2000,
			anim: 6
			
		});
		return false;
	}
	
	layer.confirm('是否确提交督办信息？',{offset: '200px',icon: 1},function() {
	var params= $("form").serialize();
	console.log(params);
		$.ajax({
			type : "post",
			url : "dbxxfq.action",
			dataType : 'json',
			data : params,
			 
			success: function(data, textStatus) {
				if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
					/*
					$(obj).parent().parent().find('.ztmc').text(str);
					$(obj).attr({ disabled: "disabled" ,style:"background-color:#505050"});*/
					var index = parent.layer.getFrameIndex(window.name); 
					parent.layer.close(index);

				} else {
					layer.msg('设置失败，请联系管理员!', {
						icon : 5,
						time : 2000
					});
				}
			},
			error : function() {
				layer.msg('请求数据失败，请联系管理员!', {
					icon : 5,
					time : 2000
				});
			}
		});
	
});
	}


//承办接收
function cb_jieshou(obj,ztmc,dbbh){
	
	if(ztmc != '新建督办'){		
			$(obj).attr({ disabled: "disabled" ,style:"background-color:#505050"});
		layer.msg('已接受督办!', {
			icon : 1,
			time : 2000
		});
		return false;
		
	}
	layer.confirm('是否确认接受督办信息？', function() {
		$.ajax({
			type : "post",
			url : "updatecbsxzt.action",
			dataType : 'json',
			data : {
				'dbbh' :dbbh,
			},
			success: function(data, textStatus) {
				if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
					
					layer.msg('接受督办成功!', {
						icon : 1,
						time : 2000
					});
					var str = "执行中";
					$(obj).parent().parent().find('.ztmc').text(str);
					$(obj).attr({ disabled: "disabled" ,style:"background-color:#505050"});
				} else {
					layer.msg('设置失败，请联系管理员!', {
						icon : 2,
						time : 2000
					});
				}
			},
			error : function() {
				layer.msg('请求数据失败，请联系管理员!', {
					icon : 2,
					time : 2000
				});
			}
		});

	});
	}


//督办接收
function db_jieshou(obj,dbbh){
	
	layer.confirm('是否确认接受督办信息？',{offset: '200px'},function() {
		$.ajax({
			type : "post",
			url : "dbxxjs.action",
			dataType : 'json',
			data : {
				'dbbh' :dbbh,
			},
			success: function(data, textStatus) {
				if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
					
					layer.msg('接受督办成功!', {
						icon : 1,
						time : 2000
					});
					var str = "已完成";
					$(obj).parent().parent().find('.dbsx_ztmc').text(str);
					$(obj).attr({ disabled: "disabled" ,style:"background-color:#505050"});
				} else {
					layer.msg('设置失败，请联系管理员!', {
						icon : 2,
						time : 2000
					});
				}
			},
			error : function() {
				layer.msg('请求数据失败，请联系管理员!', {
					icon : 2,
					time : 2000
				});
			}
		});

	});
	}


function queren(sjbh){

	layer.open({
		
		
		type: 1,
		title: '督办',
		maxmin: false,
		shadeClose: true, //点击遮罩关闭层
		shade: 0.4,
		scrollbar: true,
		content: 'dbxx?sjbh='+sjbh,
		zIndex: layer.zIndex,

		
	})
	}

