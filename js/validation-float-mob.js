$(document).ready(function form_mob(){
    $('#mob_btn').click(function(){
        
          //Stop form submission & check the validation
        // e.preventDefault();
        
        // Variable declaration
        var error = false;
        const regex1 = /^[|가-힣a-zA-Z\s+]+$/;
        const regex = /^[|0-9|]+$/;
        var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var position = $('#mob_select').val();
        // var id = $('#id-number').val();
        var name = $('#mob_name').val();
        // var email = $('#email').val();
        var phone = $('#mob_phone').val();
        var message = $('#message').val();
        var agree = $('#agree13').is(":checked");
        
        
        $('#mob_name, #mob_phone,#position2,#agree13').click(function(){
            $(this).removeClass("error_input");
        });
        


         // Form field validation
         if(!regex1.test(name) || name.length<0 ){
            var error = true;
            $('#mob_name').addClass("error_input");
           alert("이름 입력을 확인하세요.");
        }else{
            $('#mob_name').removeClass("error_input");
        }

        if (agree == false){
            var error = true;
            $('#agree13').addClass("error_input");
            alert("개인정보동의를 체크해주세요.");
        }else{
            $('#agree13').removeClass("error_input");
        }
        
        
        // If there is no validation error, next to process the mail function
        if(error == false){
           // Disable submit button just after the form processed 1st time successfully.
          
           $('#form_e13').prop("action", "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe32AL0hlKKEkuv5rsnPJJYqfi6JLyqi_moHr2G11x9cHVd4w/formResponse");
           $('#mob_btn').text('신청이 완료되었습니다.');
           $('.m_go_btn, #mob_btn').css({background:"#000"});
           
            
     $('.m_go_btn, #mob_btn').prop("disabled", false);
    $('#mob_btn').css({transition:"1s"});
    $('.m_go_btn, #mob_btn').css({background:"#000"});
    $('#mob_btn').css({color:"#fff"});
    $('#hidden_iframe13').attr("onload", "hoa();");

        }
    });    

   

});


function dll3(){
    window.karrotPixel.track('SubmitApplication');
    alert("무료 상담 신청이 완료되었습니다.");
    $('.m_go_btn, #mob_btn').prop("disabled", true);
//    hoa();
}
 
function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}
 
