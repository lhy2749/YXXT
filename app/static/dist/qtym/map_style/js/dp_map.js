$(document).ready(function () {
	var myChart = echarts.init(document.getElementById('map'));
	var dtdm = $('#dtdm').val();
	var xqdm = dtdm.substr(2,2);
	var xqdm1 = dtdm.substr(0,4);
	var test1= xqdm1 + "00";
	var mapStack = [];
	var curMap = {};
	var nameList = loadMap(test1);//省份代码
	myChart.on('mapselectchanged', function (params) {
		var mapCode ;
		var name = params.batch[0].name;
		if (xqdm!="00"){
			$.ajax({
				url:"citycodeAction",
				async : false,
				data:"zsdm="+test1,
				dataType:"json",
				type:"post",
				success:function(data){
					result = $.parseJSON(data.coderesult);
					cityMap = result;
				}
			});
			for (var i=0;i<cityMap.length;i++){
				var cityCode = cityMap[i];
				var cityName = cityCode["name"];
				if (name == cityName){
					mapCode = cityCode["code"];
				}
			};
		}else{
			mapCode = cityMap[name];
		}
		var num;
		num = nameList.indexOf(name);
		if(num > -1){
			var timeSort = "0"
			var signA = connectA(name,mapCode,timeSort);
			if (signA == true){
				clickA();
			}
		}else{
			layer.msg('该地区没有舆情信息',{
				icon : 2,
				time : 1500,
				anim: 6

			});
		};

//	loadMap(mapCode, name);
		//将上一级地图信息压入mapStack
		mapStack.push({
			mapCode: curMap.mapCode,
			mapName: curMap.mapName
		});
	});

	/**
	 绑定右键事件
	 */
	myChart.on('contextmenu', function (params) {
		$('#contextMenu').css({
			left: params.event.offsetX,
			top: params.event.offsetY
		}).show();
	});
	/**
	 响应图表的右键事件，返回上一级地图
	 */
	$('#contextMenu').on('click', function () {
		$(this).hide();
		//获取上一级地图信息
		var map = mapStack.pop();
		if (!mapStack.length && !map) {
			alert('已经到达最上一级地图了');
			return;
		};
//	loadMap(map.mapCode, map.mapName);
	});
	function loadMap(mapCode,mapName) {
		var sum = [];
		var nameList= [];
		var  datum=[];
		$.ajax({
			type : "post",
			async : false,
			url : "mapAction",
			dataType : "json",
			success : function(data) {
				mapresult = $.parseJSON(data.message);
			}
		});
		$.getJSON('./dist/qtym/map_style/js/china-main-city/' + mapCode + '.json', function (data) {
			if (data) {
				echarts.registerMap(mapName, data);
				for(var i=0;i<mapresult.length;i++){
					str = mapresult[i].name;
					datum.push({name: str,value: mapresult[i].total});
					sum.push(mapresult[i].total);
					nameList.push(mapresult[i].name);
				}
				var max = Math.max.apply(null,sum);
				var min = Math.min.apply(null,sum);
				var option = {
					title : {
						text: '舆情分布图',
						x:'center'
					},
					tooltip: {
						trigger: 'item',
					},
					dataRange: {
						min: min,
						max: max,
						x: 'left',
						y: 'bottom',
						text:['高','低'],           // 文本，默认为数值文本
						calculable : true,
//						        hoverLink: true,
						color: ['#C1232B', '#D7504B','#FE8463','#F0805A', '#E87C25', '#F3A43B', '#F4E001','#FCCE10','#FAD860','#B5C334', '#9BCA63', '#C6E579', '#27727B', '#60C0DD', '#26C0C0'],
					},

					toolbox: {
						show: true,
						orient : 'horizontal',
						x: 'right',
						y: 'top',
						borderColor: '#ccc',       // 工具箱边框颜色
						feature : {
							mark : {show: true},
							myTool2: {
								show: true,
								title: '柱状图',
								icon: 'image://http://echarts.baidu.com/images/favicon.png',
								onclick: function (){
									myChart.clear();
									var option2 = {
										title: {
											text: '柱状图显示'
										},
										tooltip: {
											trigger: 'axis',
											axisPointer: {
												type: 'shadow'
											}
										},
										grid: {
											left: '3%',
											right: '4%',
											bottom: '3%',
											containLabel: true
										},
										dataRange: {
											min: min,
											max: max,
											x: 'left',
											y: 'bottom',
//								        selectedMode:'flase',
											text:['高','低'],           // 文本，默认为数值文本
//								        calculable : true,
											dimension: 0,
											color: ['#C1232B', '#D7504B','#FE8463','#F0805A', '#E87C25', '#F3A43B', '#F4E001','#FCCE10','#FAD860','#B5C334', '#9BCA63', '#C6E579', '#27727B', '#60C0DD', '#26C0C0']
										},
										toolbox: {
											show: true,
											orient : 'horizontal',
											x: 'right',
											y: 'top',
											borderColor: '#ccc',
											feature : {
												mark : {show: true},
												myTool2: {show: true,
													title: '地图',
													icon: 'image://http://echarts.baidu.com/images/favicon.png',
													onclick:function(){
														myChart.clear();
														myChart.setOption(option);
													},
												},
												restore : {show: true},
												saveAsImage : {show: true},
											}
										},
										legend: {
											data:['数量']
										},
										yAxis: {
											type: 'category',
											axisTick: {show: false},
											data: nameList
										},
										xAxis: {
											type: 'value',
											boundaryGap: [0, 0.01]
										},
										calculable : true,
										series: [{
											name: '舆情数量',
											type: 'bar',
											data: sum
										}]
									};
									myChart.setOption(option2);
								}
							},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					series: [{
						name: '舆情总量',
						type: 'map',
						mapType: mapName,
						roam: false,
						selectedMode: 'single',
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						data:datum,
					}
					]

				};
				myChart.setOption(option);
				$(window).resize(myChart.resize);
				curMap = {
					mapCode: mapCode,
					mapName: mapName,
				};
			} else {
				alert('无法加载该地图');
			};
		});
		return nameList;
	};

});



function connectA(name,mapCode,timeSort){
	var JumpRegion = '<a href="regionalAction?mapCode='+mapCode+'&timeSort='+timeSort+'" id="JumpRegion" style="dispaly:block;" target="blank"> </a>';
	$( 'body' ).append( JumpRegion );
	return true;
};


function clickA(){
	document.getElementById("JumpRegion").click();
	$("#JumpRegion").remove();
};



