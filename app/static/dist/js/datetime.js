layui.use('laydate', function() {
	var laydate = layui.laydate;

	//常规用法
	laydate.render({
		elem: '#start'
	});

	laydate.render({
		elem: '#end'
	});
});


// 如果只有一个时间 a=1,有两个时间就 a=2
// 如果需要分页 b=1，如果不需要 b=0
//onclick="javascript:return mymethon();" 
function mymethon(a,b) {
    var input_start = $('#start').val();
    var d1 = new Date(Date.parse(input_start.replace(/-/g, "/")));
    var NowDate = new Date();
    if (a==1){
        if (d1>NowDate){
            showmsg('开始时间不得大于当前时间');
            return false;
        }else {
            if (b==1){
                doGetPage(1);
                return true;
            }else {
            //    do something
            }
        }
    }
    if (a==2){
        var input_end = $('#end').val();
        var d2 = new Date(Date.parse(input_end.replace(/-/g, "/")));
        if (d1 > d2 || d1 > NowDate || d2 > NowDate) {
            showmsg('时间不得大于当前时间');
            return false;
        } else {
            if (b==1){
                doGetPage(1);
                return true;
            }else {
                //    do something
            }
        }
    }
}

function showmsg(str){
    layer.msg(str, {
        icon: 61,
        time: 1500,
        anim: 6,
        offset: ['80px', '550px']
    });
}


function doGetPage(currentpage) {
	document.getElementById("currentpage").value = currentpage;
	document.forms[0].submit();	
}