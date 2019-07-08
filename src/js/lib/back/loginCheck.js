var loginCheck = {
    freeIC: null,
    motpUse: null,
    memberID: null,
    passWord: null,
    freeTrial: null,
    loginResult: null,
    chargeRemain: null,
    billingresult: null,
    quantityRemain: null,
    billingRemainYN: null,
    freeTrialRemainDate: null,
    isMotpAuth: false,
    init: function (d) {
        this.reset();
        this.freeIC = d.freeIC;
        this.motpUse = d.motpUse;
        this.memberID = d.memberID;
        this.freeTrial = d.freeTrial;
        this.loginResult = d.loginResult;
        this.chargeRemain = d.chargeRemain;
        this.billingresult = d.billingresult;
        this.quantityRemain = d.quantityRemain;
        this.billingRemainYN = d.billingRemainYN;
        this.freeTrialRemainDate = d.freeTrialRemainDate;
        this.isMotpAuth = false;
    },
    reset: function () {
        this.freeIC = null;
        this.motpUse = null;
        this.memberID = null;
        this.passWord = null;
        this.freeTrial = null;
        this.loginResult = null;
        this.chargeRemain = null;
        this.billingresult = null;
        this.quantityRemain = null;
        this.billingRemainYN = null;
        this.freeTrialRemainDate = null;
        this.isMotpAuth = false;
    },
    checkLogin: function () {
        if (this.motpUse == "O" && this.isMotpAuth == false) {
            $("#MOTP").show();
            return false;
        }

        $("#nologin").hide();
        $("#loginwrap").show();
        $("#loginContent").show();


        var substrMemberID = this.memberID.substr(0, this.memberID.length - 2);
        $("#loginmemberID").html(substrMemberID + "** 님 안녕하세요.");


        //빌링데이터정상이거나 시간부족으로나올때
        if (this.billingresult == "0" || this.billingresult == "-302") {
            var chargeHTML = "<p><span>정액제 잔여기간 :</span> <em class='nothing'>없음</em></p>";
            var quantityHTML = "<p><span>정량제 잔여기간 :</span> <em class='nothing'>없음</em></p>";

            if (this.chargeRemain != 0) {
                var chargeDay = 0;
                var chargeHour = 0;
                var chargeMin = 0;

                chargeDay = parseInt(this.chargeRemain / 86400);
                chargeHour = parseInt((this.chargeRemain % 86400) / 3600);
                chargeMin = parseInt(((this.chargeRemain % 86400) % 3600) / 60);


                chargeHTML = "<p><span>정액제 잔여기간 :</span> <em>" + chargeDay + "일  " + chargeHour + "시간  " + chargeMin + "분 </em></p>"
            }

            if (this.quantityRemain != 0)
                quantityHTML = "<p><span>정량제 잔여기간 :</span> <em>" + this.quantityRemain + "분</em></p>"

            $(".info_time").html(chargeHTML + quantityHTML);

            //무료 피씨방일 경우는 피씨방 OFF일 경우에도 피씨방 ON으로 변경 ->로딩할때는 OFF 였다가 로딩할 때 ON으로 변경!!
            if (this.freeIC == "O") {
                $("#pc_check").removeClass("off");
                $("#pc_check").addClass("on");
                $("#pc_text").html("PC방 ON");
            }

            //무료피씨방이거나 피씨방ON인경우는 패치 고고
            if (this.freeIC == "O" || $("#isPcBang").val() == "True") {
                if (this.freeTrial == "O" && this.freeTrialRemainDate > 0) {
                    $(".info_time").html("<p><span>정액제 잔여기간 :</span> <em>" + this.freeTrialRemainDate + "일</em></p><p><span>정량제 잔여기간 :</span> <em class='nothing'>없음</em></p>");
                    $("#freetrial").show();
                    $("#hid_freeTrialRemainDate").val(this.freeTrialRemainDate);
                    $("#hid_freeTrial").val(this.freeTrial);
                }
                window.external.ExecutePatch();
            } else {

                //프리트라이얼였을때
                if (this.freeTrial == "O") {
                    //기간이남아있을때
                    if (this.freeTrialRemainDate > 0) {
                        $(".info_time").html("<p><span>정액제 잔여기간 :</span> <em>" + this.freeTrialRemainDate + "일</em></p><p><span>정량제 잔여기간 :</span> <em class='nothing'>없음</em></p>");
                        $("#freetrial").show();
                        $("#hid_freeTrialRemainDate").val(this.freeTrialRemainDate);
                        $("#hid_freeTrial").val(this.freeTrial);

                        window.external.ExecutePatch();
                    }
                    //기간이종료 되었고  빌링조회시 정액,정량이 없다면
                    else if (this.billingRemainYN == "N") {
                        $(".info_time").html("<p><em class='nothing'>프리 트라이얼 기간이 완료 되었습니다.</em></p><p><span>게임 실행을 하시려면</span> <b>크리스탈 샵</b><span>을 이용해주세요.</span></p>");

                        $("#login").show();
                        $("#links").show();
                        


                        $("#freetrial").show();
                        $("#btnGameStart").hide();
                        $("#btnGameStart_nothing").show();
                    }
                    else {

                        window.external.ExecutePatch();
                    }
                }
                //무료피씨방X ,피씨방OFF , 정액=0, 정량=0 
                else if ($("#isPcBang").val() == "False" && this.billingRemainYN == "N" && this.freeIC == "X") {

                    $("#login").show();
                    $("#links").show();
                    $("#btnGameStart_nothing").show();
                }
                else {
                    window.external.ExecutePatch();
                }
            }
        }
        else {
            if (this.billingresult == "-301" || this.billingresult == "-302") {
                $(".info_time").html("<p><span>정액제 잔여기간 :</span> <em class='nothing'>없음</em></p><p><span>정량제 잔여기간 :</span> <em class='nothing'>없음</em></p>");

                $("#login").show();
                $("#links").show();

                $("#btnGameStart_nothing").show();

            }
            else {
                alert("오류입니다.(" + this.billingresult + ")");
                loginCheck.reset();
                return false;
            }
        }
    }
}
