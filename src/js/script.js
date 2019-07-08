/* 디바이스 분기 */
var body = $("body");
if ($(window).width() < 1024) {
    body.addClass("mobile");
} else {
    body.addClass("pc")
}

/*body.on('orientationchange',function(event){
    if (event.orientation == "landscape") {
        alert("가로");
        return;
    };
}) */


$(window).resize(function(){
    if ($(window).width() < 1024) {
        //body.addClass("mobile")
        body.removeAttr("class").addClass("mobile")
    } else {
        body.removeAttr("class").addClass("pc");
        $("header nav").removeClass("active");
    }    
    $(".imgFull").each(function(e){
        imgFull($(this));
    })
    alwaysCenter($("#pop_mov"), $(".keyVisual"));
});


// 글자 변경
/*function changeText(tagName, changeTxt, newTxt){
    $(tagName+':contains('+changeTxt+')', ).each(function(){
        var text = $(this).text().split(changeTxt);
        //console.log(text);
        var newText = text[0] + newTxt + text[1];
        $(this).text(newText)
    })
}
if (window.location.href.toLowerCase().indexOf("contest") > -1) {
    changeText("p", "팬페스벌", "팬페스티벌");
    changeText("a", "더 피스트 챔피언쉽", "더 피스트 한국 챔피언쉽");
}
if (window.location.href.toLowerCase().indexOf("info") > -1) {
    changeText("li.sat div p", "5일", "5일  ");
    changeText("li.sun div p", "5일", "6일  ");
}*/


/* GNB, SNS scroll event */
var didScroll; 
var lastScrollTop = 0; 
var delta = 5; 
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){ 
    didScroll = true; 
});
setInterval(function() { 
    if (didScroll) { 
        hasScrolled(); 
        didScroll = false; 
    }
}, 250);

function hasScrolled() { 
    var st = $(this).scrollTop(); // Make sure they scroll more than delta 
    if(Math.abs(lastScrollTop - st) <= delta) return; 
 
    if (st > lastScrollTop && st > navbarHeight){ // Scroll Down 
        $(".header_inner").removeClass("fixed");
        if ($(window).scrollTop() + window.innerHeight <= $("#sns").offset().top - 300) {
            //sns 하단 마지노선
            $("#sns .scroll_wrap").addClass("fixed");
        } else {
            $("#sns .scroll_wrap").removeClass("fixed");
        }
    } else { // Scroll Up 
        $("#sns .scroll_wrap").removeClass("fixed");
        if ($(window).scrollTop() <= 400) {
            //gnb 상단 마지노선
            $(".header_inner").removeClass("fixed");
        } else {
            $(".header_inner").addClass("fixed");
        } 
        if(st + $(window).height() < $(document).height()) { 
           //
        } 
    } 
    lastScrollTop = st; 
}

/*
$("html, body").on("mousewheel DOMMouseScroll", function (event) { 
    //console.log(event.originalEvent.wheelDelta); 
    var E = event.originalEvent;
    delta = 0;
    if (E.detail) {
        delta = E.detail * -40;
    }else{
        delta = E.wheelDelta;
    };
    //if (event.originalEvent.wheelDelta == 120) {
    if (delta > 0) {
        //휠을 위로 올렸을 때
        $("#sns .scroll_wrap").removeClass("fixed");
        if ($(window).scrollTop() <= 400) {
            //gnb 상단 마지노선
            $(".header_inner").removeClass("fixed");
        } else {
            $(".header_inner").addClass("fixed");
        }        
    } else {
        $(".header_inner").removeClass("fixed");
        if ($(window).scrollTop() + window.innerHeight <= $("#sns").offset().top - 300) {
            //sns 하단 마지노선
            $("#sns .scroll_wrap").addClass("fixed");
        } else {
            $("#sns .scroll_wrap").removeClass("fixed");
        }
    }
});
*/
$(".scroll_fixed").each(function(){
    //console.log($(this));
    $(this).css({"height": $(this).children(".scroll_wrap").innerHeight()});
});


/* mobile GNB */
var nav = body.find("nav");
nav.find(".open").on("click", function(e){
    e.preventDefault();
    nav.addClass("active")
})
nav.find(".close").on("click", function(e){
    e.preventDefault();
    nav.removeClass("active")
});