function hoa(){

    alert("상담 신청이 완료되었습니다.");
    // $(window).scrollTop(0);
    window.location.href = './thanks.html';
    
    // alert("무료 상담 신청이 완료되었습니다.");
    // $(window).scrollTop(0);
    //  window.location.reload();
  
  }
 
 function site1111(){
  //$('#mc-embedded-subscribe').click();
  

  window.location.reload();
 }


 function form_check2(){

    const regex2 = /^[가-힣]+$/;
    const regex = /^[|0-9|]+$/;
    var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var position = $('#mob_select').val();
    // var id = $('#id-number').val();
    var name = $('#mob_name').val();
    // var email = $('#email').val();
    var phone = $('#mob_phone').val();
    var message = $('#message').val();
    var agree = $('#agree13').is(":checked");

    // if (license != null)
    // {

    if(regex2.test(name) && name.length > 1 )
    {
        if(phone.substr(0, 3) == "010" && phone.length ==11 && regex.test(phone))
        {

        // if(email.match(regExp) != null)
        // {
           
            // if(regex.test(id) && id.length == 2 && id >=24 && id <51)
            // {
            
                if( position != null )
                {
              
                    if (agree == true)
                    {
                        $('#mob_btn').css({transition:"1s"});
                       $('#mob_btn').prop("disabled", false);
                       $('#mob_btn').text("무료 상담 신청하기");
                       $('.m_go_btn').css({transition:"1s"});
                       $('.m_go_btn, #mob_btn').css({background:"#ac9173"});
                       $('.m_go_btn, #mob_btn').css({cursor:"pointer"});
                    }
                    else
                    {
                        $('#mob_btn').css({transition:"1s"});
                        $('#mob_btn').prop("disabled", true);
                        $('#mob_btn').text("개인정보 동의를 해주세요");
                        $('#mob_btn').css({color:"#fff"});
                        $('.m_go_btn, #mob_btn').css({background:"#000"});
                        $('.m_go_btn').css({cursor:"default"});     
                    }
                    
                }
                else
                {
                    $('#mob_btn').css({transition:"1s"});
                    $('#mob_btn').prop("disabled", true);
                    $('#mob_btn').text("상담 유형을 확인하세요.");
                    $('#mob_btn').css({color:"#fff"});
                    $('.m_go_btn, #mob_btn').css({background:"#000"});
                    $('#mob_btn').css({cursor:"default"});     
                }
  
            // }
            // else if(id.length==0)
            //  {
            // $('#mob_btn').css({transition:"1s"});
            // $('#mob_btn').prop("disabled", true);
            // $('#mob_btn').text("나이를 입력하세요.");
            // $('#mob_btn').css({background:"#595959"});
            // $('#mob_btn').css({cursor:"default"});     
            // }
            // else 
            // {
            // $('#mob_btn').css({transition:"1s"});
            // $('#mob_btn').prop("disabled", true);
            // $('#mob_btn').text("24 ~ 50세까지 가능합니다.");
            // $('#mob_btn').css({background:"#595959"});
            // $('#mob_btn').css({cursor:"default"});     
            // }
           
        // }
        // else if(email.length>0)
        // {
        //     $('#mob_btn').css({transition:"1s"});
        //     $('#mob_btn').prop("disabled", true);
        //     $('#mob_btn').text("이메일 주소 입력을 확인하세요.");
        //     $('#mob_btn').css({background:"#595959"});
        //     $('#mob_btn').css({cursor:"default"});     
        // }
        // else
        // {
        //     $('#mob_btn').css({transition:"1s"});
        //     $('#mob_btn').prop("disabled", true);
        //     $('#mob_btn').text("이메일 주소를 입력하세요.");
        //     $('#mob_btn').css({background:"#595959"});
        //     $('#mob_btn').css({cursor:"default"});     
        // }

    }
    else if(phone.length==0)
     {
        $('#mob_btn').css({transition:"1s"});
        $('#mob_btn').prop("disabled", true);
        $('#mob_btn').text("전화번호 입력을 확인하세요.");
        $('#mob_btn').css({color:"#fff"});
        $('.m_go_btn, #mob_btn').css({background:"#000"});
        $('#mob_btn').css({cursor:"default"});    
    }
    else 
    {
        $('#mob_btn').css({transition:"1s"});
        $('#mob_btn').prop("disabled", true);
        $('#mob_btn').text("전화번호 입력을 확인하세요.");
        $('#mob_btn').css({color:"#fff"});
        $('.m_go_btn, #mob_btn').css({background:"#000"});
        $('#mob_btn').css({cursor:"default"});     
    }

    }
    else if(name.length>0)
    {
        $('#mob_btn').css({transition:"1s"});
        $('#mob_btn').prop("disabled", true);
        $('#mob_btn').text("성함 입력을 확인하세요.");
        $('#mob_btn').css({color:"#fff"});
        $('.m_go_btn, #mob_btn').css({background:"#000"});
        $('#mob_btn').css({cursor:"default"});     
    }
    else
    {
        $('#mob_btn').css({transition:"1s"});
        $('#mob_btn').prop("disabled", true);
        $('#mob_btn').text("성함을 입력하세요.");
        $('#mob_btn').css({color:"#fff"});
        $('.m_go_btn, #mob_btn').css({background:"#000"});
        $('#mob_btn').css({cursor:"default"});     
    }
    // }
    // else
    // {
    //     $('#mob_btn').css({transition:"1s"});
    //     $('#mob_btn').prop("disabled", true);
    //     $('#mob_btn').text("자격증 종류를 선택하세요.");
    //     $('#mob_btn').css({background:"#595959"});
    //     $('#mob_btn').css({cursor:"default"});        
    // }
 }
  

$(function(){
 $('#mob_name,#agree13,#mob_phone,#mob_select').bind("keyup click change",form_check2);
//  $('#name,#phone,#position,#id-number,#message,#license').bind("keyup click change",form_check1);
//  $('#license').bind("keyup click change",lic_pick);
})
