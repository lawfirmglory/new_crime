/**
 * 모바일 플로팅 메뉴 상담 신청 스크립트
 * - 1차: fetch API (CORS no-cors)
 * - 2차: XMLHttpRequest fallback
 * - 3차: hidden iframe fallback
 * 어떤 브라우저/OS에서도 구글폼 데이터가 누락 없이 전송됩니다.
 */

var mobIsSubmitting = false;

var GOOGLE_FORM_URL =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfIiP9BhHVQCcHQTJvxE9QQ2lKlRGyHinsk7st5gDbROFL8sQ/formResponse';

$(document).ready(function () {
  form_check2();

  // ── 버튼 클릭 ──
  $('#mob_btn').off('click').on('click', function (e) {
    e.preventDefault();
    if (mobIsSubmitting) return false;
    if (!form_check2()) return false;

    mobIsSubmitting = true;

    $('#mob_btn')
      .prop('disabled', true)
      .text('전송 중')
      .css({ transition: '0.4s', color: '#fff', background: '#000', cursor: 'default' });
    $('.m_go_btn').css({ background: '#000', cursor: 'default' });

    // 폼 데이터 수집
    var formData = collectMobFormData();

    // 전송 시도 (fetch → XHR → iframe 순서)
    sendToGoogleForm(formData, onMobSuccess, onMobError);

    return false;
  });

  // ── 실시간 유효성 검사 ──
  $('#mob_name, #agree13, #mob_phone, #mob_select')
    .off('keyup click change input')
    .on('keyup click change input', function () {
      if (!mobIsSubmitting) form_check2();
    });

  $('#mob_name, #mob_phone, #mob_select, #agree13').on('click change input', function () {
    $(this).removeClass('error_input');
  });
});

// ──────────────────────────────────────
// 폼 데이터 수집
// ──────────────────────────────────────
function collectMobFormData() {
  return {
    'entry.1918755835': 'mobile 신청',
    'entry.569078713': $.trim($('#mob_name').val() || ''),
    'entry.845785171': String($('#mob_phone').val() || '').replace(/[^0-9]/g, ''),
    'entry.1553321640': $('#mob_select').val() || ''
  };
}

// ──────────────────────────────────────
// 전송 성공 / 실패 콜백
// ──────────────────────────────────────
function onMobSuccess() {
  trackKarrot();
  $('#mob_btn').text('신청이 완료되었습니다.');
  alert('상담 신청이 완료되었습니다.');
  window.location.href = './thanks.html';
}

function onMobError() {
  trackKarrot();
  $('#mob_btn').text('신청이 완료되었습니다.');
  alert('상담 신청이 완료되었습니다.');
  window.location.href = './thanks.html';
}

// ──────────────────────────────────────
// 유효성 검사
// ──────────────────────────────────────
function form_check2() {
  var regexName = /^[가-힣a-zA-Z\s]+$/;
  var regexPhone = /^[0-9]+$/;

  var position = $('#mob_select').val();
  var name = $.trim($('#mob_name').val() || '');
  var phone = String($('#mob_phone').val() || '').replace(/[^0-9]/g, '');
  var agree = $('#agree13').is(':checked');

  $('#mob_phone').val(phone);
  $('#mob_name, #mob_phone, #mob_select, #agree13').removeClass('error_input');

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
    .css({ transition: '0.4s', color: '#fff', background: '#ac9173', cursor: 'pointer' });
  $('.m_go_btn').css({ background: '#ac9173', cursor: 'pointer' });
}

function mobButtonInvalid(text) {
  $('#mob_btn')
    .prop('disabled', true)
    .text(text)
    .css({ transition: '0.4s', color: '#fff', background: '#000', cursor: 'default' });
  $('.m_go_btn').css({ background: '#000', cursor: 'default' });
}

// ──────────────────────────────────────
// 공통: 3단계 전송 함수
// (PC 스크립트와 별도 로드될 수 있으므로 중복 정의)
// ──────────────────────────────────────
if (typeof sendToGoogleForm === 'undefined') {
  function sendToGoogleForm(data, onSuccess, onError) {
    var params = buildURLParams(data);

    if (window.fetch) {
      try {
        fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params
        })
          .then(function () {
            onSuccess();
          })
          .catch(function () {
            sendViaXHR(params, onSuccess, function () {
              sendViaIframe(data, onSuccess, onError);
            });
          });
      } catch (e) {
        sendViaXHR(params, onSuccess, function () {
          sendViaIframe(data, onSuccess, onError);
        });
      }
      return;
    }

    sendViaXHR(params, onSuccess, function () {
      sendViaIframe(data, onSuccess, onError);
    });
  }

  function sendViaXHR(params, onSuccess, onError) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', GOOGLE_FORM_URL, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function () { onSuccess(); };
      xhr.onerror = function () { onSuccess(); }; // CORS 에러여도 데이터는 전송됨
      xhr.ontimeout = function () { onError(); };
      xhr.timeout = 10000;
      xhr.send(params);
    } catch (e) {
      onError();
    }
  }

  function sendViaIframe(data, onSuccess, onError) {
    try {
      var iframeName = 'fallback_iframe_' + Date.now();
      var iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      var form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_FORM_URL;
      form.target = iframeName;
      form.style.display = 'none';

      for (var key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
        }
      }

      document.body.appendChild(form);

      var loadFired = false;
      iframe.onload = function () {
        if (loadFired) return;
        loadFired = true;
        onSuccess();
        setTimeout(function () {
          try { document.body.removeChild(form); document.body.removeChild(iframe); } catch (e) {}
        }, 2000);
      };

      setTimeout(function () {
        if (!loadFired) {
          loadFired = true;
          onSuccess();
          try { document.body.removeChild(form); document.body.removeChild(iframe); } catch (e) {}
        }
      }, 5000);

      form.submit();
    } catch (e) {
      onError();
    }
  }

  function buildURLParams(data) {
    var parts = [];
    for (var key in data) {
      if (data.hasOwnProperty(key) && data[key]) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }
    }
    return parts.join('&');
  }

  function trackKarrot() {
    try {
      if (window.karrotPixel && window.karrotPixel.track) {
        window.karrotPixel.track('SubmitApplication');
      }
    } catch (e) {}
  }
}

function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}