/* 페이지별 title/description */
var pageTitle = $("header").attr("class");
var msg = {
    "news" : [
       {
        "title" : "NEWS",
        "desc1" : "에오르제아의 모험가를 모시는 이 곳,",
        "desc2" : "행사와 관련된 각종 정보들을 확인해보세요."
       }
    ],
    "info" : [
        {
            "title" : "INFO",
            "desc1" : "에오르제아의 모험가를 모시는 이 곳,",
            "desc2" : "행사와 관련된 각종 정보들을 확인해보세요."
        }
     ],
     "ticket" : [
        {
            "title" : "TICKET",
            "desc1" : "에오르제아의 모험가를 모시는 이 곳,",
            "desc2" : "팬페스티벌로 오시는 방법을 안내해 드립니다."
        }
     ],
     "stage" : [
        {
            "title" : "STAGE",
            "desc1" : "Description1",
            "desc2" : "Description2"
        }
     ],
     "floor" : [
        {
            "title" : "FLOOR",
            "desc1" : "Description1",
            "desc2" : "Description2"
        }
     ],
     "goods" : [
        {
            "title" : "GOODS",
            "desc1" : "Description1",
            "desc2" : "Description2"
        }
     ],
     "contest" : [
        {
            "title" : "CONTEST",
            "desc1" : "에오르제아의 모험가를 모시는 이 곳,",
            "desc2" : "지금 파이널판타지14의 주인공은 당신입니다."
        }
     ],
     "memorial" : [
        {
            "title" : "MEMORIAL",
            "desc1" : "Description1",
            "desc2" : "Description2"
        }
     ]
}
console.log(msg[pageTitle])
if (msg[pageTitle] !== undefined) {
    $(".keyVisual dt").text(msg[pageTitle][0].title);
    $(".keyVisual dd p").eq(0).text(msg[pageTitle][0].desc1);
    $(".keyVisual dd p").eq(1).text(msg[pageTitle][0].desc2);
}

/* 이용안내 넘버링 */
$("dl.guide.number p").each(function(e){
    //console.log("e:" +e);
    //console.log("index:" +$(this).index());
    $(this).prepend("<span>"+ ($(this).index()+1) +". </span>")
})

/* 더피스트 주의사항 넘버링 */
$("dd.number2 li").each(function(e){
    $(this).prepend("<span>"+ ($(this).index()+1) +") </span>")
})

/* main */
var keyVisual = $("header.main .keyVisual");
var bgMovie = keyVisual.find("iframe");
var bgSlider = bgMovie.parent(".swiper-slide-active");
keyVisual.css({
    "margin-top": $("header .top").height() + $("header .scroll_fixed").height() * -1
});


/* main 동영상보기 팝업 */
function alwaysCenter($this, $target) {
    //if ($("body").hasClass("pc")) {
    var thisWidth = $this.width(),
        thisHeight = $this.height(),
        windowWidth = $target.width(),
        windowHeight = $target.height();

    $this.css({
        left: (windowWidth - thisWidth) / 2,
        top: (windowHeight - thisHeight) / 2
    })
    //}
}
$(".keyVisual .movie").on("click", function(e){
    e.preventDefault();
    $(".dimmed").removeClass("hidden");
    $("#pop_mov").removeClass("hidden");
    $("#pop_mov .close").removeClass("hidden");
    alwaysCenter($("#pop_mov"), $(".keyVisual"))
    
    /*if ($("body").hasClass("mobile")) {
        window.open($("#pop_mov iframe").attr("src"))
    } else {
        $(".dimmed").removeClass("hidden");
        $("#pop_mov").removeClass("hidden");
        $("#pop_mov .close").removeClass("hidden");
        alwaysCenter($("#pop_mov"), $(".keyVisual"))
    }*/
});
$(".keyVisual .close").on("click", function(e){
    e.preventDefault();
    $(".dimmed").addClass("hidden");
    $("#pop_mov").addClass("hidden");
    $("#pop_mov .close").addClass("hidden");
});



