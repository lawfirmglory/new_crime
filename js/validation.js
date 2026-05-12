let isSubmitting = false;
let submitStarted = false;

$(document).ready(function () {
  form_c();

  $('#send_message').off('click').on('click', function (e) {
    e.preventDefault();

    if (isSubmitting) return false;

    const isValid = form_c();
    if (!isValid) return false;

    const form = document.getElementById('form_e11');

    if (!form) {
      alert('신청 폼을 찾을 수 없습니다.');
      return false;
    }

    isSubmitting = true;
    submitStarted = true;

    $('#send_message')
      .prop('disabled', true)
      .val('신청 접수 중입니다...')
      .css({
        transition: '1s',
        background: '#999',
        color: '#fff',
        cursor: 'default'
      });

    $('#form_e11').attr({
      action: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfIiP9BhHVQCcHQTJvxE9QQ2lKlRGyHinsk7st5gDbROFL8sQ/formResponse',
      method: 'POST',
      target: 'hidden_iframe11'
    });

    $('#hidden_iframe11').off('load').on('load', function () {
      if (!submitStarted) return;

      submitStarted = false;

      try {
        if (window.karrotPixel && window.karrotPixel.track) {
          window.karrotPixel.track('SubmitApplication');
        }
      } catch (err) {}

      alert('상담 신청이 완료되었습니다.');
      window.location.href = './thanks.html';
    });

    setTimeout(function () {
      form.submit();
    }, 150);

    return false;
  });

  $('#name,#phone,#intro_select,#message,#agree11')
    .off('keyup click change input')
    .on('keyup click change input', function () {
      if (!isSubmitting) {
        form_c();
      }
    });
});

function form_c() {
  const regexName = /^[가-힣]+$/;
  const regexPhone = /^[0-9]+$/;

  const name = $.trim($('#name').val() || '');
  const phone = String($('#phone').val() || '').replace(/[^0-9]/g, '');
  const position = $('#intro_select').val();
  const agree = $('#agree11').is(':checked');

  $('#phone').val(phone);

  if (!(regexName.test(name) && name.length > 1)) {
    setButtonInvalid('성함 입력을 확인하세요');
    return false;
  }

  if (!(phone.substr(0, 3) === '010' && phone.length === 11 && regexPhone.test(phone))) {
    setButtonInvalid('전화번호 입력을 확인하세요');
    return false;
  }

  if (!position) {
    setButtonInvalid('상담 분야 선택을 확인하세요');
    return false;
  }

  if (!agree) {
    setButtonInvalid('개인 정보 동의를 확인하세요');
    return false;
  }

  setButtonValid();
  return true;
}

function setButtonValid() {
  $('#send_message')
    .prop('disabled', false)
    .val('무료 상담 신청하기')
    .css({
      transition: '1s',
      background: '#dcbe4e',
      color: '#000',
      cursor: 'pointer'
    });
}

function setButtonInvalid(text) {
  $('#send_message')
    .prop('disabled', true)
    .val(text)
    .css({
      transition: '1s',
      background: '#000',
      color: '#fff',
      cursor: 'default'
    });
}

function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

function dll() {
  try {
    if (window.karrotPixel && window.karrotPixel.track) {
      window.karrotPixel.track('SubmitApplication');
    }
  } catch (err) {}

  alert('빠른 안내를 통해 도움 드리겠습니다.\n신청해주셔서 감사합니다.');
}

function hoa3() {
  alert('상담 신청이 완료되었습니다.');
  window.location.href = './thanks.html';
}

function site1111() {}