//统计信息 舆情趋势
function yqqs() {
		var lineChart = echarts.init(document.getElementById("echarts-line-chart"));
		var tjsj = [];    
		var sum = [];     
		$.ajax({
			type : "post",
			async : false,    
			url : "getDpAjyqqsAction",    //请求发送
			dataType : "json",        //返回数据形式为json
			
			success : function(data) {
				//请求成功时执行该函数内容，result即为服务器返回的json对象
				result = $.parseJSON(data.result);
			
			
				if (result) {
					for(var i=0;i<result.length;i++){
						var str = result[i].tjsj;	
						tjsj.push(str.substring(0, 10));   
						//挨个取出类别并填入类别数组
					}
					for(var i=0;i<result.length;i++){       
						sum.push(result[i].sum);    //挨个取出销量并填入销量数组
					}
					lineChart.hideLoading();    //隐藏加载动画
					lineChart.setOption({        //加载数据图表
						tooltip: {
					        trigger: "axis",
					        showDelay: 20
					    },
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
					
					    toolbox: {
					        show: true,
					        orient: 'vertical',
				            x: '95%',

				            y: 'center',
				          
				            itemSize: 20,
					        feature: {
					            dataView: {
					                show: true,
					                readOnly: true
					            },
					            magicType: {
					                show: true,
					                type: ["line", "bar"]
					            },
					            restore: {
					                show: true
					            },
					            saveAsImage: {
					                show: true
					            },
					            dataZoom: {
					                show: true
					            }
					        }
					    },
					     dataZoom: {
					            show: true,
					            realtime: true,
					            start: 80,
					            end: 100
					        },
					    calculable: true,
					    grid: {
				            top: '10%',
				            bottom: '15%',
				            containLabel: true
				        },
						xAxis: [
						        {
						        	type: "category",
						        
						        	boundaryGap: false,
						        	 splitLine: {
							                show: false
							            },
							            
						        	data: tjsj
						        }
						        ],
					    yAxis: [
						                {
						                	type: "value",
						                
						                     splitLine: {
									                show: false
									            }
						                     }
						                    
						                
						                ],
						                series: [
						                         {
						                        	 name: "舆情数",
						                        	 type: "line",

						 			                symbol:'none',
						                        	 smooth: true,
						                        	 data: sum

						                         }
						                         ],
						                         animation: true,
						                         animationEasing: "CircularOut"
					});
					$(window).resize(lineChart.resize);
				}

			},
			error : function(errorMsg) {
				//请求失败时执行该函数
				alert("图表请求数据失败!");
				lineChart.hideLoading();
			}
		});
	}

