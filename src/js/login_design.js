//launcher_login
$(function(){
    
    //데이터센터 선택
    $('.dc_select').click(function(){
        $('.dc_txt').toggle();
        $(this).find('i').toggleClass('on');
    });

    //데이터센터 선택 후 텍스트 값 가져오기
    var select_c = $('.dc_txt li');
    select_c.click(function(){
        var select_c_name = $(this).find('span').text();
        $('.dc_tit').text(select_c_name);
    });

///////////////////// 수정 190808
    //채널 선택 시
    var divLogobox = $('div.logoBox');
    $('.logoBox').click(function(){
        divLogobox.children('span').removeClass('ac na nx ka');
        divLogobox.children('span').addClass('none').html('채널링 계정을 선택해주세요');
        $('.ch_select i').addClass('on');
        $('.ch_sBox, .dim').show();
    });
    
    //채널선택 시 상단 채널로고 변경
    var select_ch = $('.ch_sBox li');
    select_ch.click(function(){
        var select_ch_name = $(this).find('a').html();
        $('.ch_select div').html(select_ch_name);
        $('.ch_select i').removeClass('on');
        $('.ch_sBox, .dim').hide();
    });
///////////////////// 수정 190808

    //채널링 tab
    $('.ch01').show();
    $('.ch_sBox ul > li a').on('click', function(){
        index = $(this).parent().index() + 1;
        $('.ch_sBox ul > li a').each(function(){
            $('.ch_sBox ul li').css('display:none');
        });
        $(this).parent().css('display:block');
        $('.loginArea > div').addClass('hidden');
        $('.ch0' + index).removeClass('hidden');
    });

    //확인 후 U-OTP 페이지로 이동 (layer st)
    $('.actozArea .btn_login').click(function(){
        $('.actozArea .cont1').hide();
        $('.actozArea .cont2').show();
    });
    $('.naverArea .btn_login').click(function(){
        $('.naverArea .cont1').hide();
        $('.naverArea .cont2').show();
    });

});