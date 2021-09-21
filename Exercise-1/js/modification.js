var $ = jQuery.noConflict();
$(document).ready(function(){
    setTimeout(function(){
        $('.more-info').click(function(){
            if($(this).siblings('#information').hasClass('hidden')){
                $(this).siblings('#information').removeClass('hidden');
                $(this).text('Hide information');
            } else{
                $(this).siblings('#information').addClass('hidden');
                $(this).text('More information');
            }
        })
    },500)
});