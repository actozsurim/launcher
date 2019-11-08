// modal position
function modalCenter() {
    var modal = $(".modal");
    var w_width = $(window).width();
    var w_height = $(window).height();
    //console.log(w_width, w_height)
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
}

// toast popup
var toast;
var toastLength;
//setTimeout(toastOpen, 2000);
function toastOpen() { //toast open
    toast = $("#toast li");
    toastLength = toast.length;
    //toast.parents("#toast").css({right: 15});
        $("#toast").css({
            display: 'block',
            right: 15
        });
        toast.css({
            right: 0,
            top: 300,
            opacity: 1
        });
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
function callToast(){
    setTimeout(toastOpen, 1000);
}

// 팝업 내 동영상 멈추기
function stopVideo(_modal) {
    //var div = e.target.closest(".modal");
    console.log(_modal)
    var div = _modal;
    var iframee = div.getElementsByTagName("iframe")[0].contentWindow;
    iframee.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
}

//창 최대화/최소화 toggle
function toggle_maximum(_this){
    var $this = $(_this);
    if ($this.hasClass("type2")) {
        $this.removeClass("type2")
    } else {
        $this.addClass("type2")
    }
}

// window load 후
function afterLoad() {
    $("#content-blocks").masonry({
        itemSelector : ".block", 
        columnWidth : 488,
        horizontalOrder: true,
        isFitWidth: true,
        stagger: 45,
        transitionDuration: '0.3s',
        setLeft: 0
    });
}

$("document").ready(function(){
    //scrollbar, masonry
    $(".scroll-js-horizon").mCustomScrollbar({theme:"default", axis:"x"});
    $(".scroll-js").mCustomScrollbar({theme:"default", axis:"y"});
    $("#content-blocks").masonry({
        itemSelector : ".block", 
        columnWidth : 488,
        horizontalOrder: true,
        isFitWidth: true,
        stagger: 30,
        transitionDuration: '0.3s'
    });
    modalCenter();

    // LNB 펼치기/접기
    var lnb = $("#lnb");
    var btnFold = $(".btn_fold");
    var sns = $(".sns_wrap");
    btnFold.on("click", function(){
        if (lnb.hasClass("fold")) { 
            //sns.animate({width: 265}, 200, "easeOutQuint");       
            lnb.animate({width: 265}, 200, "easeOutQuint", function(){
                lnb.removeClass("fold");
            });
            btnFold.removeClass("on");
        } else {
            //sns.animate({width: 130}, 200, "easeOutQuint");
            lnb.animate({width: 130}, 200, "easeOutQuint", function(){
            }).addClass("fold");
            btnFold.addClass("on");
        }
    });

    // LNB내 PC방 혜택 아코디언
    var foldPc = $("#foldPc");
    var follWrap = foldPc.closest("#lnb .list.pc");
    var pcAccodian = $("#pcAccodian");
    pcAccodian.on("click", function(){
        if (follWrap.hasClass("fold")) {
            follWrap.removeClass("fold");
            foldPc.siblings().animate({height: foldPc.height(), martinTop: 4}, 200, "easeOutCubic");
        } else {
            follWrap.addClass("fold");
            foldPc.siblings().animate({height: 0, martinTop: 0}, 200, "easeOutCubic");
        }
    });

    // toast close
    $("#toast .close").on("click", function(e){
        //console.log(e.target)
        $(e.target).closest("li").hide();
    });

    // modal 제어
    $(".modalController").on("click", function(e){
        var $this = $(e.target).closest(".modalController");
        console.log($this, openTarget)
        var openTarget = $this.attr("modal-target");
        var closeTarget = $this.closest(".modal");
        if ($this.attr("modal-control") == "open") {
            modalCenter();
            $(".dimmed").fadeIn();
            $(openTarget).fadeIn();
        } else if ($this.attr("modal-control") == "close") {
            $(".dimmed").fadeOut();
            $(closeTarget).fadeOut();
        } else if ($this.attr("modal-control") == "call") {
            $(closeTarget).fadeOut();
            modalCenter();
            $(openTarget).fadeIn();
        }
        var _modal = e.target.closest(".modal");
        if ($(_modal).find("iframe").length > 0) {
            stopVideo(_modal);
        }
    });

    //copyright
    var dateGet = new Date();
    $(".copyright .years").text(dateGet.getFullYear());

    //home
    $(".home").on("click", function(e){
        e.preventDefault();
        $("#blocks .mCSB_container").animate({
            top: 0
        }, 600, "easeOutCubic");
        $("#blocks .mCSB_dragger").animate({
            top: 0
        }, 300, "easeOutCubic");
    });
    
    //설정 탭
    $('.tab li').on('click', function(){
        index = $(this).index() + 1;
        $('#set-type > div').each(function(){
            $('.tab li').removeClass('on');
        });
        $(this).addClass('on');
        $('#set-type > div').addClass('hidden');
        $('.set' + index).removeClass('hidden');
    });

    //화면모드설정
    var sel_txt = $('.select-box span, .select-box ul');
    sel_txt.click(function(){
        console.log(sel_txt);
        $('i').toggleClass('on');
        $('.select-box ul').toggle();
    });
    sel_txt.find('button').click(function(e){
        var $this = $(e.target);
        $this.parents('li').addClass('on');
        $this.parents('li').siblings().removeClass('on');
        $('.select-box span').text($this.text());
    });

    // resizing
    //resizing();
});


$(window).resize(function(){
    modalCenter();
    // 무료체험 텍스트 좌표
    setTimeout(function() {
        $(".trial").css({
            width: $("#content-blocks").width()
        });
    }, 200);
});