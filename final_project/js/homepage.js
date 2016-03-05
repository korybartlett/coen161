//jQuery for the Home Page

$( document ).ready(function() {

    setVideotoWindowSize();

    //initialize to the current viewport
    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.opacityFilter');
    initBannerVideoSize('.video-container video');

    //resize event handler
    $(window).on('resize', function() {
        setVideotoWindowSize();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.opacityFilter');
        scaleBannerVideoSize('.video-container video');
    });

});

//Function to find the height of the ViewPort and then set that accordingly in CSS 
function setVideotoWindowSize() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.mainVideo').css('height',unitHeight);

}

//Initialize the height and width to the poster img, filter, and video
function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

//Scale the height and width on resize
//external resource used to help with this funciton
function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.video-container video').addClass('fadeIn animated');

    });
}