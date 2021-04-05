$(function () {
    var start_time = datetime(2);
    var end_time = datetime(0);

    $.ajax({
        type: "post",
        async: true,
        url: "getNrfxZtcy1",    //请求发送
        data: {
            "flag": "2",
            "sign": "0",
            "zqrq1": start_time,
            "zqrq2": end_time
        },
        dataType: "json",        //返回数据形式为json
        success: function (data) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            var result = $.parseJSON(data.ztcyresult);
            let ztcyresult = {}
            for (let i in result) {
                let ztcy = JSON.parse(result[i].cy);
                for (let j in ztcy) {
                    if (j in ztcyresult) {
                        ztcyresult[j] = ztcyresult[j] + ztcy[j]
                    } else {
                        ztcyresult[j] = ztcy[j]
                    }
                }
            }
            var dataresult = [];
            for (let i in ztcyresult) {
                dataresult.push({name: i, value: ztcyresult[i]})
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


});

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




