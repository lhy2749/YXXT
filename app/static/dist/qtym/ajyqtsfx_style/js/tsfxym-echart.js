$(function () {
	var sjbh=$('#sjbh').val();
	var datestart = datetimeMON();
	var dateend = datetimeMON2();
    $("#start").attr({"value": datestart});
    $("#end").attr({"value": dateend});
	 cbfxyqqs(datestart,dateend,sjbh);
	 cbfxmtfb(datestart,dateend,sjbh);
	 
});
function datetimeMON() {
    var NowDate = new Date();
    NowDate.setMonth(NowDate.getMonth()-1);
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
function datetimeMON2() {
    var NowDate = new Date();
    NowDate.setMonth(NowDate.getMonth());
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

//态势分析舆情趋势
function cbfxyqqs(datestart,dateend,sjbh) {
		var lineChart = echarts.init(document.getElementById("echarts-line-chart"));
//		var datestart = $('#start').val();
//		var dateend = $('#end').val();
//		var ajbh=$('#ajbh').val();
		var tjsj = [];    
		var tjsl = [];
		$.ajax({
			type : "post",
			async : false,    
			url : "TsfxYqqsAction",    //请求发送
			data: {
		            "datestart":datestart,
		            "dateend": dateend,
		            "sjbh":sjbh
		        },
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
						tjsl.push(result[i].tjsl);    //挨个取出销量并填入销量数组
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
					    calculable: true,
						
						xAxis: [
						        {
						        	type: "category",
						        
						        	boundaryGap: false,
						        	data: tjsj
						        }
						        ],
					    yAxis: [
						                {
						                	type: "value",
						                	 axisLine: {
						                    
						                         show: true
						                     },
						                     axisLabel: {
						                         textStyle: {
						                             color: "rgb(4, 5, 5)"
						                         }
						                     }
						                }
						                ],
						                series: [
						                         {
						                        	 name: "舆情数",
						                        	 type: "line",
						                        	 smooth: true,
						                        	 data: tjsl

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

//态势分析舆情态势
function cbfxmtfb(datestart,dateend,sjbh) {

	var lineChart = echarts.init(document.getElementById("echarts-line-chart1"));
//	var datestart = $('#start').val();
//	var dateend = $('#end').val();
//	var ajbh=$('#ajbh').val();
	var tssj = [];//态势时间
	var tsdm = [];//态势代码
	var tsjb = [];//态势级别
	var a=4;
	$.ajax({
		type : "post",
		async : false,    
		url : "TsfxYqtsAction",    //请求发送
		data: {
	            "datestart": datestart,
	            "dateend": dateend,
	            "sjbh":sjbh
	        },
		dataType : "json",        //返回数据形式为json
		success : function(data) {
			//请求成功时执行该函数内容，result即为服务器返回的json对象
			result = $.parseJSON(data.result);
			if (result) {
				for(var i=0;i<result.length;i++){
					var str = result[i].tssj;	
					tssj.push(str.substring(0, 10));   
					//挨个取出类别并填入类别数组
				}
				for(var i=0;i<result.length;i++){  
					tsdm1=a-result[i].tsdm;
					tsdm.push(tsdm1);    //挨个取出销量并填入销量数组
				}
				for(var i=0;i<result.length;i++){
					tsjb.push(result[i].tsjb);
				}
				lineChart.hideLoading();    //隐藏加载动画
				lineChart.setOption({        //加载数据图表
					tooltip: {
				        trigger: "axis",
				        showDelay: 20
				    },
				    legend:{
				    	data:['4：特重警情','3：重警情','2:中度警情','1:轻警情','0:无 '],
				    	color: "rgba(50,50,50,0)"
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
				    calculable: true,
					
					xAxis: [
					        {
					        	type: "category",
					        
					        	boundaryGap: false,
					        	data: tssj
					        }
					        ],
				    yAxis: [
					                {
					                	type: "value",
					                	 axisLine: {
					                    
					                         show: true
					                     },
					                     axisLabel: {
					                         textStyle: {
					                             color: "rgb(4, 5, 5)"
					                         }
					                     }
					                }
					                ],
					                series: [
					                         {
					                        	 name: "态势级别",
					                        	 type: "line",
					                        	 smooth: true,
					                        	 data: tsdm

					                         },{
					                        	 
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
//	var barChart = echarts.init(document.getElementById("echarts-line-chart1"));
////	var datestart = $('#start').val();
////	var dateend = $('#end').val();
////	var ajbh=$('#ajbh').val();
//	var tssj = [];    //舆情类型
//	var tsdm = [];     
//	$.ajax({
//		type : "post",
//		async : false,    
//		url : "tsfxmtfbAction",    //请求发送到mtfbServlet处
//		data: {
//	            "datestart": datestart,
//	            "dateend": dateend,
//	            "ajbh":ajbh
//	        },
//		dataType : "json",        //返回数据形式为json
//		success : function(data) {
//			//请求成功时执行该函数内容，result即为服务器返回的json对象
//			
//			result = $.parseJSON(data.result);
//			if (result) {
//				for(var i=0;i<result.length;i++){
//					var str = result[i].lx;
//					tssj.push(str.substring(0, 10));    //挨个取出类别并填入类别数组
//				}
//				for(var i=0;i<result.length;i++){       
//					tsdm.push(result[i].tsdm);    //挨个取出销量并填入销量数组
//				}
//				barChart.hideLoading();    //隐藏加载动画
//				barChart.setOption({        //加载数据图表
//					tooltip: {
//						trigger: "axis",
//					},
//					noDataLoadingOption: {
//						 text: '暂无数据',//没有数据时显示的文字
//						effect: 'bubble',//loading效果，此为气泡，还有'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
//						 effectOption: {
//					 backgroundColor: "rgba(50,50,50,0)",//loading的背景
//						},
//						textStyle: {//没有数据时显示的文字的样式
//							fontSize: 32,
//							fontWeight: 'bold'
//						}
//					},
//					toolbox: {
//			            show: true,
//			            feature: {
//			                dataView: {
//			                    show: true,
//			                    readOnly: true
//			                },
//			                restore: {
//			                    show: true
//			                },
//			                saveAsImage: {
//			                    show: true
//			                },
//			                magicType: {
//			                    show: true,
//			                    type: ['line', 'bar']
//			                }
//			            }
//			        },
//					calculable: true,
//					grid: {
//			            borderWidth: 0,
//			            y: 80,
//			            y2: 60
//			        },
//				
//					xAxis: [
//					        {
//					        	type: "category",
//					        	show: true,
//					        	axisLabel: {
//					        		show: true,
//				                    textStyle: {
//				                        color: '#000000'
//				                    }
//					        	},
//					        	splitLine: {
//				                    show: false //去掉网格线
//				                },
//					        	data: lx
//				              
//					        }
//					        ],
//					        yAxis: [
//					                {
//					                	type: "value",
//					                	show: true,
//					                    axisLabel: {
//					                        show: true,
//					                        textStyle: {
//					                            color: '#000000'
//					                        }
//					                    },
//					                	splitLine: {
//					                        show: false //去掉网格线
//					                    }
//					                }
//					                ],
//					         series: [
//					                         {
//					                         	 name: "舆情统计",
//					                        	 type: "bar",
//					                        	 smooth: true,
//					                        	 itemStyle: {
//					                                   normal: {
//					                                     color: function (params) {
//					                                         // build a color map as your need.
//					                                         var colorList = [
//					                                       '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
//					                                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
//					                                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
//					                                     ];
//					                                         return colorList[params.dataIndex];
//					                                     },
//					                                     label: {
//					                                         show: true,
//					                                         position: 'top',
//					                                         formatter: '{b}\n{c}'
//					                                     }
//					                                 }
//					                             },
//				                        	 data:sum
//
//					                         }
//					                         ]
//				});
//		/*		barChart.on('click', function(params) {
//					var day = getDay(-3);
//					  if (params.seriesIndex == 'undefined') {  
//							return;  
//						}
//					  else if(params.componentType == "xAxis"){
//				            switch (params.name) {  
//				            case "微信":      
//
//					            window.open("CkyqtjxqAction?index=1&datestart="+day, "_blank");
//				                     break;  
//				            case "微博":    
//
//					            window.open("ckyqtjAction?index=0&datestart="+day, "_blank");
//				                break;  
//				            case "论坛":    
//
//					            window.open("ckyqtjAction?index=5&datestart="+day, "_blank"); 
//				                break;  
//				            case "网页":    
//
//					            window.open("ckyqtjAction?index=2&datestart="+day, "_blank"); 
//				                break; 
//				            case "客户端":    
//
//					            window.open("ckyqtjAction?index=4&datestart="+day, "_blank"); 
//				                break;
//				            case "报刊":    
//
//					            window.open("ckyqtjAction?index=3&datestart="+day, "_blank"); 
//				                break; 
//				            default:  
//				                break;  
//				        }  
//				           
//				            
//				        }else{
//
//				            switch (params.name) {  
//				            case "微信":      
//
//					            window.open("ckyqtjAction?index=1&datestart="+day, "_blank");
//				                     break;  
//				            case "微博":    
//
//					            window.open("ckyqtjAction?index=0&datestart="+day, "_blank");
//				                break; 
//				            case "网页":    
//
//					            window.open("ckyqtjAction?index=2&datestart="+day, "_blank"); 
//				                break;
//				            case "论坛":    
//
//					            window.open("ckyqtjAction?index=5&datestart="+day, "_blank"); 
//				                break;  
//				            case "客户端":    
//
//					            window.open("ckyqtjAction?index=4&datestart="+day, "_blank"); 
//				                break;  
//				            case "报刊":    
//
//					            window.open("ckyqtjAction?index=3&datestart="+day, "_blank"); 
//				                break; 
//				            default:  
//				                break;  
//				        } 
//				        }
//
//	
//				});*/
//				$(window).resize(barChart.resize);
//			}
//
//		},
//		error : function(errorMsg) {
//			//请求失败时执行该函数
//			alert("图表请求数据失败!");
//			barChart.hideLoading();
//		}
//	});
}

//传播分析情感趋势
//function cbfxqgqs(datestart,dateend,ajbh) {
//	var barChart = echarts.init(document.getElementById("echarts-scatter-chart"));
////	var datestart = $('#start').val();
////	var dateend = $('#end').val();
////	var ajbh=$('#ajbh').val();
//	var tjrq = [];  
//	var fm = []; 
//	var zx = []; 
//	var zm = [];    
//	$.ajax({
//		type : "post",
//		async : false,    
//		url : "getQgqsAction",    //请求发送到mtfbServlet处
//		 data: {
//	            "datestart": datestart,
//	            "dateend": dateend,
//	            "ajbh":ajbh
//	        },
//		dataType : "json",        //返回数据形式为json
//		success : function(data) {
//			//请求成功时执行该函数内容，result即为服务器返回的json对象
//			result = $.parseJSON(data.result);
//			if (result) {
//				for(var i=0;i<result.length;i++){
//					
//					var str = result[i].tjrq;
//					tjrq.push(str.substring(0, 10));    //挨个取出类别并填入类别数组
//					
//				}
//				for(var i=0;i<result.length;i++){       
//					fm.push(result[i].fm);    //挨个取出销量并填入销量数组
//				}
//				for(var i=0;i<result.length;i++){       
//					zx.push(result[i].zx);    //挨个取出销量并填入销量数组
//				}
//				for(var i=0;i<result.length;i++){       
//					zm.push(result[i].zm);    //挨个取出销量并填入销量数组
//				}
//				barChart.hideLoading();    //隐藏加载动画
//				barChart.setOption({
//
//			        tooltip: {
//			            trigger: 'axis'
//			        },
//			        legend: {
//			            orient: "vertical",
//			            x: "left",
//			            data: ['中性','正面','负面']
//			          
//			        },
//			        noDataLoadingOption: {
//			        	text: '暂无数据',//没有数据时显示的文字
//			        	effect: 'bubble',//loading效果，此为气泡，还有'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
//			        	effectOption: {
//			        	backgroundColor: "rgba(50,50,50,0)",//loading的背景
//			        	},
//			        	textStyle: {//没有数据时显示的文字的样式
//			        		fontSize: 32,
//			        		fontWeight: 'bold'
//			        	}
//			        },
//			        toolbox: {
//			            show: true,
//			            feature: {
//
//			                dataView: {
//			                    show: true,
//			                    readOnly: false
//			                },
//			                magicType: {
//			                    show: true,
//			                    type: ['line', 'bar']
//			                },
//			                restore: {
//			                    show: true
//			                },
//			                saveAsImage: {
//			                    show: true
//			                }
//			            }
//			        },
//			        calculable: true,
//			        xAxis: [
//			            {
//			                type: 'category',
//			                boundaryGap: false,
//			                data: tjrq
//			        }
//			    ],
//			        yAxis: [
//			            {
//			                type: 'value'
//			              
//			        }
//			    ],
//			        series: [
//			            {
//			                name: '中性',
//			                type: 'line',
//			                data: zx,
//			                markPoint: {
//			                    data: [
//			                        {
//			                            type: 'max',
//			                            name: '最大值'
//			                        },
//			                        {
//			                            type: 'min',
//			                            name: '最小值'
//			                        }
//			                ]
//			                }
//			        },
//			            {
//			                name: '正面',
//			                type: 'line',
//			                data: zm,
//			                markPoint: {
//			                    data: [
//			                        {
//			                            type: 'max',
//			                            name: '最大值'
//			                        },
//			                        {
//			                            type: 'min',
//			                            name: '最小值'
//			                        }
//			                ]
//			                }
//			        }, {
//			                name: '负面',
//			                type: 'line',
//			                data: fm ,
//			                markPoint: {
//			                    data: [
//			                        {
//			                            type: 'max',
//			                            name: '最大值'
//			                        },
//			                        {
//			                            type: 'min',
//			                            name: '最小值'
//			                        }
//			                ]
//			                }
//			        },
//			    ]
//			    });
//				$(window).resize(barChart.resize);
//			}
//
//		},
//		error : function(errorMsg) {
//			//请求失败时执行该函数
//			alert("图表请求数据失败!");
//			barChart.hideLoading();
//		}
//	});
//
//}

//传播分析情感分布
//function cbfxqgfb(datestart,dateend,ajbh) {
//	var barChart = echarts.init(document.getElementById("echarts-k-chart"));
////	var datestart = $('#start').val();
////	var dateend = $('#end').val();
////	var ajbh=$('#ajbh').val();
//	var qglx = [];    
//	var sum = [];     
//	$.ajax({
//		type : "post",
//		async : false,    
//		url : "getCbfxQgfbAction",    //请求发送到mtfbServlet处
//		 data: {
//	            "datestart": datestart,
//	            "dateend": dateend,
//	            "ajbh":ajbh
//	        },
//		dataType : "json",        //返回数据形式为json
//		success : function(data) {
//			//请求成功时执行该函数内容，result即为服务器返回的json对象
//			result = $.parseJSON(data.result);
//			if (result) {
//				for(var i=0;i<result.length;i++){
//					var str = result[i].qglx;
//				
//					qglx.push(str);    //挨个取出类别并填入类别数组
//				}
//				for(var i=0;i<result.length;i++){       
//					sum.push(result[i].sum);    //挨个取出销量并填入销量数组
//				}
//				barChart.hideLoading();    //隐藏加载动画
//				barChart.setOption({
//			        title: {
//			            subtext: "",
//			            x: "center"
//			        },
//			        tooltip: {
//			            trigger: "item",
//			            formatter: "{a} <br/>{b} : {c} ({d}%)"
//			        },
//			    	noDataLoadingOption: {
//			    		text: '暂无数据',//没有数据时显示的文字
//			    		effect: 'bubble',//loading效果，此为气泡，还有'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
//			    		effectOption: {
//			    			backgroundColor: "rgba(50,50,50,0)",//loading的背景
//			    		},
//			    		textStyle: {//没有数据时显示的文字的样式
//			    			fontSize: 32,
//			    			fontWeight: 'bold'
//			    		}
//			    	},
//			        legend: {
//			            orient: "vertical",
//			            x: "left",
//			            data: qglx
//			          
//			        },
//			        toolbox: {
//			            show: true,
//			            feature: {
//			                dataView: {
//			                    show: true,
//			                    readOnly: true
//			                },
//			                restore: {
//			                    show: true
//			                },
//			                saveAsImage: {
//			                    show: true
//			                }
//			            }
//			        },
//			        color:['orange' ,'red','green'],
//			        calculable: true,
//			        series: [
//			            {
//			                name: "数据",
//			                type: "pie",
//			                radius: "55%",
//			                center: ["50%", "60%"],
//			                data: [
//			                       {
//			                           value: sum[0],
//			                           name: qglx[0]
//			                   },
//			                       {
//			                           value: sum[1],
//			                           name: qglx[1]
//			                   },
//			                       {
//			                           value: sum[2],
//			                           name: qglx[2]
//			                   }
//			               ],
//			                itemStyle: {
//			                    normal: {
//			                        label: {
//			                            show: true,
//			                            formatter: "{b} : {c} ({d}%)"
//			                        }
//			                    }
//			                }
//			        }
//			    ]
//			    });
//				$(window).resize(barChart.resize);
//			}
//
//		},
//		error : function(errorMsg) {
//			//请求失败时执行该函数
//			alert("图表请求数据失败!");
//			barChart.hideLoading();
//		}
//	});
//}

function mymethon() {
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
     var datestart = $('#start').val();
     var dateend = $('#end').val();
     var sjbh=$('#sjbh').val();
     cbfxyqqs(datestart,dateend,sjbh);
   	 cbfxmtfb(datestart,dateend,sjbh);
   	 cbfxqgqs(datestart,dateend,sjbh);
   	 cbfxqgfb(datestart,dateend,sjbh);
    }
}