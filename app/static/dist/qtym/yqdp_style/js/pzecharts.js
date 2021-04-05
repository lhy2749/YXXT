$(function () {
    yqtj(); //舆情大屏 舆情统计模块ajax
    qgfb(); //舆情大屏 情感分布模块ajax
    // ztcy();
    yqqs();
})

function getDay(day) {

    var today = new Date();


    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;


    today.setTime(targetday_milliseconds); //注意，这行是关键代码


    var tYear = today.getFullYear();

    var tMonth = today.getMonth();

    var tDate = today.getDate();

    tMonth = doHandleMonth(tMonth + 1);

    tDate = doHandleMonth(tDate);

    return tYear + "-" + tMonth + "-" + tDate;

}

function doHandleMonth(month) {

    var m = month;

    if (month.toString().length == 1) {

        m = "0" + month;

    }

    return m;

}


//舆情大屏 舆情统计ajax
function yqtj() {
    var start_time = getdatetime2(2);
    var end_time = getdatetime2(0);
    var barChart = echarts.init(document.getElementById("dppieChart1"));
    var yqlx = [];
    var sum = [];
    $.ajax({
        type: "post",
        async: false,
        url: "getMtfbAction",    //请求发送到mtfbServlet处
        data: {
            "datestart": start_time,
            "dateend": end_time
        },
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            result = $.parseJSON(data.result);
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    var str = result[i].yqlx;
                    yqlx.push(str.substring(0, 10));    //挨个取出类别并填入类别数组
                }
                for (var i = 0; i < result.length; i++) {
                    sum.push(result[i].sum);    //挨个取出销量并填入销量数组
                }
                barChart.hideLoading();    //隐藏加载动画
                barChart.setOption({        //加载数据图表

                    calculable: true,
                    grid: {
                        borderWidth: 0,
                        y: 80,
                        y2: 60
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    xAxis: [
                        {
                            type: "category",
                            show: true,
                            triggerEvent: true,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#ffffff'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                show: false //去掉网格线
                            },
                            data: yqlx
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            show: false,
                            triggerEvent: true,
                            axisLabel: {
                                show: false,
                                textStyle: {
                                    color: '#ffffff'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                show: false //去掉网格线
                            }
                        }
                    ],
                    series: [
                        {
                            name: "舆情统计",
                            type: "bar",
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        // build a color map as your need.
                                        var colorList = [
                                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                        ];
                                        return colorList[params.dataIndex];
                                    },
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter: '{b}\n{c}'
                                    }
                                }
                            },
                            data: sum
                        }
                    ]
                });
                barChart.on('click', function (params) {
                    var day = getDay(-3);//3天前日期
                    var end_time = getdatetime2(0);
                    if (params.seriesIndex == 'undefined') {
                        return;
                    } else if (params.componentType == "xAxis") {
                        switch (params.name) {
                            case "微信":

                                window.open("ckyqtjAction?index=1&datestart=" + day + "&dateend=" + end_time, "_blank");
                                break;
                            case "微博":

                                window.open("ckyqtjAction?index=0&datestart=" + day + "&dateend=" + end_time, "_blank");
                                break;
                            case "论坛":

                                window.open("ckyqtjAction?index=5&datestart=" + day + "&dateend=" + end_time, "_blank");
                                break;
                            case "网页":

                                window.open("ckyqtjAction?index=2&datestart=" + day + "&dateend=" + end_time, "_blank");
                                break;
                            case "客户端":

                                window.open("ckyqtjAction?index=4&datestart=" + day + "&dateend=" + end_time, "_blank");
                                break;
                            case "报刊":

                                window.open("ckyqtjAction?index=3&datestart=" + day + "&dateend=" + end_time, "_blank");
                                break;
                            default:
                                break;
                        }


                    } else {

                        switch (params.name) {
                            case "微信":

                                window.open("ckyqtjAction?index=1&datestart=" + day, "_blank");
                                break;
                            case "微博":

                                window.open("ckyqtjAction?index=0&datestart=" + day, "_blank");
                                break;
                            case "网页":

                                window.open("ckyqtjAction?index=2&datestart=" + day, "_blank");
                                break;
                            case "论坛":

                                window.open("ckyqtjAction?index=5&datestart=" + day, "_blank");
                                break;
                            case "客户端":

                                window.open("ckyqtjAction?index=4&datestart=" + day, "_blank");
                                break;
                            case "报刊":

                                window.open("ckyqtjAction?index=3&datestart=" + day, "_blank");
                                break;
                            default:
                                break;
                        }
                    }


                });
                $(window).resize(barChart.resize);
            }

        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            barChart.hideLoading();
        }
    });
}


