 function leave(){
    $(".tipsClass").remove();
 };
function over(content){
	var text=getMousePos(event);
	var top = text[1] + "px";
	var left = text[0] +"px";
	var maxWidth = "200px";
	var time = "5000";
	dispaly(content,top,left,maxWidth,time);
//	if(content !== undefined){
//		dispaly(content.innerHTML);	
//	}
};

function test(index){
	$(".itab ul li a").eq(index+1).addClass("selected").siblings();	
};

function dispaly(content,top,left, maxWidth,time){
	var tipsDiv = '<div class="tipsClass">' + content + '</div>';
	$( 'body' ).append( tipsDiv );
	$(".tipsClass").css({
	    'max-width':maxWidth,
	    'top'       :  top,
	    'left'      : left,
	    'position'  : 'fixed',
	    'padding'   : '3px 5px',
	    'background': 'black',
	    'font-size' : 14 + 'px',
	    'text-align': 'center',
	    'margin'    : '0 auto',
	    'text-align': 'center',
	    // 'width'     : '350px',
	    // 'height'    : '3rem',
	    'border-radius': '10px',
	    'color'     : '#fff',
	    'z-index'     : '999',
	    'opacity'   : '0.6'
	}).fadeToggle(time);
};

 function getMousePos(event) {
     var x = event.clientX;
     var y = event.clientY;
     return [x,y];
 };
 
