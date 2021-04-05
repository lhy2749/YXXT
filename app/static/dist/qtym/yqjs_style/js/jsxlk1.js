$('.select').on('click', '.placeholder1', function(e) {
    var parent = $(this).closest('.select');
    if (!parent.hasClass('is-open')) {
        parent.addClass('is-open');
        $('.select.is-open').not(parent).removeClass('is-open');
    } else {
        parent.removeClass('is-open');
    }
    e.stopPropagation();
}).on('click', 'ul>li', function() {
    var parent = $(this).closest('.select');
    parent.removeClass('is-open').find('.placeholder1').text($(this).text());
});
 
$('body').on('click', function() {
    $('.select.is-open').removeClass('is-open');
});