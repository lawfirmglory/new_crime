/**
 * Google Forms 제출 스크립트 (GitHub Pages 완벽 호환)
 * 
 * 전략: fetch (no-cors) → iframe fallback → 타임아웃 안전장치
 * - fetch: 대부분의 modern 브라우저에서 확실하게 전송
 * - iframe: fetch 실패 시 fallback
 * - 타임아웃: 어떤 경우든 일정 시간 후 완료 처리
 */

(function () {
  'use strict';

  var GOOGLE_FORM_URL =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfIiP9BhHVQCcHQTJvxE9QQ2lKlRGyHinsk7st5gDbROFL8sQ/formResponse';

  var isSubmitting = false;

  $(document).ready(function () {
    form_c();

    // ── 제출 버튼 ──
    $('#send_message')
      .off('click')
      .on('click', function (e) {
        e.preventDefault();
        if (isSubmitting) return false;
        if (!form_c()) return false;

        isSubmitting = true;
        showSubmitting();
        submitToGoogle();
        return false;
      });

    // ── 실시간 유효성 검사 ──
    $('#name, #phone, #intro_select, #message, #agree11')
      .off('keyup click change input')
      .on('keyup click change input', function () {
        if (!isSubmitting) form_c();
      });
  });

  // ================================================================
  //  핵심: 이중 전송 (fetch + iframe) + 타임아웃 안전장치
  // ================================================================
  function submitToGoogle() {
    var formEl = document.getElementById('form_e11');
    if (!formEl) {
      alert('신청 폼을 찾을 수 없습니다.');
      resetSubmit();
      return;
    }

    var formData = new FormData(formEl);
    var completed = false;

    function onSuccess() {
      if (completed) return;
      completed = true;
      trackPixel();
      alert('상담 신청이 완료되었습니다.');
      window.location.href = './thanks.html';
    }

    // ── 안전장치: 3초 후 무조건 성공 처리 ──
    // Google Forms는 no-cors 모드에서 응답을 읽을 수 없으므로
    // 전송 자체는 성공해도 콜백을 못 받을 수 있다.
    // fetch/iframe 둘 다 발사한 뒤 3초면 충분히 도착한다.
    var safetyTimer = setTimeout(onSuccess, 3000);

    // ── 방법 1: fetch (no-cors) ──
    if (typeof fetch === 'function') {
      fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors', // opaque 응답이지만 전송은 된다
        body: formData
      })
        .then(function () {
          // opaque 응답 → status 0 이지만 전송 완료
          onSuccess();
        })
        .catch(function () {
          // fetch 실패 → iframe이 처리할 것이므로 무시
        });
    }

    // ── 방법 2: iframe fallback (동시 발사) ──
    submitViaIframe(formEl, formData, onSuccess);
  }

  // ================================================================
  //  iframe 방식 (fetch가 없는 구형 브라우저 대응)
  // ================================================================
  function submitViaIframe(formEl, formData, onSuccess) {
    var iframeName = 'hidden_iframe11';
    var iframe = document.querySelector('iframe[name="' + iframeName + '"]');

    // iframe이 없으면 동적 생성
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    // iframe load 이벤트 (cross-origin이라 불안정하지만 보조 수단)
    $(iframe)
      .off('load')
      .on('load', function () {
        onSuccess();
      });

    // form 속성 설정 후 submit
    formEl.setAttribute('action', GOOGLE_FORM_URL);
    formEl.setAttribute('method', 'POST');
    formEl.setAttribute('target', iframeName);

    // 약간의 지연 후 submit (DOM 반영 보장)
    setTimeout(function () {
      formEl.submit();
    }, 50);
  }

  // ================================================================
  //  유효성 검사
  // ================================================================
  function form_c() {
    var regexName = /^[가-힣]+$/;
    var regexPhone = /^[0-9]+$/;

    var name = $.trim($('#name').val() || '');
    var phone = String($('#phone').val() || '').replace(/[^0-9]/g, '');
    var position = $('#intro_select').val();
    var agree = $('#agree11').is(':checked');

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

  // ================================================================
  //  UI 헬퍼
  // ================================================================
  function showSubmitting() {
    $('#send_message')
      .prop('disabled', true)
      .val('신청 접수 중입니다...')
      .css({ transition: '1s', background: '#999', color: '#fff', cursor: 'default' });
  }

  function setButtonValid() {
    $('#send_message')
      .prop('disabled', false)
      .val('무료 상담 신청하기')
      .css({ transition: '1s', background: '#dcbe4e', color: '#000', cursor: 'pointer' });
  }

  function setButtonInvalid(text) {
    $('#send_message')
      .prop('disabled', true)
      .val(text)
      .css({ transition: '1s', background: '#000', color: '#fff', cursor: 'default' });
  }

  function resetSubmit() {
    isSubmitting = false;
    form_c();
  }

  function trackPixel() {
    try {
      if (window.karrotPixel && window.karrotPixel.track) {
        window.karrotPixel.track('SubmitApplication');
      }
    } catch (err) {}
  }

  // ================================================================
  //  전역 유틸 (HTML에서 호출하는 함수)
  // ================================================================
  window.maxLengthCheck = function (object) {
    if (object.value.length > object.maxLength) {
      object.value = object.value.slice(0, object.maxLength);
    }
  };

  window.form_c = form_c;
})();