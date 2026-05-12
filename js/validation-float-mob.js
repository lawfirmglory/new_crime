var mobIsSubmitting = false;
var mobSubmitStarted = false;

$(document).ready(function () {

  form_check2();

  $('#mob_btn').off('click').on('click', function (e) {
    e.preventDefault();

    if (mobIsSubmitting) return false;

    var isValid = form_check2();

    if (!isValid) {
      return false;
    }

    var form = document.getElementById('form_e13');

    if (!form) {
      alert('신청 폼을 찾을 수 없습니다.');
      return false;
    }

    mobIsSubmitting = true;
    mobSubmitStarted = true;

    $('#form_e13').attr({
      action: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfIiP9BhHVQCcHQTJvxE9QQ2lKlRGyHinsk7st5gDbROFL8sQ/formResponse',
      method: 'POST',
      target: 'hidden_iframe13'
    });

    $('#mob_btn')
      .prop('disabled', true)
      .text('전송 중')
      .css({
        transition: '1s',
        color: '#fff',
        background: '#000',
        cursor: 'default'
      });

    $('.m_go_btn').css({
      background: '#000',
      cursor: 'default'
    });

    $('#hidden_iframe13').off('load').on('load', function () {

      if (!mobSubmitStarted) return;

      mobSubmitStarted = false;

      try {
        if (window.karrotPixel && window.karrotPixel.track) {
          window.karrotPixel.track('SubmitApplication');
        }
      } catch (e) {}

      $('#mob_btn').text('신청이 완료되었습니다.');

      alert('상담 신청이 완료되었습니다.');

      window.location.href = './thanks.html';
    });

    setTimeout(function () {
      form.submit();
    }, 200);

    return false;
  });

  $('#mob_name,#agree13,#mob_phone,#mob_select')
    .off('keyup click change input')
    .on('keyup click change input', function () {
      if (!mobIsSubmitting) {
        form_check2();
      }
    });

  $('#mob_name,#mob_phone,#mob_select,#agree13').on('click change input', function () {
    $(this).removeClass('error_input');
  });

});

function dll3() {

  try {
    if (window.karrotPixel && window.karrotPixel.track) {
      window.karrotPixel.track('SubmitApplication');
    }
  } catch (e) {}

  alert('무료 상담 신청이 완료되었습니다.');

  $('.m_go_btn, #mob_btn').prop('disabled', true);
}

function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

function hoa() {

  alert('상담 신청이 완료되었습니다.');

  window.location.href = './thanks.html';
}

function site1111() {
  window.location.reload();
}

function form_check2() {

  const regexName = /^[가-힣a-zA-Z\s]+$/;
  const regexPhone = /^[0-9]+$/;

  var position = $('#mob_select').val();
  var name = $.trim($('#mob_name').val() || '');
  var phone = String($('#mob_phone').val() || '').replace(/[^0-9]/g, '');
  var agree = $('#agree13').is(':checked');

  $('#mob_phone').val(phone);

  $('#mob_name,#mob_phone,#mob_select,#agree13').removeClass('error_input');

  if (!(regexName.test(name) && name.length > 1)) {

    $('#mob_name').addClass('error_input');

    mobButtonInvalid('성함 입력을 확인하세요.');

    return false;
  }

  if (!(phone.substr(0, 3) === '010' && phone.length === 11 && regexPhone.test(phone))) {

    $('#mob_phone').addClass('error_input');

    mobButtonInvalid('전화번호 입력을 확인하세요.');

    return false;
  }

  if (!position) {

    $('#mob_select').addClass('error_input');

    mobButtonInvalid('상담 유형을 확인하세요.');

    return false;
  }

  if (!agree) {

    $('#agree13').addClass('error_input');

    mobButtonInvalid('개인정보 동의를 해주세요');

    return false;
  }

  mobButtonValid();

  return true;
}

function mobButtonValid() {

  $('#mob_btn')
    .prop('disabled', false)
    .text('무료 상담 신청하기')
    .css({
      transition: '1s',
      color: '#fff',
      background: '#ac9173',
      cursor: 'pointer'
    });

  $('.m_go_btn').css({
    background: '#ac9173',
    cursor: 'pointer'
  });
}

function mobButtonInvalid(text) {

  $('#mob_btn')
    .prop('disabled', true)
    .text(text)
    .css({
      transition: '1s',
      color: '#fff',
      background: '#000',
      cursor: 'default'
    });

  $('.m_go_btn').css({
    background: '#000',
    cursor: 'default'
  });
}