$(window).on("load", () => {
    //scrollbar, masonry
    $(".scroll-js-horizon").mCustomScrollbar({theme:"default", axis:"x"});
    $(".scroll-js").mCustomScrollbar({theme:"default", axis:"y"});
    $("#content-blocks").masonry({
        itemSelector : ".block", 
        columnWidth : 488
    });
});
$("document").ready(() => {
    // LNB 펼치기/접기
    var lnb = $("#lnb");
    var btnFold = $(".btn_fold");
    btnFold.on("click", () => {
        if (lnb.hasClass("fold")) {        
            lnb.animate({width: 265}, 200, "easeOutQuint", function(){
                lnb.removeClass("fold");
            });
            btnFold.removeClass("on");
        } else {
            lnb.animate({width: 130}, 200, "easeOutQuint", function(){
            }).addClass("fold");
            btnFold.addClass("on");
        }
    });

    // LNB내 PC방 혜택 아코디언
    var foldPc = $("#foldPc");
    var follWrap = foldPc.closest("ul");
    foldPc.on("click", () => {
        if (follWrap.hasClass("fold")) {
            follWrap.removeClass("fold");
            foldPc.siblings().animate({height: foldPc.height(), martinTop: 4}, 200, "easeOutCubic");
        } else {
            follWrap.addClass("fold");
            foldPc.siblings().animate({height: 0, martinTop: 0}, 200, "easeOutCubic");
        }
    });

    //blocks 높이
    $("#blocks").css({
        height: $("#content").height() - ($(".progress_wrap").innerHeight() + 10)
    });

    // toast popup
    var toast = $("#toast li");
    var toastLength = toast.length;

    setTimeout(toastOpen, 2000);
    function toastOpen() { //toast open
        var toastAction = setInterval(function(){ 
            toastLength -= 1; 
            console.log(toastLength)
            toast.eq(toastLength).animate({
                top: 0,
                opacity: 1
            }, 400, "easeOutBack");      
            if (toastLength <= 0) {
                clearInterval(toastAction);
                setTimeout(toastRemove, 15000);
            }
        }, 300)
    };
    function toastRemove() { //toast remove
        toastLength = toast.length;
        var toastAction = setInterval(function(){ 
            toastLength -= 1;    
            console.log(toastLength)
            toast.eq(toastLength).animate({
                right: -400,
                opacity: 0
            }, 600, "easeOutQuart");   
            if (toastLength <= 0) {
                clearInterval(toastAction);
                $("#toast").fadeOut();
            }
        }, 100);        
    };
    $("#toast .close").on("click", (e) => {
        //console.log(e.target)
        $(e.target).closest("li").hide();
    });

    //copyright
    var dateGet = new Date();
    $(".copyright .years").text(dateGet.getFullYear());

    //home
    $(".home").on("click", (e) => {
        e.preventDefault();
        $("#mCSB_1_container").animate({
            top: 0
        }, 600, "easeOutCubic");
        $("#mCSB_1_dragger_vertical").animate({
            top: 0
        }, 300, "easeOutCubic");
    })
});



$(window).resize(() => {
});