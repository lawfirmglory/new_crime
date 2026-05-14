/**
 * 모바일 상담 신청 스크립트 (Supabase 전송)
 *
 * 기존 Google Forms 전송 → Supabase REST API로 변경
 * 유효성 검사, UI, 트래킹 등 모두 그대로 유지
 *
 * ★ 설정: 아래 두 줄만 본인 값으로 변경하세요
 */

var SUPABASE_URL  = 'https://tknyhvycsxvlxrdscmue.supabase.co';
var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbnlodnljc3h2bHhyZHNjbXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDQ2NjQsImV4cCI6MjA5NDIyMDY2NH0.WaeR94STn1lpm-hJQeCiJITE3Pvmien84EU9tIyVLDg';

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

    mobIsSubmitting = true;
    mobSubmitStarted = true;

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

    submitMobToSupabase();

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

// ================================================================
//  Supabase 전송
// ================================================================
function submitMobToSupabase() {
  var name     = $.trim($('#mob_name').val() || '');
  var phone    = String($('#mob_phone').val() || '').replace(/[^0-9]/g, '');
  var category = $('#mob_select').val();

  var payload = {
    name:     name,
    phone:    phone,
    category: category,
    message:  null,
    source:   '모바일 신청폼'
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

    mobSubmitStarted = false;

    try {
      if (window.karrotPixel && window.karrotPixel.track) {
        window.karrotPixel.track('SubmitApplication');
      }
    } catch (e) {}

    $('#mob_btn').text('신청이 완료되었습니다.');

    alert('상담 신청이 완료되었습니다.');

    window.location.href = './thanks.html';
  })
  .catch(function (err) {
    alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    mobIsSubmitting = false;
    mobSubmitStarted = false;
    form_check2();
  });
}

// ================================================================
//  유효성 검사 (기존 로직 그대로)
// ================================================================
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

// ================================================================
//  UI 헬퍼 (기존 로직 그대로)
// ================================================================
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