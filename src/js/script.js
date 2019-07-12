// LNB 펼치기/접기
var lnb = $("#lnb");
var btnFold = $(".btn_fold");
btnFold.on("click", () => {
    if (lnb.hasClass("fold")) {        
        lnb.animate({width: 265}, 200, function(){
            //$("#content").animate({width: $("#launcher_wrap").width() - $("#lnb").width()})
            lnb.removeClass("fold");
        });
        btnFold.removeClass("on");
    } else {
        lnb.animate({width: 130}, 200, function(){
            //$("#content").animate({width: $("#launcher_wrap").width() - $("#lnb").width()})
        }).addClass("fold");
        btnFold.addClass("on");
        
    }
});


				
$(".scroll-js").mCustomScrollbar({theme:"light-2"});


// LNB내 PC방 혜택 아코디언
var foldPc = $("#foldPc");
var follWrap = foldPc.closest("ul");
foldPc.on("click", () => {
    if (follWrap.hasClass("fold")) {
        follWrap.removeClass("fold");
        foldPc.siblings().animate({height: foldPc.height(), martinTop: 4}, 200, );
    } else {
        follWrap.addClass("fold");
        foldPc.siblings().animate({height: 0, martinTop: 0}, 200);
    }
})

$(window).resize(function(){
});