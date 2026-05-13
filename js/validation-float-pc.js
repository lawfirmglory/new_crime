/**
 * 글로리 법무법인 - 플로팅 메뉴 상담 신청 (PC + 모바일 통합)
 *
 * 전송 방식: 동적 <form> + hidden <iframe> (단일 전송)
 *
 * - 브라우저 네이티브 form submit이므로 CORS 정책 무관
 * - iOS Safari, Android Chrome, 인앱 브라우저 모두 동작
 * - 전송은 1회만 발생 → 구글폼 DB 중복 없음
 * - iframe onload 또는 8초 타임아웃 중 먼저 오는 것으로 완료 처리
 */

(function ($) {
  'use strict';

  var FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfIiP9BhHVQCcHQTJvxE9QQ2lKlRGyHinsk7st5gDbROFL8sQ/formResponse';


  /* ══════════════════════════════════════════════
   *  구글폼 전송 (동적 form + iframe, 1회만)
   * ══════════════════════════════════════════════ */
  function submitToGoogleForm(entryData, callback) {
    var finished = false;

    function done() {
      if (finished) return;
      finished = true;
      fireKarrot();
      if (typeof callback === 'function') {
        setTimeout(callback, 300);
      }
    }

    try {
      var uid = '_gf_' + Date.now();

      /* iframe 생성 */
      var iframe = document.createElement('iframe');
      iframe.name = uid;
      iframe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;visibility:hidden;';
      document.body.appendChild(iframe);

      /* form 생성 */
      var form = document.createElement('form');
      form.method = 'POST';
      form.action = FORM_URL;
      form.target = uid;
      form.acceptCharset = 'UTF-8';
      form.style.display = 'none';

      /* hidden input 생성 */
      $.each(entryData, function (key, val) {
        if (val === '' || val == null) return;
        var inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = key;
        inp.value = String(val);
        form.appendChild(inp);
      });

      document.body.appendChild(form);

      /* iframe load → 전송 완료 */
      $(iframe).on('load', function () {
        done();
        cleanup();
      });

      /* form submit 실행 */
      form.submit();

      /* 정리 함수 */
      function cleanup() {
        setTimeout(function () {
          try { $(form).remove(); } catch (e) {}
          try { $(iframe).remove(); } catch (e) {}
        }, 2000);
      }

      /* 안전장치: 8초 타임아웃 (iframe onload가 안 올 경우 대비) */
      setTimeout(function () {
        done();
        cleanup();
      }, 8000);

    } catch (e) {
      /* 만약 동적 form 생성 자체가 실패하면 바로 완료 처리 */
      done();
    }
  }


  /* ══════════════════════════════════════════════
   *  Karrot Pixel
   * ══════════════════════════════════════════════ */
  function fireKarrot() {
    try {
      if (window.karrotPixel && window.karrotPixel.track) {
        window.karrotPixel.track('SubmitApplication');
      }
    } catch (e) {}
  }


  /* ══════════════════════════════════════════════
   *  PC 폼
   * ══════════════════════════════════════════════ */
  var pcBusy = false;

  function pcValidate() {
    var name  = $.trim($('#pc_name').val() || '');
    var phone = String($('#pc_phone').val() || '').replace(/[^0-9]/g, '');
    var field = $('#pc_select').val();
    var agree = $('#agree12').is(':checked');

    $('#pc_phone').val(phone);
    $('#pc_name, #pc_phone, #pc_select, #agree12').removeClass('error_input');

    if (!(/^[가-힣a-zA-Z\s]+$/.test(name) && name.length > 1)) {
      $('#pc_name').addClass('error_input');
      pcSetBtn(false, '성함 입력을 확인하세요.');
      return false;
    }
    if (!(phone.length === 11 && phone.substr(0, 3) === '010' && /^[0-9]+$/.test(phone))) {
      $('#pc_phone').addClass('error_input');
      pcSetBtn(false, '전화번호 입력을 확인하세요.');
      return false;
    }
    if (!field) {
      $('#pc_select').addClass('error_input');
      pcSetBtn(false, '상담 유형을 확인하세요.');
      return false;
    }
    if (!agree) {
      $('#agree12').addClass('error_input');
      pcSetBtn(false, '개인정보 동의를 확인하세요.');
      return false;
    }

    pcSetBtn(true, '');
    return true;
  }

  function pcSetBtn(valid, msg) {
    if (valid) {
      $('#pc_btn').prop('disabled', false).text('상담 신청')
        .css({ background: '#AC9173', color: '#fff', border: '1px solid #fff', cursor: 'pointer' });
    } else {
      $('#pc_btn').prop('disabled', true).text('상담 신청')
        .css({ background: '#000', color: '#fff', cursor: 'default' });
    }
    $('#pc_alert').text(msg);
  }

  function pcSubmit() {
    if (pcBusy) return;
    if (!pcValidate()) return;
    pcBusy = true;

    $('#pc_btn').prop('disabled', true).text('전송 중')
      .css({ background: '#000', color: '#fff', cursor: 'default' });
    $('#pc_alert').text('신청 정보를 전송하고 있습니다.');

    submitToGoogleForm({
      'entry.1918755835': 'pc 플로팅 메뉴 신청',
      'entry.569078713':  $.trim($('#pc_name').val()),
      'entry.845785171':  String($('#pc_phone').val()).replace(/[^0-9]/g, ''),
      'entry.1553321640': $('#pc_select').val()
    }, function () {
      $('#pc_btn').text('신청완료');
      $('#pc_alert').text('신청이 완료되었습니다.');
      alert('상담 신청이 완료되었습니다.');
      window.location.href = './thanks.html';
    });
  }


  /* ══════════════════════════════════════════════
   *  모바일 폼
   * ══════════════════════════════════════════════ */
  var mobBusy = false;

  function mobValidate() {
    var name  = $.trim($('#mob_name').val() || '');
    var phone = String($('#mob_phone').val() || '').replace(/[^0-9]/g, '');
    var field = $('#mob_select').val();
    var agree = $('#agree13').is(':checked');

    $('#mob_phone').val(phone);
    $('#mob_name, #mob_phone, #mob_select, #agree13').removeClass('error_input');

    if (!(/^[가-힣a-zA-Z\s]+$/.test(name) && name.length > 1)) {
      $('#mob_name').addClass('error_input');
      mobSetBtn(false, '성함 입력을 확인하세요.');
      return false;
    }
    if (!(phone.length === 11 && phone.substr(0, 3) === '010' && /^[0-9]+$/.test(phone))) {
      $('#mob_phone').addClass('error_input');
      mobSetBtn(false, '전화번호 입력을 확인하세요.');
      return false;
    }
    if (!field) {
      $('#mob_select').addClass('error_input');
      mobSetBtn(false, '상담 유형을 확인하세요.');
      return false;
    }
    if (!agree) {
      $('#agree13').addClass('error_input');
      mobSetBtn(false, '개인정보 동의를 해주세요');
      return false;
    }

    mobSetBtn(true, '');
    return true;
  }

  function mobSetBtn(valid, msg) {
    if (valid) {
      $('#mob_btn').prop('disabled', false).text('무료 상담 신청하기')
        .css({ color: '#fff', background: '#ac9173', cursor: 'pointer' });
      $('.m_go_btn').css({ background: '#ac9173', cursor: 'pointer' });
    } else {
      $('#mob_btn').prop('disabled', true).text(msg)
        .css({ color: '#fff', background: '#000', cursor: 'default' });
      $('.m_go_btn').css({ background: '#000', cursor: 'default' });
    }
  }

  function mobSubmit() {
    if (mobBusy) return;
    if (!mobValidate()) return;
    mobBusy = true;

    $('#mob_btn').prop('disabled', true).text('전송 중')
      .css({ color: '#fff', background: '#000', cursor: 'default' });
    $('.m_go_btn').css({ background: '#000', cursor: 'default' });

    submitToGoogleForm({
      'entry.1918755835': 'mobile 신청',
      'entry.569078713':  $.trim($('#mob_name').val()),
      'entry.845785171':  String($('#mob_phone').val()).replace(/[^0-9]/g, ''),
      'entry.1553321640': $('#mob_select').val()
    }, function () {
      $('#mob_btn').text('신청이 완료되었습니다.');
      alert('상담 신청이 완료되었습니다.');
      window.location.href = './thanks.html';
    });
  }


  /* ══════════════════════════════════════════════
   *  전화번호 토글
   * ══════════════════════════════════════════════ */
  function togglePhonesStart() {
    if (!$('.tel-seoul').length || !$('.tel-daejeon').length) return;
    function loop() {
      $('.tel-seoul').fadeIn(1000).delay(2000).fadeOut(1000, function () {
        $('.tel-daejeon').fadeIn(1000).delay(2000).fadeOut(1000, loop);
      });
    }
    $('.tel-daejeon').hide();
    loop();
  }


  /* ══════════════════════════════════════════════
   *  DOM Ready
   * ══════════════════════════════════════════════ */
  $(function () {

    /* form 기본 submit 차단 */
    $('#form_e12, #form_e13').on('submit', function (e) {
      e.preventDefault();
      return false;
    });

    /* PC */
    pcValidate();
    $('#pc_btn').on('click', function (e) { e.preventDefault(); pcSubmit(); return false; });
    $('#pc_name, #pc_phone, #pc_select, #agree12').on('keyup click change input', function () {
      if (!pcBusy) pcValidate();
    }).on('click change input', function () { $(this).removeClass('error_input'); });

    /* 모바일 */
    mobValidate();
    $('#mob_btn').on('click', function (e) { e.preventDefault(); mobSubmit(); return false; });
    $('#mob_name, #mob_phone, #mob_select, #agree13').on('keyup click change input', function () {
      if (!mobBusy) mobValidate();
    }).on('click change input', function () { $(this).removeClass('error_input'); });

    /* 전화번호 토글 */
    togglePhonesStart();
  });


  /* 전역 노출 */
  window.form_check1 = pcValidate;
  window.form_check2 = mobValidate;
  window.maxLengthCheck = function (obj) {
    if (obj.value.length > obj.maxLength) obj.value = obj.value.slice(0, obj.maxLength);
  };

})(jQuery);