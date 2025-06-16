$(document).ready(function(){
    $('#send_message').click(function(){
        
          //Stop form submission & check the validation
        // e.preventDefault();
        
        // Variable declaration
        var error = false;
        // const regex1 = /^[가-힣]+$/;
        // const regex = /^[|0-9|]+$/;
        // const regex2 = /^[가-힣|a-z|A-Z|0-9\s+]+$/;
        
        // var name = $('#name').val();
        // var phone = $('#phone').val();
        // var agree = $('#agree11').is(":checked");
        
  
  
         // Form field validation
         $('#form_e11').prop("action", "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe32AL0hlKKEkuv5rsnPJJYqfi6JLyqi_moHr2G11x9cHVd4w/formResponse");
         $('#send_message').attr({'disabled' : 'true', 'value' : '잠시만 기다려주세요' });
         
          
   $('#send_message').prop("disabled", false);
  $('#send_message').css({transition:"1s"});
  $('#send_message').css({background:"#222222"});
  $('#send_message').css({color:"#fff"});
  $('#hidden_iframe11').attr("onload", "hoa3();");
    });    
  
   
  
  });
  
  
  function dll(){
    // var f = document.fm;
    // f.submit();
    // $('[name="fm"],[name="fm1"]').submit();
       window.karrotPixel.track('SubmitApplication');
    alert("빠른 안내를 통해 도움 드리겠습니다.\n신청해주셔서 감사합니다.");
  
  }
  
  function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
  }
  
  function hoa3(){ 
    setTimeout( function(){
    alert("상담 신청이 완료되었습니다.");
    // $(window).scrollTop(0);
    window.location.href = './thanks.html';
  },500);
        // $(window).scrollTop(0);
        //  window.location.reload();
  }
  
  function site1111(){
  //$('#mc-embedded-subscribe').click();
  
  
  //   $(window).scrollTop(0);
  //   window.location.href = './thanks.html';
  //   window.location.reload();
  }
  
  
  function form_c(){
  
    const regex1 = /^[가-힣]+$/;
    const regex = /^[|0-9|]+$/;
    var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var position = $('#intro_select').val();
    var name = $('#name').val();
    var phone = $('#phone').val();
    var agree = $('#agree11').is(":checked");
  
  
  
  
   
  
  
            if(regex1.test(name) && name.length > 1 )
            {
  
  
                    if(phone.substr(0, 3) == "010" && phone.length ==11 && regex.test(phone))
                    {
        
                          if( position != null )
                            {
                    
                                        if (agree == true)
                                        {
                                            $('#send_message').css({transition:"1s"});
                                            $('#send_message').prop("disabled", false);
                                            $('#send_message').val("무료 상담 신청하기");
                                            $('#send_message').css({background:"#dcbe4e"});
                                            $('#send_message').css({color:"#000"});
                                            $('#send_message').css({cursor:"pointer"});
                                        }
                                        else
                                        {
                                            $('#send_message').css({transition:"1s"});
                                            $('#send_message').prop("disabled", true);
                                            $('#send_message').val("개인 정보 동의를 확인하세요");
                                            $('#send_message').css({background:"#000"});
                                            $('#send_message').css({color:"#fff"});
                                            $('#send_message').css({cursor:"default"});     
                                        }
                              }
                              else
                              {
                                  $('#send_message').css({transition:"1s"});
                                  $('#send_message').prop("disabled", true);
                                  $('#send_message').val("상담 분야를 선택을 확인하세요");
                                  $('#send_message').css({background:"#000"});
                                  $('#send_message').css({color:"#fff"});
                                  $('#send_message').css({cursor:"default"});  
                              }
                                          
                      }
                      else if(phone.length == 0)
                      {
                          $('#send_message').css({transition:"1s"});
                          $('#send_message').prop("disabled", true);
                          $('#send_message').val("전화번호 입력을 확인하세요");
                          $('#send_message').css({background:"#000"});
                            $('#send_message').css({color:"#fff"});
                          $('#send_message').css({cursor:"default"});     
                      }
                      else
                      {
                          $('#send_message').css({transition:"1s"});
                          $('#send_message').prop("disabled", true);
                          $('#send_message').val("전화번호 입력을 확인하세요");
                          $('#send_message').css({background:"#000"});
                            $('#send_message').css({color:"#fff"});
                          $('#send_message').css({cursor:"default"});     
                      }
  
        
                
            }
            else if(name.length == 0)
            {
                $('#send_message').css({transition:"1s"});
                $('#send_message').prop("disabled", true);
                $('#send_message').val("성함 입력을 확인하세요");
                $('#send_message').css({background:"#000"});
                  $('#send_message').css({color:"#fff"});
                $('#send_message').css({cursor:"default"});     
            }
            else
            {
                $('#send_message').css({transition:"1s"});
                $('#send_message').prop("disabled", true);
                $('#send_message').val("성함 입력을 확인하세요");
                $('#send_message').css({background:"#000"});
                  $('#send_message').css({color:"#fff"});
                $('#send_message').css({cursor:"default"});     
            }
  
                  
 
  
   
  }
  
  
  
   
  
  
  
  
  $(function(){
  $('#name,#phone,#intro_select,#message,#agree11').bind("keyup click change",form_c);
  //  $('#name,#phone,#intro_select,#car_type,#car,#message,#agree11,#now-wg,#hope-wg,#height').bind("keyup click change",form_check1);
  //  $('#license').bind("keyup click change",lic_pick);
  })
  