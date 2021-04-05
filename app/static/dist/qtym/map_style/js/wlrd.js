$(function () {
    wlrd();
    getThree();
    getOne();
});

function wlrd() {
    $.ajax({
        type: "get",
        async: true,
        url: "wlrdAction",    //请求发送
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            result = $.parseJSON(data.wlrdresult);
            if (result) {
                var tableData = "";
                if (result.length > 9) {
                    result.length = 9;
                }
                for (var i = 0; i < result.length; i++) {
                    tableData += "<tr>";
                    j = i + 1;
                    str = "rdyqckAction?sjbh='" + result[i].serialNum + "'";
                    str2 = "wlrd" + i;
                    tableData += "<td style='text-align: start;padding-left: 10px;'>" + "<a href=\"" + str + "\" target='blank' >" + "<h3 id='" + str2 + "' class='wlrdnum'>" + result[i].sjmc + "</h3>" + "</a>" + "<p class='p_red' style='position: relative;float: left;margin: 10px;'>" + result[i].sum + "条</p>" + "<p style='position: relative;float: right;margin: 10px;'>" + result[i].fymc + "&emsp;" + result[i].cjsj1 + "</p>" + "</td>";
                    tableData += "</tr>";
                }
                $("#wlrd").html(tableData);
                $("#wlrd td").css({"height": "60px",});
            }
            ;
            var contents = $(".wlrdnum");
            for (var i = 0; i < contents.length; i++) {
                if (contents[i].textContent.length > 45) {
                    var text = contents[i].textContent.substring(0, 45);
                    str2 = "#wlrd" + i;
                    $(str2).text(text + "...");
                }
            }
        }

    });
}


function getThree() {
    var zqsj = 3;
    $.ajax({
        // url: "symgxxtotalAction",
        url: "symgxxAction",
        async: true,
        data: "zqsj=" + zqsj,
        dataType: "json",
        type: "post",
        success: function (data) {
            result = $.parseJSON(data.mgxxtotal);
            $("#mgxxThree").html(result);
        },
    });
};

function getOne() {
    var zqsj = 1;
    $.ajax({
        // url: "symgxxtotalAction",
        url: "symgxxAction",
        async: true,
        data: "zqsj=" + zqsj,
        dataType: "json",
        type: "post",
        success: function (data) {
            result = $.parseJSON(data.mgxxtotal);
            $("#mgxxOne").html(result);
        },
    });
};
	