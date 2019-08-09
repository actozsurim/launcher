// modal position
function modalCenter() {
    var modal = $(".modal");
    var w_width = $(window).width();
    var w_height = $(window).height();
    console.log(w_width, w_height)
    for(var i=0; i<modal.length; i++) {
        var m_width = modal.eq(i).width();
        var m_height = modal.eq(i).height();
        //console.log(m_width, m_height)
        modal.eq(i).css({
            left: (w_width - m_width)/2,
            top: (w_height - m_height)/2
        });
    }
}
// resizing할 요소들
function resizing() {
    //lnb 높이
    $("#lnb, #content").css({
        //height: $(window).height() - $(".top_bar").height()
    });
    //blocks 높이
    /*$("#blocks").css({
        height: $("#content").height()
    });*/

}
// toast popup
var toast;
var toastLength;
//setTimeout(toastOpen, 2000);
function toastOpen() { //toast open
    toast = $("#toast li");
    toastLength = toast.length;
    toast.parents("#toast").css({right: 15});
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
    toast = $("#toast li");
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
$(window).on("load", () => {
    //scrollbar, masonry
    $(".scroll-js-horizon").mCustomScrollbar({theme:"default", axis:"x"});
    $(".scroll-js").mCustomScrollbar({theme:"default", axis:"y"});
    $("#content-blocks").masonry({
        itemSelector : ".block", 
        columnWidth : 488,
        horizontalOrder: true
    });
});
$("document").ready(() => {
    // LNB 펼치기/접기
    var lnb = $("#lnb");
    var btnFold = $(".btn_fold");
    var sns = $(".sns_wrap");
    sns.css({
        width: $("#lnb").width()
    });
    btnFold.on("click", () => {
        if (lnb.hasClass("fold")) { 
            sns.animate({width: 265}, 200, "easeOutQuint");       
            lnb.animate({width: 265}, 200, "easeOutQuint", function(){
                lnb.removeClass("fold");
            });
            btnFold.removeClass("on");
        } else {
            sns.animate({width: 130}, 200, "easeOutQuint");
            lnb.animate({width: 130}, 200, "easeOutQuint", function(){
            }).addClass("fold");
            btnFold.addClass("on");
        }
    });

    // LNB내 PC방 혜택 아코디언
    var foldPc = $("#foldPc");
    var follWrap = foldPc.closest("#lnb .list.pc");
    var pcAccodian = $("#pcAccodian");
    pcAccodian.on("click", () => {
        if (follWrap.hasClass("fold")) {
            follWrap.removeClass("fold");
            foldPc.siblings().animate({height: foldPc.height(), martinTop: 4}, 200, "easeOutCubic");
        } else {
            follWrap.addClass("fold");
            foldPc.siblings().animate({height: 0, martinTop: 0}, 200, "easeOutCubic");
        }
    });

    // toast close
    $("#toast .close").on("click", (e) => {
        //console.log(e.target)
        $(e.target).closest("li").hide();
    });

    // modal
    modalCenter();

    // resizing
    resizing();

    //copyright
    var dateGet = new Date();
    $(".copyright .years").text(dateGet.getFullYear());

    //home
    $(".home").on("click", (e) => {
        e.preventDefault();
        $("#blocks .mCSB_container").animate({
            top: 0
        }, 600, "easeOutCubic");
        $("#blocks .mCSB_dragger").animate({
            top: 0
        }, 300, "easeOutCubic");
    })
});



$(window).resize(() => {
    modalCenter();
    resizing();
});