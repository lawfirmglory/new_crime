/**
 * Supabase 상담 신청 스크립트
 * 
 * 기존 Google Forms 스크립트의 유효성 검사 로직을 그대로 유지하면서
 * Supabase DB로 전송합니다.
 * 
 * ★ 설정: 아래 두 줄만 본인 값으로 변경하세요
 */

(function () {
  'use strict';

  // ══════════════════════════════════════════════
  // ★ Supabase 설정
  // ══════════════════════════════════════════════
  var SUPABASE_URL  = 'https://tknyhvycsxvlxrdscmue.supabase.co';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbnlodnljc3h2bHhyZHNjbXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDQ2NjQsImV4cCI6MjA5NDIyMDY2NH0.WaeR94STn1lpm-hJQeCiJITE3Pvmien84EU9tIyVLDg';

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
        submitToSupabase();
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
  //  Supabase 전송
  // ================================================================
  function submitToSupabase() {
    var name     = $.trim($('#name').val() || '');
    var phone    = String($('#phone').val() || '').replace(/[^0-9]/g, '');
    var category = $('#intro_select').val();
    var message  = $.trim($('#message').val() || '');

    var payload = {
      name:     name,
      phone:    phone,
      category: category,
      message:  message || null,
      source:   '본문 신청폼'
    };

    fetch(SUPABASE_URL + '/rest/v1/consultations', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_ANON,
        'Authorization': 'Bearer ' + SUPABASE_ANON,
        'Prefer':        'return=minimal'
      },
      body: JSON.stringify(payload)
    })
    .then(function (res) {
      if (!res.ok) throw new Error('저장 실패');
      trackPixel();
      alert('상담 신청이 완료되었습니다.');
      window.location.href = './thanks.html';
    })
    .catch(function (err) {
      alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      resetSubmit();
    });
  }

  // ================================================================
  //  유효성 검사 (기존 로직 그대로)
  // ================================================================
  function form_c() {
    var regexName  = /^[가-힣]+$/;
    var regexPhone = /^[0-9]+$/;

    var name     = $.trim($('#name').val() || '');
    var phone    = String($('#phone').val() || '').replace(/[^0-9]/g, '');
    var position = $('#intro_select').val();
    var agree    = $('#agree11').is(':checked');

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
  //  UI 헬퍼 (기존 로직 그대로)
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