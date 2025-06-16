


// 즉시 실행 함수로 감싸서 전역 오염 방지
(function(){
  // 1) #menu 에 네비 코드 삽입
  const menuContainer = document.getElementById('menu');
  if (!menuContainer) return;

  menuContainer.innerHTML = `
    <nav id="mainNav" class="top-nav transparent">
      <div class="logo-group">
        <a href="./index.html">
          <img id="logoImg"
               src="./img/logo-white.png"
               data-src-light="./img/logo-white.png"
               data-src-dark="./img/logo_on.png"
               alt="법무법인 글로리 로고">
        </a>
      </div>
    
      <div class="menu">
        <a href="./case1.html">경찰 &amp; 검찰 수사단계</a>
        <a href="./case2.html">법원단계</a>
        <a href="./location.html">오시는길</a>
        <a href="./consulting.html">긴급상담</a>
      </div>
    
      <div class="right">
        <a class="phone-btn" href="#"><span class="txt"></span></a>
      </div>
    
      <button id="hamburgerBtn" class="hamburger" onclick="toggleMobile()">
        <span></span><span></span><span></span>
      </button>
    
      <div id="mobilePanel" class="mobile-panel">
        <a href="./case1.html">경찰 &amp; 검찰 수사단계</a>
        <a href="./case2.html">법원단계</a>
        <a href="./location.html">오시는길</a>
        <a href="./consulting.html">긴급상담</a>
        <div class="mobile-contact">
          <a class="phone-btn" href="#"><span class="txt"></span></a>
        </div>
      </div>
    </nav>
  `;

  // 2) 토글·스크롤·전화번호 로테이션에 필요한 요소들 캐싱
  const mainNav      = menuContainer.querySelector('#mainNav');
  const logoImg      = menuContainer.querySelector('#logoImg');
  const mobilePanel  = menuContainer.querySelector('#mobilePanel');
  const hamburgerBtn = menuContainer.querySelector('#hamburgerBtn');
  const phoneBtns    = Array.from(menuContainer.querySelectorAll('.phone-btn'));
  const txtSpans     = phoneBtns.map(btn => btn.querySelector('.txt'));


  //
  // 4) 스크롤 시 배경/로고/숨김 효과
  //
  let lastY = window.pageYOffset;
  function onScroll(){
    const y = window.pageYOffset;
    if (y === 0) {
      mainNav.classList.add('transparent');
      mainNav.classList.remove('solid');
      logoImg.src = logoImg.dataset.srcLight;
    } else {
      mainNav.classList.remove('transparent');
      mainNav.classList.add('solid');
      logoImg.src = logoImg.dataset.srcDark;
      // 모바일 메뉴 닫기
      mainNav.classList.remove('menu-open');
      hamburgerBtn.classList.remove('open');
      mobilePanel.classList.remove('show');
    }
    // 아래로 스크롤하면 숨기기
    if (y > lastY && y > 50) mainNav.classList.add('hide');
    else mainNav.classList.remove('hide');
    lastY = y;
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  //
  // 5) 전화 버튼 4초 로테이션
  //
  const callData = [
    { lines:["24시간 비밀상담 (형사)", "서울 : 02-6954-0378"], tel:"0269540378" },
    { lines:["24시간 비밀상담 (송무)", "대전 : 042-721-0606"], tel:"0427210606" }
  ];
  const swapDelay = 4000, fadeDur = 350;
  let callIdx = 0;

  function setContent(lines, tel){
    txtSpans.forEach(s => s.innerHTML = `${lines[0]}<br>${lines[1]}`);
    phoneBtns.forEach(b => b.setAttribute('href', `tel:${tel}`));
  }

  function swapPhoneMsg(){
    callIdx = (callIdx + 1) % callData.length;
    // fade out
    txtSpans.forEach(s => {
      s.style.transition = `opacity ${fadeDur}ms`;
      s.style.opacity = 0;
    });
    setTimeout(()=>{
      const {lines, tel} = callData[callIdx];
      setContent(lines, tel);
      // fade in
      txtSpans.forEach(s => s.style.opacity = 1);
    }, fadeDur);
  }

  setContent(callData[0].lines, callData[0].tel);
  setInterval(swapPhoneMsg, swapDelay);
})();


