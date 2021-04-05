        $('[name="nice-select"]').click(function (e) {
            $('[name="nice-select"]').find('ul').hide();
            $(this).find('ul').show();
            e.stopPropagation();
        });
        $('[name="nice-select"] li').hover(function (e) {
            $(this).toggleClass('on');
            e.stopPropagation();
        });
        $('[name="nice-select"] li').click(function (e) {
            var val = $(this).text();
            var dataVal = $(this).attr("data-value");
            $(this).parents('[name="nice-select"]').find('input').val(val);
            $('[name="nice-select"] ul').hide();
            e.stopPropagation();
            //alert($(this).parents('[name="nice-select"]').find('input').val());
        });
        $(document).click(function () {
            $('[name="nice-select"] ul').hide();
        });

        $(function () {
            $('select').selectlist({
                zIndex: 10,
                width: 300,
                height: 40
            });
        })
