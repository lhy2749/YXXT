
    $(document).ready(function(e) {
        $(".select1").uedSelect({
            width: 345
        });
        $(".select2").uedSelect({
            width: 167
        });
        $(".select3").uedSelect({
            width: 100
        });
        $(".select4").uedSelect({
            width: 100
        });
        $(".select5").uedSelect({
            width: 100
        });
    });


  		function test(index){
  			$(".itab ul li a").eq(index+1).addClass("selected").siblings();		
  		}

   
    