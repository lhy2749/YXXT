/** layuiAdmin.std-v1.0.0 LPPL License By http://www.layui.com/admin/ */
layui.define(function (e) {
    var a = layui.admin;
    layui.use(["admin", "carousel"], function () {
        var e = layui.$,
            a = (layui.admin, layui.carousel),
            l = layui.element,
            t = layui.device();
        e(".layadmin-carousel").each(function () {
            var l = e(this);
            a.render({
                elem: this,
                width: "100%",
                arrow: "none",
                interval: l.data("interval"),
                autoplay: l.data("autoplay") === !0,
                trigger: t.ios || t.android ? "click" : "hover",
                anim: l.data("anim")
            })
        }), l.render("progress")
    }), layui.use(["carousel", "echarts"], function () {
        var e = layui.$,
            a = (layui.carousel, layui.echarts),
            l = [],
            t = [{
                title: {
                    x: "center"
                },
                tooltip: {
                    trigger: "item"
                },
                dataRange: {
                    min: 0,
                    max: 2500,
                    x: "left",
                    y: "bottom",
                    text: ["高", "低"],
                    calculable: true
                },
                toolbox: {
                    orient: "vertical",
                    x: "right",
                    y: "bottom",
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                roamController: {
                    show: true,
                    x: "right",
                    mapTypeControl: {
                        china: true
                    }
                },
                series: [
                    {
                        name: "热点舆情数",
                        type: "map",
                        mapType: "china",
                        roam: false,
                        zoom: 1.5,
                        mapValueCalculation: "sum",
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                value: 234,
                                name: "北京"
                },
                            {
                                value: 532,
                                name: "天津"
                },
                            {
                                value: 134,
                                name: "上海"
                },
                            {
                                value: 983,
                                name: "重庆"
                },
                            {
                                value: 783,
                                name: "河北"
                },
                            {
                                value: 345,
                                name: "河南"
                },
                            {
                                value: 872,
                                name: "云南"
                },
                            {
                                value: 94,
                                name: "辽宁"
                },
                            {
                                value: 342,
                                name: "黑龙江"
                },
                            {
                                value: 989,
                                name: "湖南"
                },
                            {
                                value: 767,
                                name: "安徽"
                },
                            {
                                value: 675,
                                name: "山东"
                },
                            {
                                value: 874,
                                name: "新疆"
                },
                            {
                                value: 874,
                                name: "江苏"
                },
                            {
                                value: 878,
                                name: "浙江"
                },
                            {
                                value: 928,
                                name: "江西"
                },
                            {
                                value: 44,
                                name: "湖北"
                },
                            {
                                value: 448,
                                name: "广西"
                },
                            {
                                value: 887,
                                name: "甘肃"
                },
                            {
                                value: 903,
                                name: "山西"
                },
                            {
                                value: 673,
                                name: "内蒙古"
                },
                            {
                                value: 563,
                                name: "陕西"
                },
                            {
                                value: 747,
                                name: "吉林"
                },
                            {
                                value: 112,
                                name: "福建"
                },
                            {
                                value: 473,
                                name: "贵州"
                },
                            {
                                value: 647,
                                name: "广东"
                },
                            {
                                value: 838,
                                name: "青海"
                },
                            {
                                value: 626,
                                name: "西藏"
                },
                            {
                                value: 515,
                                name: "四川"
                },
                            {
                                value: 172,
                                name: "宁夏"
                },
                            {
                                value: 77,
                                name: "海南"
                },
                            {
                                value: 837,
                                name: "台湾"
                },
                            {
                                value: 677,
                                name: "香港"
                },
                            {
                                value: 43,
                                name: "澳门"
                }
            ]
        }
    ]
}],
            i = e("#LAY-index-pagethree").children("div"),
            n = function (e) {
                l[e] = a.init(i[e], layui.echartsTheme), l[e].setOption(t[e]), window.onresize = l[e].resize
            };
        i[0] && n(0)
    }), e("sample", {})
});