/* YouTube Background */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var ytId = $("#player").data("ytId");
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: ytId,
    playerVars: {
      'controls': 0,
      'showinfo': 0,
      'rel': 0,
      'wmode': "opaque"
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
function onPlayerReady(event) {
  event.target.getPlaybackQuality('default');
  event.target.mute();
  event.target.playVideo();
}
function onPlayerStateChange(event) {
  if (event.data === 0) {
    event.target.loadVideoById(ytId);
  }
}
// YouTube Background Resize
function ytResize() {
    var x_percent = $(".swiper-wrapper").width() / 1280,
        y_percent = $(".swiper-wrapper").height() / 720;
    var x_num = parseInt((1280 * y_percent)),
        y_num = parseInt((720 * y_percent));
    if (x_num >= $(window).width()) {
        $(".yt_box").css({"width" : x_num, "height" : y_num, "marginLeft" : x_num/-2 + "px", "marginTop" : y_num/-2 + "px"});
    } else {
        var x_num2 = parseInt(1280 * x_percent);
        var y_num2 = parseInt(720 * x_percent);
        $(".yt_box").css({"width" : x_num2, "height" : y_num2, "marginLeft" : x_num2/-2 + "px", "marginTop" : y_num2/-2 + "px"});
    }
}

ytResize();

$(window).on("resize", throttle(function(event) {
    ytResize();
}, 100));
function throttle(fn, threshhold, scope) {
  if(!threshhold) {
    threshhold = 276;
  }
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


/* image background */
function imgFull(target){
    var bgImg = target;
    var bgWrap = bgImg.parent(".bg_wrap");
    var x_percent = bgWrap.width() / 1280,
        y_percent = bgWrap.height() / 720;
    var x_num = parseInt((1280 * y_percent)),
        y_num = parseInt((720 * y_percent));
    if (x_num >= bgWrap.width()) {
        bgImg.css({"width" : x_num, "height" : y_num, "marginLeft" : x_num/-2 + "px", "marginTop" : y_num/-2 + "px"});
    } else {
        var x_num2 = parseInt(1280 * x_percent);
        var y_num2 = parseInt(720 * x_percent);
        bgImg.css({"width" : x_num2, "height" : y_num2, "marginLeft" : x_num2/-2 + "px", "marginTop" : y_num2/-2 + "px"});
    }
}
$(".imgFull").each(function(e){
    imgFull($(this));
})



/* 새소식 내 이미지 사이즈 조절 
$(".list_news li a img").each(function(e){
    var thisWidth = $(this).width();
    var thisHeight = $(this).height();
    if (thisWidth > thisHeight) {
        $(this).addClass("landscape")
    } else {
        $(this).addClass("portrait")
    }
})*/


// swiper 내 텍스트 padding
var slideTextWrap = $(".slide_text_wrap");
slideTextWrap.css({
    paddingTop: (slideTextWrap.parent(".swiper-slide").height() - slideTextWrap.children(".slide_text").innerHeight()) / 2
})


/* accodion toggle */
var accodion = $("#accodion");
accodion.on("click", function(e){
    console.log(e.originalEvent);
    //if (body.hasClass("pc")) return;
    var $this = $(this);
    if ($(this).data("open") === false) {
        //console.log("click")
        $($this.data("target")).removeClass("hidden");
        $this.data("open", true);
        $this.find(".title").addClass("active");
    } else {
        $($this.data("target")).addClass("hidden");
        $this.data("open", false);
        $this.find(".title").removeClass("active");
    }
});
/*
accodion.on("mouseenter", function(e){
    if (body.hasClass("mobile")) return;
    $($(this).data("target")).removeClass("hidden");
    $(this).data("open", true);
});
$(".sub_nav").on("mouseleave", function(e){
    if (body.hasClass("mobile")) return;
    $(accodion.data("target")).addClass("hidden");
    accodion.data("open", false);
});
*/


/* 더 보기 
$(".more a").on("click", function(e){
    e.preventDefault();
    $(".board").removeClass("hidden3");
});*/


/* scroll Top */
$(".go_top").on("click", function(e){
    e.preventDefault();
    body.stop().animate({
        scrollTop:0
    }, 400, 'easeInQuart')
})


/* SNS og */
$('meta[property="og:url"]').attr('content', window.location.href);
$('meta[property="og:description"]').attr('content', $(".keyVisual dt").text());
//$('meta[property="og:image"]').attr('content', 이미지 경로 넣기);


/* SNS */
$("#sns a").on("click", function(e){
    e.preventDefault();
    var url = window.location.href;
    //var url = "http://pub.actoz.com/ff14/fanfest/2019/html/main/index.html";
    var title = $('meta[property="og:title"]').attr('content').toUpperCase();

    switch ($(this).attr("id")) {
        case "facebook":
            window.open("http://www.facebook.com/sharer/sharer.php?u="+url);
            break;
        case "twitter":
            window.open("https://twitter.com/intent/tweet?text="+ title +"&url="+ url)
            break;
        /*case "kakao":
            //
            break;
        case "share":
            //
            break;*/
        default:
            //
    }
})


/* D-day 
var now = new Date();
var end = new Date("october 05, 2019"); // 크리스마스 
var gap = end.getTime() - now.getTime();
gap = Math.floor(gap / (1000 * 60 * 60 * 24));
if (gap > 0) {  // dday 이전
    $(".dday .count").text("-" + gap);
} else {
    $(".dday .count").text("+" + gap*-1);
}*/


/* 오늘 하루 보지 않기 */
//00시 기준
var notOpen = "notOpen1day";
function setCookieAt00( name, value, expiredays ) {   
    var todayDate = new Date();   
    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
    if ( todayDate > new Date() )  
    {  
    expiredays = expiredays -1;  
    }  
    todayDate.setDate( todayDate.getDate() + expiredays );   
     document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
}
function getCookie(name) {  
    name += "=";
    var arr = decodeURIComponent(document.cookie).split(';');
    for (var i = 0; i < arr.length; i++) {
      var c = arr[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return ""; 
}
if (getCookie(notOpen) === "") {
    $("section.top").removeClass("hidden");
}
$("section.top .close").on("click", function(e){
    e.preventDefault();
    setCookieAt00(notOpen, "cookie set", 1);
    $("section.top").addClass("hidden");
})


/* 2depth 클릭시 스크롤 이동 */
$(".scroll_Menu a").on("click", function(e){
    var target = $(this).data("target");
    if (target && $(this).attr("href") == "#") {
        e.preventDefault();
        
        body.stop().animate({
            scrollTop: $(target).offset().top - 20
        }, 400, 'easeInQuart');
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");

    }
})


/* FAQ */
$('.tit').click(function(){
    $('.tit, .ans').removeClass('active');
    $(this).addClass('active');
    $(this).next('.ans').addClass('active');
});