//统计信息 媒体分布
function mtfb1() {
//	alert("案件媒体");
	var barChart = echarts.init(document.getElementById("echarts-bar-chart"));
	var yqlx = [];    
	var sum = [];     
	$.ajax({
		type : "post",
		async : false,    
		url : "getDpAjmtfbAction",    //请求发送到mtfbServlet处
	
		dataType : "json",        //返回数据形式为json
		success : function(data) {
			//请求成功时执行该函数内容，result即为服务器返回的json对象
			
			result = $.parseJSON(data.result);
			if (result) {
				for(var i=0;i<result.length;i++){
					var str = result[i].yqlx;
					yqlx.push(str.substring(0, 10));    //挨个取出类别并填入类别数组
				}
				for(var i=0;i<result.length;i++){       
					sum.push(result[i].sum);    //挨个取出销量并填入销量数组
				}
				barChart.hideLoading();    //隐藏加载动画
				barChart.setOption({        //加载数据图表
					tooltip: {
						trigger: "axis",
					},
					noDataLoadingOption: {
						 text: '暂无数据',//没有数据时显示的文字
						effect: 'bubble',//loading效果，此为气泡，还有'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
						 effectOption: {
					 backgroundColor: "rgba(50,50,50,0)",//loading的背景
						},
						textStyle: {//没有数据时显示的文字的样式
 fontSize: 32,
 fontWeight: 'bold'
}
},
					toolbox: {
			            show: true,
			            orient: 'vertical',
			            x: '95%',

			            y: 'center',
			           
			            itemSize: 20,
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
			                    show: true,
			                    type: ['line', 'bar']
			                }
			            }
			        },
					calculable: true,
					
					  grid: {
				            top: '15%',
				            bottom: '3%',
				            containLabel: true
				        },
				
					xAxis: [
					        {
					        	type: "category",
					        	show: true,
					        	axisLabel: {
					        		show: true
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
					                	show: true,
					                    axisLabel: {
					                        show: true
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
				                        	 data:sum

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

//3.统计信息 情感趋势
function qgqs() {
	var barChart = echarts.init(document.getElementById("echarts-scatter-chart"));
	var tjrq = [];  
	var fm = []; 
	var zx = []; 
	var zm = [];    
	$.ajax({
		type : "post",
		async : false,    
		url : "getDpAjqgqsAction",    //请求发送到mtfbServlet处
	
		dataType : "json",        //返回数据形式为json
		success : function(data) {
			//请求成功时执行该函数内容，result即为服务器返回的json对象
			result = $.parseJSON(data.result);
			if (result) {
				for(var i=0;i<result.length;i++){
					
					var str = result[i].tjrq;
					tjrq.push(str.substring(0, 10));    //挨个取出类别并填入类别数组
					
				}
				for(var i=0;i<result.length;i++){       
					fm.push(result[i].fm);    //挨个取出销量并填入销量数组
				}
				for(var i=0;i<result.length;i++){       
					zx.push(result[i].zx);    //挨个取出销量并填入销量数组
				}
				for(var i=0;i<result.length;i++){       
					zm.push(result[i].zm);    //挨个取出销量并填入销量数组
				}
				barChart.hideLoading();    //隐藏加载动画
				barChart.setOption({

			        tooltip: {
			            trigger: 'axis'
			        },
			        dataZoom: {
			            show: true,
			            realtime: true,
			            start: 80,
			            end: 100
			        },
			        legend: {
			            orient: "vertical",
			            x: "left",
			           
			            data: ['中性','正面','负面']
			          
			        },
			        noDataLoadingOption: {
 text: '暂无数据',//没有数据时显示的文字
effect: 'bubble',//loading效果，此为气泡，还有'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
effectOption: {
backgroundColor: "rgba(50,50,50,0)",//loading的背景
},
textStyle: {//没有数据时显示的文字的样式
fontSize: 32,
fontWeight: 'bold'
}
},
			        toolbox: {
			            show: true,
			            orient: 'vertical',
			            x: '95%',

			            y: 'center',
			         
			            itemSize: 20,
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
			        grid: {
			            top: '10%',
			            bottom: '15%',
			            containLabel: true
			        },
			        xAxis: [
			            {
			                type: 'category',
			                boundaryGap: false,
			                splitLine: {
				                show: false
				            },
				           
			                data: tjrq
			        }
			    ],
			        yAxis: [
			            {
			                type: 'value',
			                splitLine: {
				                show: false
				            }
				            
			              
			        }
			    ],
			        series: [
			            {
			                name: '中性',
			                type: 'line',
			                data: zx,
			                symbol:'none',
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
			                }
			        },
			            {
			                name: '正面',
			                type: 'line',

			                symbol:'none',
			                data: zm,
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
			                }
			        }, {
			                name: '负面',
			                type: 'line',

			                symbol:'none',
			                data: fm ,
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
			                }
			        },
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

//统计信息 情感分布
function qgfb1() {
	var barChart = echarts.init(document.getElementById("echarts-k-chart"));
	var qglx = [];    
	var sum = [];     
	$.ajax({
		type : "post",
		async : false,    
		url : "getDpAjqgfbAction",    //请求发送到mtfbServlet处
		dataType : "json",        //返回数据形式为json
	
		success : function(data) {
			//请求成功时执行该函数内容，result即为服务器返回的json对象
			result = $.parseJSON(data.result);
			if (result) {
				for(var i=0;i<result.length;i++){
					var str = result[i].qglx;
				
					qglx.push(str);    //挨个取出类别并填入类别数组
				}
				for(var i=0;i<result.length;i++){       
					sum.push(result[i].sum);    //挨个取出销量并填入销量数组
				}
				barChart.hideLoading();    //隐藏加载动画
				barChart.setOption({
			        title: {
			            subtext: "",
			            x: "center"
			        },
			        tooltip: {
			            trigger: "item",
			            formatter: "{a} <br/>{b} : {c} ({d}%)"
			        },
			    	noDataLoadingOption: {
text: '暂无数据',//没有数据时显示的文字
effect: 'bubble',//loading效果，此为气泡，还有'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
effectOption: {
backgroundColor: "rgba(50,50,50,0)",//loading的背景
},
textStyle: {//没有数据时显示的文字的样式
fontSize: 32,
fontWeight: 'bold'
}
},
			        legend: {
			            orient: "vertical",
			            x: "left",
			           
			            data: qglx
			          
			        },
			        toolbox: {
			            show: true,
			            orient: 'vertical',
			            x: '95%',

			            y: 'center',
			           
			            itemSize: 20,
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
			                }
			            }
			        },
			        color:['green','orange','red'],
			        calculable: true,
			        grid: {
			            top: '15%',
			            bottom: '3%',
			            containLabel: true
			        },
			        series: [
			            {
			                name: "数据",
			                type: "pie",
			                radius: "55%",
			                center: ["50%", "60%"],
			                data: [
			                       {
			                           value: sum[0],
			                           name: qglx[0]
			                   },
			                       {
			                           value: sum[1],
			                           name: qglx[1]
			                   },
			                       {
			                           value: sum[2],
			                           name: qglx[2]
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




$(function () {
//	 yqqs();
	 mtfb1();
//	 qgqs();
	 qgfb1();	 
});
