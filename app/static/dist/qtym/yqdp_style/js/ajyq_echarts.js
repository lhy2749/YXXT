$(function () {
	dd();
})

function unique1(arr){
  var hash=[];
  for (var i = 0; i < arr.length; i++) {
     if(hash.indexOf(arr[i])==-1){
      hash.push(arr[i]);
     }
  }
  return hash;
}
function pad(arr,n){
  while (arr.length<n){
	  arr.push(0)
  }
  return arr;
}

function dd() {//
	var barChart = echarts.init(document.getElementById("chart1"));
	var yqlx = [];    
	var sum = [];     
	$.ajax({
		type : "post",
		async : false,    
		url : "getYqtjAction",    //请求发送到mtfbServlet处
		dataType : "json",        //返回数据形式为json
		success : function(data) {
			//请求成功时执行该函数内容，result即为服务器返回的json对象
			result = $.parseJSON(data.yqtjresult);
			xzjbdm = data.xzjbdm;
			var arr = [];
			var mcdata = [];
			var tzjqdata = [];
			var zjqdata = [];
			var zdjqdata = [];
			var qjqdata = [];
			var wdata = [];
			if (result) {
				if(xzjbdm != null && xzjbdm !=""){
					if(xzjbdm == "0"){
						for(var i=1;i<result.length;i++){
							arr.push(result[i].sfmc);
						}
						hash = unique1(arr);
						for(var i=0;i<hash.length;i++){
							mcdata.push(hash[i]);
							for(var j=1;j<result.length;j++){
								if(result[j].sfmc == hash[i]){
									if(result[j].tsdm == 0){
										if(tzjqdata.length < mcdata.length){
											tzjqdata.push(result[j].sum*1.0);
										}else{
											tzjqdata[tzjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 1){
										if(zjqdata.length < mcdata.length){
											zjqdata.push(result[j].sum*1.0);
										}else{
											zjqdata[zjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 2){
										if(zdjqdata.length < mcdata.length){
											zdjqdata.push(result[j].sum*1.0);
										}else{
											zdjqdata[zdjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 3){
										if(qjqdata.length < mcdata.length){
											qjqdata.push(result[j].sum*1.0);
										}else{
											qjqdata[qjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 4){
										if(wdata.length < mcdata.length){
											wdata.push(result[j].sum*1.0);
										}else{
											wdata[wdata.length-1] += result[j].sum*1.0;
										}
									}
									
								}
							}
							tzjqdata = pad(tzjqdata,mcdata.length);
							zjqdata = pad(zjqdata,mcdata.length);
							zdjqdata = pad(zdjqdata,mcdata.length);
							qjqdata = pad(qjqdata,mcdata.length);
							wdata = pad(wdata,mcdata.length);
						}
					}
					if(xzjbdm == "1"){
						for(var i=0;i<result.length;i++){
							arr.push(result[i].zsmc);
						}
						hash = unique1(arr);
						for(var i=0;i<hash.length;i++){
							mcdata.push(hash[i]);
							for(var j=0;j<result.length;j++){
								if(result[j].zsmc == hash[i]){
									if(result[j].tsdm == 0){
										if(tzjqdata.length < mcdata.length){
											tzjqdata.push(result[j].sum*1.0);
										}else{
											tzjqdata[tzjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 1){
										if(zjqdata.length < mcdata.length){
											zjqdata.push(result[j].sum*1.0);
										}else{
											zjqdata[zjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 2){
										if(zdjqdata.length < mcdata.length){
											zdjqdata.push(result[j].sum*1.0);
										}else{
											zdjqdata[zdjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 3){
										if(qjqdata.length < mcdata.length){
											qjqdata.push(result[j].sum*1.0);
										}else{
											qjqdata[qjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 4){
										if(wdata.length < mcdata.length){
											wdata.push(result[j].sum*1.0);
										}else{
											wdata[wdata.length-1] += result[j].sum*1.0;
										}
									}
									
								}
							}
							tzjqdata = pad(tzjqdata,mcdata.length);
							zjqdata = pad(zjqdata,mcdata.length);
							zdjqdata = pad(zdjqdata,mcdata.length);
							qjqdata = pad(qjqdata,mcdata.length);
							wdata = pad(wdata,mcdata.length);
						}
					}
					if(xzjbdm == "2"){
						for(var i=0;i<result.length;i++){
							arr.push(result[i].xqmc);
						}
						hash = unique1(arr);
						for(var i=0;i<hash.length;i++){
							mcdata.push(hash[i]);
							for(var j=0;j<result.length;j++){
								if(result[j].xqmc == hash[i]){
									if(result[j].tsdm == 0){
										if(tzjqdata.length < mcdata.length){
											tzjqdata.push(result[j].sum*1.0);
										}else{
											tzjqdata[tzjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 1){
										if(zjqdata.length < mcdata.length){
											zjqdata.push(result[j].sum*1.0);
										}else{
											zjqdata[zjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 2){
										if(zdjqdata.length < mcdata.length){
											zdjqdata.push(result[j].sum*1.0);
										}else{
											zdjqdata[zdjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 3){
										if(qjqdata.length < mcdata.length){
											qjqdata.push(result[j].sum*1.0);
										}else{
											qjqdata[qjqdata.length-1] += result[j].sum*1.0;
										}
									}
									
									if(result[j].tsdm == 4){
										if(wdata.length < mcdata.length){
											wdata.push(result[j].sum*1.0);
										}else{
											wdata[wdata.length-1] += result[j].sum*1.0;
										}
									}
									
								}
							}
							tzjqdata = pad(tzjqdata,mcdata.length);
							zjqdata = pad(zjqdata,mcdata.length);
							zdjqdata = pad(zdjqdata,mcdata.length);
							qjqdata = pad(qjqdata,mcdata.length);
							wdata = pad(wdata,mcdata.length);
						}
					}
					if(xzjbdm == "3"){
						mcdata.push("特重舆情");
						mcdata.push("重警情");
						mcdata.push("中度警情");
						mcdata.push("轻警情");
						for(var j=0;j<result.length;j++){
							if(result[j].tsdm == 0){
								tzjqdata.push(result[j].sum*1.0);
								zjqdata.push(0);
								zdjqdata.push(0);
								qjqdata.push(0);
							}
							if(result[j].tsdm == 1){
								tzjqdata.push(0);
								zjqdata.push(result[j].sum*1.0);
								zdjqdata.push(0);
								qjqdata.push(0);
							}
							if(result[j].tsdm == 2){
								tzjqdata.push(0);
								zjqdata.push(0);
								zdjqdata.push(result[j].sum*1.0);
								qjqdata.push(0);
							}
							if(result[j].tsdm == 3){
								tzjqdata.push(0);
								zjqdata.push(0);
								zdjqdata.push(0);
								qjqdata.push(result[j].sum*1.0);
							}
						}
					}
				}
					
					
					
				barChart.hideLoading();    //隐藏加载动画
				barChart.setOption({
			        tooltip: {
			            trigger: 'axis',
			            axisPointer: { // 坐标轴指示器，坐标轴触发有效
			                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			            }
			        },
			        legend: {  
			            x: 'right',
			            data: ['特重警情', '重警情', '中度警情', '轻警情', '无'],
			            selected: {
			                '无': false
			            },
			            textStyle: {
			                color: '#fff'
			            }
			        },
			        dataZoom: {
			            show: true,
			            realtime: true,
			            start: 0,
			            end: 60,
			            textStyle: {
			                color: '#fff'
			            }
			        },
			        toolbox: {
			            'show': true,
			            orient: 'vertical',
			            x: '95%',

			            y: 'center',
			            'feature': {
			                'mark': {
			                    'show': true
			                },
			                'dataView': {
			                    'show': true,
			                    'readOnly': false
			                },
			                'magicType': {
			                    'show': true,
			                    'type': ['line', 'bar', 'stack', 'tiled']
			                },
			                'restore': {
			                    'show': true
			                },
			                'saveAsImage': {
			                    'show': true
			                }
			            },
			            iconStyle: {
			                normal: {
			                    color: '#fff', //设置颜色
			                }
			            },
			            itemSize: 20
			        },
			        grid: {
			            top: '10%',
			            left: '3%',
			            right: '10%',
			            bottom: '10%',
			            containLabel: true
			        },
			        yAxis: {
			            type: 'value',
			            splitLine: {
			                show: false
			            },
			            axisLine: {
			                lineStyle: {
			                    color: '#fff'
			                }
			            }
			        },
			        xAxis: {
			            type: 'category',
			            data: 
			            	mcdata,
//			            	[
//			                    '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
//			                    '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
//			                    '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
//			                    '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'
//			                ],
			            splitLine: {
			                show: false
			            },
			            axisLine: {
			                lineStyle: {
			                    color: '#fff'
			                }
			            }
			        },
			        series: [
			                 {
					                name: '特重警情',
					                type: 'bar',
					                stack: '总量',
					                label: {
					                    normal: {
					                        show: true,
					                        position: 'insideRight'
					                    }
					                },
					                data: 
					                	tzjqdata,
//					                	[1249.99, 1069.08, 2911.69, 1134.31, 754.78, 2609.85, 943.49, 1843.6, 2622.45, 5604.49, 4090.48, 1337.04, 2036.97, 941.77, 5184.98, 2768.75, 1709.89, 1523.5, 6143.4, 846.89, 148.88, 958.87, 1733.38, 481.96, 934.88, 32.72, 1007.56, 501.69, 144.51, 153.06, 603.15],
					                color: '#FF0000'
					        },
			            {
			                name: '重警情',
			                type: 'bar',
			                stack: '总量',
			                label: {
			                    normal: {
			                        show: true,
			                        position: 'insideRight'
			                    }
			                },
			                data: 
			                	zjqdata,
//			                	[298.02, 73.04, 140.89, 65.83, 51.48, 130.94, 76.11, 118.7, 384.86, 371.09, 360.63, 139.18, 188.09, 125.27, 371.13, 199.31, 145.17, 165.29, 808.16, 82.83, 21.45, 90.48, 210.82, 53.49, 95.68, 3.42, 77.68, 41.52, 9.74, 13.46, 43.04],
			                color: '#ff4500'
			        },
			            {
			                name: '中度警情',
			                type: 'bar',
			                stack: '总量',
			                label: {
			                    normal: {
			                        show: true,
			                        position: 'insideRight'
			                    }
			                },
			                data: 
			                	zdjqdata,
//			                	[82.44, 84.21, 956.84, 197.8, 374.69, 590.2, 446.17, 474.2, 79.68, 1110.44, 685.2, 783.66, 664.78, 535.98, 1390, 1288.36, 707, 847.25, 1015.08, 601.99, 222.89, 317.87, 1047.95, 281.1, 463.44, 39.75, 282.21, 215.51, 47.31, 52.95, 305],
			                color: '#DAA520'
			        },
			          
			            {
			                name: '轻警情',
			                type: 'bar',
			                stack: '总量',
			                label: {
			                    normal: {
			                        show: true,
			                        position: 'insideRight'
			                    }
			                },
			                data: 
			                	qjqdata,
//			                	[2982.57, 997.47, 2149.75, 992.69, 811.47, 2258.17, 958.88, 1319.4, 3038.9, 3891.92, 3227.99, 1399.02, 1765.8, 972.73, 3700.52, 1978.37, 1795.93, 1780.79, 6343.94, 1074.85, 270.96, 956.12, 1943.68, 480.37, 914.5, 89.56, 963.62, 514.83, 148.83, 171.14, 704.5],
			                color: '#00BFFF'
			        }, {
		                name: '无',
		                type: 'bar',
		                stack: '总量',
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'insideRight'
		                    }
		                },
		                data: 
		                	wdata,
//		                	[298.02, 73.04, 140.89, 65.83, 51.48, 130.94, 76.11, 118.7, 384.86, 371.09, 360.63, 139.18, 188.09, 125.27, 371.13, 199.31, 145.17, 165.29, 808.16, 82.83, 21.45, 90.48, 210.82, 53.49, 95.68, 3.42, 77.68, 41.52, 9.74, 13.46, 43.04],
		                color: '#3CB371'
		        }
			    ]
			    });
				$(window).resize(barChart.resize);
			}

		},
		error : function(errorMsg) {
			//请求失败时执行该函数
			alert("图表请求数据失败!");
			barChart.hideLoading();
		}
	});
}