//舆情大屏 情感分布ajax
function qgfb() {
    var barChart = echarts.init(document.getElementById("dphistogramChart"));
    var qglx = [];
    var sum = [];
    var color_list = [];
    var start = getdatetime2(2);
    var end = getdatetime2(0);
    $.ajax({
        type: "post",
        async: false,
        url: "getQgfbAction",
        dataType: "json",
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            result = $.parseJSON(data.qgfbresult);
            var color_dic = {'正面' :'green','负面':'red','中性':'yellow'};
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    var str = result[i].qglx;
                    var color = color_dic[str];
                    color_list.push(color);
                    qglx.push(str);    //挨个取出类别并填入类别数组
                }
                for (var i = 0; i < result.length; i++) {
                    sum.push(result[i].sum);    //挨个取出销量并填入销量数组
                }
                barChart.hideLoading();    //隐藏加载动画
                barChart.setOption({

                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: color_list,
                    calculable: true,
                    series: [
                        {
                            name: "数据",
                            type: "pie",
                            radius: "55%",
                            center: ["50%", "60%"],
                            data: [

                                {value: sum[0], name: qglx[0]},
                                {value: sum[1], name: qglx[1]},
                                {value: sum[2], name: qglx[2]}


                            ],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: "{b} : {c}"
                                    }
                                }
                            }
                        }
                    ]
                });
                barChart.on('click', function (params) {

                    switch (params.name) {
                        case "负面":

                            window.open("DpajxgyqAction?qgdm=0&start="+start+"&end="+end, "_blank");
                            break;
                        case "中性":

                            window.open("DpajxgyqAction?qgdm=1&start="+start+"&end="+end, "_blank");
                            break;
                        case "正面":

                            window.open("DpajxgyqAction?qgdm=2&start="+start+"&end="+end, "_blank");
                            break;

                        default:
                            break;
                    }
                });
                $(window).resize(barChart.resize);
            }

        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            barChart.hideLoading();
        }
    });
}


//舆情大屏 情感分布ajax
function ztcy() {
    var cycharts = echarts.init(document.getElementById("cyChart"));
    var sjgjc = [];
    var cptj = [];
    $.ajax({
        type: "post",
        async: false,
        url: "getZtcyAction",
        dataType: "json",
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            result = $.parseJSON(data.ztcyresult);
            if (result) {

                var list = [];
                for (var i = 0; i < result.length; i++) {
                    list.push({
                        name: result[i].sjgjc,
                        value: result[i].cptj,
                    })
                }

                console.log(list);

                /*	for(var i=0;i<result.length;i++){
                    //这一点
                        var str = result[i].sjgjc;
                    //这一点
                        sjgjc.push(str);    //挨个取出类别并填入类别数组
                    }
                    for(var i=0;i<result.length;i++){
                        cptj.push(result[i].cptj);    //挨个取出销量并填入销量数组
                    }*/
                cycharts.hideLoading();    //隐藏加载动画
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
                                    var colors = ['#fda67e', '#81cacc', '#cca8ba', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#fda67e', '#81cacc', '#00CD66', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#FF4500', '#008B8B', '#00688B'];
                                    return colors[parseInt(Math.random() * 20)];
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: list
                    }]
                });
                $(window).resize(cycharts.resize);
            }

        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            cycharts.hideLoading();
        }
    });
}

//统计信息 舆情趋势
function yqqs() {
    var lineChart = echarts.init(document.getElementById("dpyqqs_charts"));
    var tjrq = [];
    var sum = [];
    $.ajax({
        type: "post",
        async: false,
        url: "getDpYqqsAction",    //请求发送
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            result = $.parseJSON(data.yqqsresult);

            if (result) {
                for (var i = 0; i < result.length; i++) {
                    var str = result[i].tjrq;
                    tjrq.push(str.substring(5, 10));
                    //挨个取出类别并填入类别数组
                }
                for (var i = 0; i < result.length; i++) {
                    sum.push(result[i].sum);    //挨个取出销量并填入销量数组
                }
                lineChart.hideLoading();    //隐藏加载动画
                lineChart.setOption({        //加载数据图表

                    noDataLoadingOption: {
                        text: '暂无数据',//没有数据时显示的文字
                        effect: 'bubble',//loading效果，此为气泡，还有'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
                        effectOption: {
                            backgroundColor: "rgba(50,50,50,0)",//loading的背景
                        },
                        textStyle: {//没有数据时显示的文字的样式
                            fontSize: 32,
                            fontWeight: 'bold',
                        }
                    },

                    calculable: true,
                    tooltip: {
                        trigger: "axis"
                    },
                    xAxis: [
                        {
                            splitLine: {show: false},
                            type: "category",
                            axisLine: {

                                show: true,
                                lineStyle: {
                                    color: '#fff'
                                }

                            },
                            boundaryGap: false,
                            data: tjrq,
                            axisLabel: {
                                textStyle: {
                                    color: "#fff"
                                }
                            }
                        }
                    ],

                    yAxis: [
                        {
                            splitLine: {show: false},
                            type: "value",
                            axisLine: {

                                show: true,
                                lineStyle: {
                                    color: '#fff'
                                }

                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#fff"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: "舆情数",
                            type: "line",
                            smooth: true,
                            data: sum,
                            /* itemStyle:{
                                 normal:
                                     {
                                     label:{
                                         show:true
                                     }
                                     }
                             }, */  markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }

                        }
                    ],

                    animation: true,
                    animationEasing: "CircularOut"
                });
                $(window).resize(lineChart.resize);
            }

        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            lineChart.hideLoading();
        }
    });
}

function getdatetime(number) {
    var NowDate = new Date();
    NowDate.setDate(NowDate.getDate() - number);
    var time = NowDate.toLocaleDateString();
    var time_list = time.split("/");
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
function getdatetime2(number){
	var NowDate = new Date();
    NowDate.setDate(NowDate.getDate() - number);
    var y = NowDate.getFullYear();
    var m = NowDate.getMonth()+1;
    var d = NowDate.getDate();
    var formatwdate = y+'-'+m+'-'+d;
    var time_list = formatwdate.split("-");
    if (time_list[1] < 10) {
        var time2 = "0" + time_list[1]
    }else{
        var time2 = time_list[1]
    }
    if (time_list[2] < 10) {
        var time3 = "0" + time_list[2]
    }else{
        var time3 = time_list[2]
    }
    return time_list[0] + "-" + time2 + "-" + time3
    
}
