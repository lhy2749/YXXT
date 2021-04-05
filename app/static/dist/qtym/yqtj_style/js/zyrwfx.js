$(function () {
    let rwbh_value = $("#rwbh-input").val();
    getYhfx(rwbh_value);
});

// function generation(data, name) {
//     let str1 = "#" + name;
//     let tableData = "";
//     let count = 0;
//     for (let key in data) {
//         count = count + 1;
//         if (count > 7) {
//             break
//         }
//         tableData += "<tr class='trclass'>";
//         tableData += "<td><a target='_blank'>" + key + "</a></td>" + "<td><a target='_blank'>" + data[key] + "</td>";
//         tableData += "</tr>";
//     }
//     let str2 = ".loading-icon-" + name;
//     $(str2).hide();
//     $(str1).html(tableData);
// }


function generation(data, rwbh) {
    // data = Object.keys(data).sort();
    let rwmc_value = $("#rwmc-input").val();
    let tableData = "";
    let count = 0;
    for (let key in data) {
        count = count + 1;
        if (count > 7) {
            break
        }
        tableData += "<tr class='trclass'>";
        let h_str = "XgyhXqy?rwbh=" + rwbh + "&rwmc=" + encodeURI(rwmc_value) + "&xgyh=" + encodeURI(key) + "&count=" + data[key];
        tableData += "<td><a href='" + h_str + "' target='_blank'>" + key + "</a></td>" + "<td><a target='_blank'>" + data[key] + "</td>";
        tableData += "</tr>";
    }
    $(".loading-icon-yhtj").hide();
    $("#yhtj").html(tableData);
}


function generation1(data) {
    let tableData = "";
    for (let i = 0; i < data.length; i++) {
        if (i > 7) {
            break
        }
        tableData += "<tr class='trclass'>";
        tableData += "<td><a href='" + data[i].yqurl + "' target='_blank'>" + data[i].yqbt + "</a></td>" + "<td><a target='_blank'>" + data[i].fbsj + "</td>";
        tableData += "</tr>";
    }
    $(".loading-icon-xgfy").hide();
    $("#xgfy").html(tableData);
}

function getYhfx(rwbh_value) {
    $.ajax({
        type: "post",
        async: true,
        url: "getZyrwYhfx",    //请求发送
        data: {
            "rwbh": rwbh_value,
        },
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            yqxxresult = $.parseJSON(data.yqxxresult);
            rwxxresult = $.parseJSON(data.rwxxresult);
            if (rwxxresult[0].yhtj) {
                let yhtj = $.parseJSON(rwxxresult[0].yhtj);
                generation(yhtj, rwxxresult[0].rwbh);
            }
            if (rwxxresult[0].ztcy) {
                let ztcy = $.parseJSON(rwxxresult[0].ztcy);
                ThemeCloud(ztcy);
            }
            if (yqxxresult) {
                generation1(yqxxresult);
            }
            if (rwxxresult[0].gzyh) {
                let gzyh = $.parseJSON(rwxxresult[0].gzyh);
                relationship(gzyh);
            }
        }
    });
    return "yes";
}

//生成随机数
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}


function relationship(data) {
    let data_list = [];
    let data_links = [];
    let data_categories = [];
    // data = {"贵州陈胜金": 1, "云南省人民检察院": 1, "泸西天平": 1, "云南省高级人民法院": 1, "个旧法院": 1, "红河州检察院": 1, "红河州中级法院": 1, "云南发布": 1};
    let count = 0;
    let source = "";
    for (let key in data) {
        count = count + 1;
        if (count === 1) {
            source = key;
        }
        let tem_list = {};
        let tem_links = {};
        let tem_categories = {};
        tem_list["name"] = key;
        tem_list["symbolSize"] = GetRandomNum(10, 50);
        tem_list["value"] = GetRandomNum(1, 30);
        tem_list["category"] = key;
        tem_list["draggable"] = "true";
        data_list.push(tem_list);
        tem_links["source"] = source;
        tem_links["target"] = key;
        data_links.push(tem_links);
        if (count === 1) {
            continue
        }
        tem_categories["name"] = key;
        data_categories.push(tem_categories);
    }
    if (data != 0) {
        $(".loading-icon-gzyh").hide();
        $("#gzyh").height(320);
        $("#gzyh").show();
    }
    var myChart = echarts.init(document.getElementById('gzyh'));
    var options = {
        backgroundColor: new echarts.graphic.RadialGradient(0., 0., 0., [{
            offset: 0,
            color: '#ffffff'
        }, {
            offset: 1,
            color: '#ffffff'
        }]),
        animationDuration: 0,
        animationEasingUpdate: 'quinticInOut',
        series: [{
            name: '',
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 400,
                layoutAnimation: true,   // 显示动画  >100 不建议关闭
                edgeLength: 30,
                gravity: 0.1
            },
            data: data_list,
            links: data_links,
            categories: data_categories,
            focusNodeAdjacency: true,
            roam: true,
            label: {
                normal: {
                    show: true,
                    position: 'top',

                }
            },
            lineStyle: {
                normal: {
                    color: 'source',
                    curveness: 0,
                    type: "solid"
                }
            }
        }]
    };
    myChart.setOption(options);
    $(window).resize(myChart.resize);
}

function ThemeCloud(ztcy) {
    $(".loading-icon-rmcy").hide();
    $(".p_chart").show();
    if (ztcy != 0) {
        $("#cyChart").height(271);
        $("#cyChart").show();
    }
    var dataresult = [];
    for (let i in ztcy) {
        dataresult.push({name: i, value: ztcy[i]})
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

}

