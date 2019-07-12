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

    //채널 선택 시
    // $('.login.dc .ch_sBox').remove();
    $('.logoBox').click(function(){
        $('.ch_select i').toggleClass('on');
        $('.ch_sBox').toggle();
        $('.dim').toggle();
    });
    
    //채널선택 시 상단 채널로고 변경
    var select_ch = $('.ch_sBox li');
    select_ch.click(function(){
        var select_ch_name = $(this).find('a').html();
        $('.ch_select div').html(select_ch_name);
    });

    //채널링 tab
    $('.ch01').show();
    $('.ch_sBox ul > li a').on('click', function(){
        index = $(this).parent().index() + 1;
        $('.ch_sBox ul > li a').each(function(){
            $('.ch_sBox ul li').css('display:none');
        });
        $(this).parent().css('display:block');
        $('.loginArea > div').hide();
        $('.ch0' + index).show();
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