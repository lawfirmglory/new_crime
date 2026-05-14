/**
 * PC 상담 신청 스크립트 (Supabase 전송)
 * 
 * 기존 Google Forms 전송 → Supabase REST API로 변경
 * 유효성 검사, UI, 트래킹, togglePhonesStart 등 모두 그대로 유지
 *
 * ★ 설정: 아래 두 줄만 본인 값으로 변경하세요
 */

var SUPABASE_URL  = 'https://tknyhvycsxvlxrdscmue.supabase.co';
var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbnlodnljc3h2bHhyZHNjbXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDQ2NjQsImV4cCI6MjA5NDIyMDY2NH0.WaeR94STn1lpm-hJQeCiJITE3Pvmien84EU9tIyVLDg';

var pcIsSubmitting = false;
var pcSubmitStarted = false;

$(document).ready(function () {
  form_check1();

  $('#pc_btn').off('click').on('click', function (e) {
    e.preventDefault();

    if (pcIsSubmitting) return false;

    var isValid = form_check1();
    if (!isValid) return false;

    pcIsSubmitting = true;
    pcSubmitStarted = true;

    $('#pc_btn')
      .prop('disabled', true)
      .text('전송 중')
      .css({
        transition: '1s',
        background: '#000',
        color: '#fff',
        cursor: 'default'
      });

    $('#pc_alert').text('신청 정보를 전송하고 있습니다. 잠시만 기다려주세요.');

    submitPcToSupabase();

    return false;
  });

  $('#pc_name,#agree12,#pc_phone,#pc_select')
    .off('keyup click change input')
    .on('keyup click change input', function () {
      if (!pcIsSubmitting) {
        form_check1();
      }
    });

  $('#pc_name,#pc_phone,#pc_select,#agree12').on('click change input', function () {
    $(this).removeClass('error_input');
  });

  togglePhonesStart();
});

// ================================================================
//  Supabase 전송
// ================================================================
function submitPcToSupabase() {
  var name     = $.trim($('#pc_name').val() || '');
  var phone    = String($('#pc_phone').val() || '').replace(/[^0-9]/g, '');
  var category = $('#pc_select').val();

  var payload = {
    name:     name,
    phone:    phone,
    category: category,
    message:  null,
    source:   'PC 신청폼'
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

    pcSubmitStarted = false;

    try {
      if (window.karrotPixel && window.karrotPixel.track) {
        window.karrotPixel.track('SubmitApplication');
      }
    } catch (err) {}

    $('#pc_btn').text('신청완료');
    $('#pc_alert').text('신청이 완료되었습니다.');

    alert('상담 신청이 완료되었습니다.');
    window.location.href = './thanks.html';
  })
  .catch(function (err) {
    alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    pcIsSubmitting = false;
    pcSubmitStarted = false;
    form_check1();
  });
}

// ================================================================
//  유효성 검사 (기존 로직 그대로)
// ================================================================
function form_check1() {
  var regexName = /^[가-힣a-zA-Z\s]+$/;
  var regexPhone = /^[0-9]+$/;

  var position = $('#pc_select').val();
  var name = $.trim($('#pc_name').val() || '');
  var phone = String($('#pc_phone').val() || '').replace(/[^0-9]/g, '');
  var agree = $('#agree12').is(':checked');

  $('#pc_phone').val(phone);

  $('#pc_name,#pc_phone,#pc_select,#agree12').removeClass('error_input');

  if (!(regexName.test(name) && name.length > 1)) {
    $('#pc_name').addClass('error_input');
    pcButtonInvalid('성함 입력을 확인하세요.');
    return false;
  }

  if (!(phone.substr(0, 3) === '010' && phone.length === 11 && regexPhone.test(phone))) {
    $('#pc_phone').addClass('error_input');
    pcButtonInvalid('전화번호 입력을 확인하세요.');
    return false;
  }

  if (!position) {
    $('#pc_select').addClass('error_input');
    pcButtonInvalid('상담 유형을 확인하세요.');
    return false;
  }

  if (!agree) {
    $('#agree12').addClass('error_input');
    pcButtonInvalid('개인정보 동의를 확인하세요.');
    return false;
  }

  pcButtonValid();
  return true;
}

// ================================================================
//  UI 헬퍼 (기존 로직 그대로)
// ================================================================
function pcButtonValid() {
  $('#pc_btn')
    .prop('disabled', false)
    .text('상담 신청')
    .css({
      transition: '1s',
      background: '#AC9173',
      color: '#fff',
      border: '1px solid #fff',
      cursor: 'pointer'
    });

  $('#pc_alert').text('');
}

function pcButtonInvalid(text) {
  $('#pc_btn')
    .prop('disabled', true)
    .text('상담 신청')
    .css({
      transition: '1s',
      background: '#000',
      color: '#fff',
      cursor: 'default'
    });

  $('#pc_alert').text(text);
}

function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

function dll2() {
  try {
    if (window.karrotPixel && window.karrotPixel.track) {
      window.karrotPixel.track('SubmitApplication');
    }
  } catch (err) {}

  alert('무료 상담 신청을 해주셔서 감사합니다. 빠른 안내 진행드리겠습니다');
  $('#pc_btn').text('신청완료');
  $('#pc_alert').text('신청이 완료 되었습니다.');
}

function hoa2() {
  alert('상담 신청이 완료되었습니다.');
  window.location.href = './thanks.html';
}

function site1111() {
  window.location.reload();
}

function togglePhonesStart() {
  if (!$('.tel-seoul').length || !$('.tel-daejeon').length) return;

  function togglePhones() {
    $('.tel-seoul').fadeIn(1000).delay(2000).fadeOut(1000, function () {
      $('.tel-daejeon').fadeIn(1000).delay(2000).fadeOut(1000, togglePhones);
    });
  }

  $('.tel-daejeon').hide();
  togglePhones();
}