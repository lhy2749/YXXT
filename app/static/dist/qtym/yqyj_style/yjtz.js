
function yjqr(yqbh,yhbh){
		layer.confirm('是否确定发送邮件？',{offset: '200px',icon: 1},function() {
            layer.close(layer.index);
            layer.msg('正在发送，请稍等！', {
				icon : 1,
				time : 1500
			});
			$.ajax({
				type : "post",
				url : "fsyjAction",
				dataType : 'json',
				data : {yqbh : yqbh,yhbh:yhbh } ,
				 
				success: function(data, textStatus) {
					if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
						
						var index = parent.layer.getFrameIndex(window.name); 
						/* parent.layer.close(index); */
						layer.msg('邮件发送成功！', {
							icon : 1,
							time : 2000
						});
					} else {
						layer.msg('邮件发送失败，请重新发送!', {
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

function xxqr(yqbh,yhbh1){
		layer.confirm('是否确定发送信息？',{offset: '200px',icon: 1},function() {
			$.ajax({
				type : "post",
				url : "fsxxAction",
				dataType : 'json',
				data : {yqbh : yqbh,yhbh1 : yhbh1} ,
				 
				success: function(data, textStatus) {
					if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
						
						var index = parent.layer.getFrameIndex(window.name); 
						/* parent.layer.close(index); */
						layer.msg('短信发送成功！', {
							icon : 1,
							time : 2000
						});
					} else {
						layer.msg('短信发送失败，请重新发送!', {
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

function xxqr1(yqbh,rybh){
		layer.confirm('是否确定发送信息？',{offset: '200px',icon: 1},function() {
			$.ajax({
				type : "post",
				url : "fsxxAction1",
				dataType : 'json',
				data : {yqbh : yqbh,rybh : rybh} ,
				 
				success: function(data, textStatus) {
					if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
						
						var index = parent.layer.getFrameIndex(window.name); 
						/* parent.layer.close(index); */
						layer.msg('短信发送成功！', {
							icon : 1,
							time : 2000
						});
					} else {
						layer.msg('短信发送失败，请重新发送!', {
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

function yjqr1(yqbh,rybh){
		layer.confirm('是否确定发送邮件？',{offset: '200px',icon: 1},function() {
			layer.close(layer.index);
            layer.msg('正在发送，请稍等！', {
				icon : 1,
				time : 1500
			});
			$.ajax({
				type : "post",
				url : "fsyjAction1",
				dataType : 'json',
				data : {yqbh : yqbh,rybh:rybh } ,
				 
				success: function(data, textStatus) {
					if (data.result.replace(/^\s*|\s*$/g, '') == 'success') {
						
						var index = parent.layer.getFrameIndex(window.name); 
						/* parent.layer.close(index); */
						layer.msg('邮件发送成功！', {
							icon : 1,
							time : 2000
						});
					} else {
						layer.msg('邮件发送失败，请重新发送!', {
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