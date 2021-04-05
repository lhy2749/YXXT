
function yjqr_rdsj(sjbh,yhbh){
		layer.confirm('是否确定发送邮件？',{offset: '200px',icon: 1},function() {
			layer.close(layer.index);
            layer.msg('正在发送，请稍等！', {
				icon : 1,
				time : 1500
			});
			$.ajax({
				type : "post",
				url : "fsyjAction_rdsj",
				dataType : 'json',
				data : {yhbh:yhbh,sjbh:sjbh } ,
				 
				success: function(data, textStatus) {
					var msg = data.msg
					if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
						var index = parent.layer.getFrameIndex(window.name); 
						/* parent.layer.close(index); */
						layer.msg(msg, {
							icon : 1,
							time : 2000
						});
					} else {
						layer.msg(msg, {
							icon : 5,
							time : 2000
						});
					}
				},
				error : function() {
					layer.msg('请求提交失败，请联系管理员!', {
						icon : 5,
						time : 2000
					});
				}
			});
		
	});
}

function xxqr_rdsj(sjbh,yhbh){
		layer.confirm('是否确定发送信息？',{offset: '200px',icon: 1},function() {
			$.ajax({
				type : "post",
				url : "fsxxAction_rdsj",
				dataType : 'json',
				data : {sjbh : sjbh,yhbh : yhbh} ,
				 
				success: function(data, textStatus) {
					var msg = data.msg
					if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
						
						var index = parent.layer.getFrameIndex(window.name); 
						/* parent.layer.close(index); */
						layer.msg(msg, {
							icon : 1,
							time : 2000
						});
					} else {
						layer.msg(msg, {
							icon : 5,
							time : 2000
						});
					}
				},
				error : function() {
					layer.msg('请求提交失败，请联系管理员!', {
						icon : 5,
						time : 2000
					});
				}
			});
		
	});
}

function xxqr1_rdsj(sjbh,rybh){
		layer.confirm('是否确定发送信息？',{offset: '200px',icon: 1},function() {
			$.ajax({
				type : "post",
				url : "fsxxAction1_rdsj",
				dataType : 'json',
				data : {sjbh : sjbh,rybh : rybh} ,
				 
				success: function(data, textStatus) {
					var msg = data.msg
					if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
						
						var index = parent.layer.getFrameIndex(window.name); 
						/* parent.layer.close(index); */
						layer.msg(msg, {
							icon : 1,
							time : 2000
						});
					} else {
						layer.msg(msg, {
							icon : 5,
							time : 2000
						});
					}
				},
				error : function() {
					layer.msg('请求提交失败，请联系管理员!', {
						icon : 5,
						time : 2000
					});
				}
			});
		
	});
}

function yjqr1_rdsj(sjbh,rybh){
		layer.confirm('是否确定发送邮件？',{offset: '200px',icon: 1},function() {
			layer.close(layer.index);
            layer.msg('正在发送，请稍等！', {
				icon : 1,
				time : 1500
			});
			$.ajax({
				type : "post",
				url : "fsyjAction1_rdsj",
				dataType : 'json',
				data : {sjbh : sjbh,rybh:rybh } ,
				 
				success: function(data, textStatus) {
					var msg = data.msg
					if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
						
						var index = parent.layer.getFrameIndex(window.name); 
						/* parent.layer.close(index); */
						layer.msg(msg, {
							icon : 1,
							time : 2000
						});
					} else {
						layer.msg(msg, {
							icon : 5,
							time : 2000
						});
					}
				},
				error : function() {
					layer.msg('请求提交失败，请联系管理员!', {
						icon : 5,
						time : 2000
					});
				}
			});
		
	});
}