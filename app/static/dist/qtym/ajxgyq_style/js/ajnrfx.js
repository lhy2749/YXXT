$(function () {
    var ajbh_value = $("#ajbh-input").val();
    var start_time = datetimeMON();
    var end_time = datetime(0);
    // start_time = "2019-09-10";
    $("#start").attr({"value": start_time});
    $("#end").attr({"value": end_time});
    gzhm(ajbh_value, start_time, end_time);
    ThemeCloud(ajbh_value, start_time, end_time);
    getzyyq(ajbh_value,start_time,end_time);
});


function mymethon() {
    var ajbh_value = $("#ajbh-input").val();
    $(".trclass").remove();
    $("#cyChart").remove();
    $(".layui-icon").show();
    $("#cybox").append("<p id='cyChart' class='p_chart'></p>");
    $(".p_chart").hide();
    $("#cyChart").height(226);
    var input_start = $('#start').val();
    var input_end = $('#end').val();
    var d1 = new Date(Date.parse(input_start.replace(/-/g, "/")));
    var d2 = new Date(Date.parse(input_end.replace(/-/g, "/")));
    var NowDate = new Date();
    // var nowtime = NowDate.toLocaleDateString(); //获取当前时间
    if (d1 > d2 || d1 > NowDate || d2 > NowDate) {
        layer.msg('您输入的时间有误', {
            icon: 61,
            time: 2000,
            anim: 6,
            offset: ['80px', '550px']
        });
    } else {
        gzhm(ajbh_value, input_start, input_end);
        ThemeCloud(ajbh_value, input_start, input_end);
        getzyyq(ajbh_value, input_start, input_end);
    }
}

function datetimeMON() {
    var NowDate = new Date();
    NowDate.setMonth(NowDate.getMonth() - 1);
    var y = NowDate.getFullYear();
    var m = NowDate.getMonth() + 1;
    var d = NowDate.getDate();
    var formatwdate = y + '-' + m + '-' + d;
    var time_list = formatwdate.split("-");
    if (time_list[1] < 10) {
        var time2 = "0" + time_list[1]
    } else {
        var time2 = time_list[1]
    }
    if (time_list[2] < 10) {
        var time3 = "0" + time_list[2]
    } else {
        var time3 = time_list[2]
    }
    return time_list[0] + "-" + time2 + "-" + time3
}

function datetime(number) {
    var NowDate = new Date();
    var y = NowDate.getFullYear();
    var m = NowDate.getMonth() + 1;
    var d = NowDate.getDate() - number;
    if (m < 10) {
        var time2 = "0" + m
    } else {
        var time2 = m
    }
    if (d < 10) {
        var time3 = "0" + d
    } else {
        var time3 = d
    }
    return y + "-" + time2 + "-" + time3
}


function generation(datatype, name, startTime, endTime, ajbhmm) {
    var str1 = "#" + name;
    var tableData = "";
    var lxdm = 2;
    if (name === "ajwbh") {
        lxdm = 0;
    }
    for (var i = 0; i < datatype.length; i++) {
        tableData += "<tr class='trclass'>";
        str11 = "getAjYmxqAction?yqlxm=" + encodeURI(datatype[i].yqly) + "&ajbhmm=" + ajbhmm + "&startTime=" + startTime + "&endTime=" + endTime;
        tableData += "<td><a href=\"" + str11 + "\" target='_blank'>" + datatype[i].yqly + "</a></td>" + "<td><a href=\"" + str11 + "\" target='_blank'>" + datatype[i].ajnrfxnum + "</td>";
        tableData += "</tr>";
    }
    var str2 = ".loading-icon-" + name;
    $(str2).hide();
    $(str1).html(tableData);
}


function completeLoading() {
    // if (document.readyState == "complete") {
    var loadingMask = document.getElementById('loadingDiv');
    loadingMask.parentNode.removeChild(loadingMask);
    // }
}

function gzhm(ajbhm, startTime, endTime) {
    $.ajax({
        type: "post",
        async: true,
        url: "AJNrfxTuAction",    //请求发送
        data: {
            "ajbhm": ajbhm,
            "startTime": startTime,
            "endTime": endTime
        },
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            ajwxresult = $.parseJSON(data.ajwxresult);
            ajwbresult = $.parseJSON(data.ajwbresult);
            if (ajwxresult) {
                generation(ajwxresult, "ajwxh", startTime, endTime, ajbhm);
            }
            if (ajwbresult) {
                generation(ajwbresult, "ajwbh", startTime, endTime, ajbhm);
            }
        }
    });
    return "yes";
}


function getzyyq(ajbhm,starttime, endtime) {
    var sign = "2";
    $.ajax({
        type: "post",
        async: true,
        url: "getNrfxZyyq",    //请求发送
        data: {
            "sign": sign,
            "ajbh_value": ajbhm,
            "starttime": starttime,
            "endtime": endtime
        },
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            result = $.parseJSON(data.zyyqresult);
            var tableData = "";
            for (var i = 0; i < result.length; i++) {
                tableData += "<tr  class='trclass'>";
                str11 = "getZyyqXqy?sign=2&zybh=" + result[i].zybh + "&count=" + result[i].zytj;
                tableData += "<td><a href=\"" + str11 + "\" target='_blank'>" + result[i].yqbt + "</a></td>" + "<td><a href=\"" + str11 + "\" target='_blank'>相似文章:" + result[i].zytj + "条</td>";
                tableData += "</tr>";
            }
            $(".loading-icon-rmzyyq").hide();
            $("#rmzyyq").html(tableData);
        }
    });
    return "yes";
}


function ThemeCloud(ajbh, start_time, end_time) {
    $.ajax({
        type: "post",
        async: true,
        url: "getNrfxZtcy",    //请求发送
        data: {
            "flag": "1",
            "ajbh": ajbh,
            "zqrq1": start_time,
            "zqrq2": end_time
        },
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            $(".loading-icon-rmcy").hide();
            $(".p_chart").show();
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            var result = $.parseJSON(data.ztcyresult);
            var ztcyresult = JSON.parse(result);
            var dataztcy = ztcyresult.data;
            if (dataztcy != 0) {
                $("#cyChart").height(226);
                $("#cyChart").show();
            }
            var dataresult = [];
            for (var i = 0; i < dataztcy.length; i++) {
                dataresult.push({name: dataztcy[i][0], value: dataztcy[i][1]})
            }
            var cycharts = echarts.init(document.getElementById('cyChart'));
            cycharts.setOption({
                    tooltip: {},
                    series: [{
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [12, 50],
                        rotationRange: [-90, 90],
                        shape: 'pentagon',
                        width: 600,
                        height: 400,
                        drawOutOfBound: true,
                        textStyle: {
                            normal: {
                                color: function () {
                                    var colors = ['#fda67e', '#81cacc', '#00CD66', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#FF4500', '#008B8B', '#00688B'];
                                    return colors[parseInt(Math.random() * 10)];
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: dataresult
                    }]
                }
            );
            $(window).resize(cycharts.resize);
        },
        error: function (errorMsg) {
            layer.msg('主题词语获取失败!', {
                icon: 2,
                time: 1500,
                anim: 6

            });
        }
    });
}

