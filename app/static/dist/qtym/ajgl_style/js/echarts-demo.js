$(function () {
    var lineChart = echarts.init(document.getElementById("echarts-line-chart"));
    var lineoption = {

        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                magicType: {
                    show: false,
                    type: ["line", "bar"]
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        tooltip: {
            trigger: "axis"
        },
        xAxis: [
            {
                type: "category",
                axisLine: {
                    onZero: false
                },
                boundaryGap: false,
                data: ["0", "10", "20", "30", "40", "50", "60", "70", "80"]
        }
    ],
        yAxis: [
            {
                type: "value"
        }
    ],
        series: [
            {
                name: "案件发展趋势",
                type: "line",
                smooth: true,
                data: [15, 20, 30, 64, 50, 34, 70, 60, 34]
        }
    ]
    };
    lineChart.setOption(lineoption);
    $(window).resize(lineChart.resize);

    var barChart = echarts.init(document.getElementById("echarts-bar-chart"));
    var baroption = {
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                },
                magicType: {
                    show: false
                }
            }
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: true,
                data: ['微信', '微博', '头条', '论坛', '新闻', '报刊', '网页', '百度'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#000000'
                    }
                },
                splitLine: {
                    show: false //去掉网格线
                }
        }
    ],
        yAxis: [
            {
                type: 'value',
                show: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#000000'
                    }
                },
                splitLine: {
                    show: false //去掉网格线
                }
        }
    ],
        series: [
            {
                name: '舆情统计',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                          '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                           '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                           '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: [12, 21, 10, 4, 12, 5, 6, 5],
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        formatter: function (params) {
                            return '<img src="' +
                                params.data.symbol.replace('image://', '') +
                                '"/>';
                        }
                    },
                    data: [
                        {
                            xAxis: 0,
                            y: 350,
                            name: 'Line',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/折线图.png'
                        },
                        {
                            xAxis: 1,
                            y: 350,
                            name: 'Bar',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/柱状图.png'
                        },
                        {
                            xAxis: 2,
                            y: 350,
                            name: 'Scatter',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/散点图.png'
                        },
                        {
                            xAxis: 3,
                            y: 350,
                            name: 'K',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/K线图.png'
                        },
                        {
                            xAxis: 4,
                            y: 350,
                            name: 'Pie',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/饼状图.png'
                        },
                        {
                            xAxis: 5,
                            y: 350,
                            name: 'Radar',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/雷达图.png'
                        },
                        {
                            xAxis: 6,
                            y: 350,
                            name: 'Chord',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/和弦图.png'
                        },
                        {
                            xAxis: 7,
                            y: 350,
                            name: 'Force',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/力导向图.png'
                        },
                        {
                            xAxis: 8,
                            y: 350,
                            name: 'Map',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/地图.png'
                        },
                        {
                            xAxis: 9,
                            y: 350,
                            name: 'Gauge',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/仪表盘.png'
                        },
                        {
                            xAxis: 10,
                            y: 350,
                            name: 'Funnel',
                            symbolSize: 20,
                            symbol: 'image://../asset/ico/漏斗图.png'
                        },
                ]
                }
        }
    ]
    };
    barChart.setOption(baroption);

    window.onresize = barChart.resize;

    var scatterChart = echarts.init(document.getElementById("echarts-scatter-chart"));
    var scatteroption = {

        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['中性', '正面', '负面']
        },
        toolbox: {
            show: true,
            feature: {

                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
        }
    ],
        series: [
            {
                name: '中性',
                type: 'line',
                data: [11, 11, 15, 13, 12, 13, 10],
                markPoint: {
                    data: [
                        {
                            type: 'max',
                            name: '最大值'
                        },
                        {
                            type: 'min',
                            name: '最小值'
                        }
                ]
                },
                markLine: {
                    data: [
                        {
                            type: 'average',
                            name: '平均值'
                        }
                ]
                }
        },
            {
                name: '正面',
                type: 'line',
                data: [1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [
                        {
                            name: '周最低',
                            value: -2,
                            xAxis: 1,
                            yAxis: -1.5
                        }
                ]
                },
                markLine: {
                    data: [
                        {
                            type: 'average',
                            name: '平均值'
                        }
                ]
                }
        }, {
                name: '负面',
                type: 'line',
                data: [5, 8, 7, 8, 9, 4, 19],
                markPoint: {
                    data: [
                        {
                            type: 'max',
                            name: '最大值'
                        },
                        {
                            type: 'min',
                            name: '最小值'
                        }
                ]
                },
                markLine: {
                    data: [
                        {
                            type: 'average',
                            name: '平均值'
                        }
                ]
                }
        },
    ]
    };
    scatterChart.setOption(scatteroption);
    $(window).resize(scatterChart.resize);


    var kChart = echarts.init(document.getElementById("echarts-k-chart"));
    var koption = {
        title: {
            subtext: "",
            x: "center"
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            x: "left",
            data: ["中性", "负面", "正面"],
            y: "top"
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                },
                magicType: {
                    show: false
                }
            }
        },
        calculable: true,
        series: [
            {
                name: "数据",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: [
                    {
                        value: 335,
                        name: "中性"
                },
                    {
                        value: 310,
                        name: "负面"
                },
                    {
                        value: 234,
                        name: "正面"
                }
            ],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b} : {c} ({d}%)"
                        }
                    }
                }
        }
    ]
    };
    kChart.setOption(koption);
    $(window).resize(kChart.resize);


});
