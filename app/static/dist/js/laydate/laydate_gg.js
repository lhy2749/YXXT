/**
 
 @Name : layDate日期控件 通用方法
 @Author: zgf
 @Date: 2019-06-15
 
 */
$(function () {
	laydate({
		elem : '#start',
		event : 'focus'
	});
	laydate({
		elem : '#end',
		event : 'focus'
	});

	!function() {
		laydate.skin('molv'); //切换皮肤，请查看skins下面皮肤库
		laydate({
			elem : '#demo'
		}); //绑定元素
	}();
})