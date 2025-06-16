/* ───────────────────────────
   1. Navigation & Phone 버튼
───────────────────────────*/
/* 모바일 메뉴 토글 */
function toggleMobile(){
    const panel   = document.getElementById('mobilePanel');
    const burger  = document.getElementById('hamburgerBtn');
    const nav     = document.getElementById('mainNav');
    const logoImg = document.getElementById('logoImg');
  
    panel.classList.toggle('show');
    burger.classList.toggle('open');
    nav.classList.toggle('menu-open', panel.classList.contains('show'));
  
    if (window.pageYOffset === 0){
      logoImg.src = panel.classList.contains('show')
        ? logoImg.dataset.srcDark
        : logoImg.dataset.srcLight;
    }
  }
  
  /* 스크롤 효과 */
  const nav      = document.getElementById('mainNav');
  const logoImg  = document.getElementById('logoImg');
  let lastY      = window.pageYOffset;
  
  function onScroll(){
    const y = window.pageYOffset;
    if (y === 0){
      nav.classList.add('transparent');
      nav.classList.remove('solid');
      logoImg.src = logoImg.dataset.srcLight;
    } else {
      nav.classList.remove('transparent');
      nav.classList.add('solid');
      logoImg.src = logoImg.dataset.srcDark;
      nav.classList.remove('menu-open');
      document.getElementById('hamburgerBtn').classList.remove('open');
      document.getElementById('mobilePanel').classList.remove('show');
    }
    if (y > lastY && y > 50) nav.classList.add('hide');
    else nav.classList.remove('hide');
    lastY = y;
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
  
  /* 전화 버튼 로테이션 */
  const callData = [
    { lines:["24시간 비밀상담 (형사)", "서울 : 02-6954-0378"], tel:"0269540378" },
    { lines:["24시간 비밀상담 (송무)", "대전 : 042-721-0606"], tel:"0427210606" }
  ];
  const swapDelay = 4000;
  const fadeDur   = 350;
  const phoneBtns = Array.from(document.querySelectorAll(".phone-btn"));
  const txtSpans  = phoneBtns.map(btn=>btn.querySelector(".txt"));
  let callIdx = 0;
  function setContent(lines,tel){
    txtSpans.forEach(s=>s.innerHTML=`${lines[0]}<br>${lines[1]}`);
    phoneBtns.forEach(b=>b.href=`tel:${tel}`);
  }
  function swapPhoneMsg(){
    callIdx = (callIdx + 1) % callData.length;
    txtSpans.forEach(s=>s.style.opacity=0);
    setTimeout(()=>{
      const {lines,tel} = callData[callIdx];
      setContent(lines,tel);
      txtSpans.forEach(s=>s.style.opacity=1);
    }, fadeDur);
  }
  setContent(callData[0].lines, callData[0].tel);
  setInterval(swapPhoneMsg, swapDelay);
  
  /* ───────────────────────────
     2. Criminal-solution 데모
  ───────────────────────────*/
  setTimeout(()=>{
    document.getElementById('glory-criminal-solution')
            .style.setProperty('--dim','.6');
  },2000);
  
  /* ───────────────────────────
     3. #late-response 숫자 카운트
  ───────────────────────────*/
  function animateCount(el,t){
    const dur=1900,start=performance.now();
    (function step(now){
      const p=Math.min((now-start)/dur,1);
      el.firstChild.nodeValue=Math.floor(p*t).toLocaleString();
      if(p<1)requestAnimationFrame(step);
    })(start);
  }
  document.addEventListener("DOMContentLoaded",()=>{
    const num=document.querySelector("#late-response .lr-status-number");
    const tgt=+num.dataset.target;let once=false;
    new IntersectionObserver(e=>{
      if(e[0].isIntersecting&&!once){once=true;animateCount(num,tgt);}
    },{threshold:.5}).observe(num);
  });
  setTimeout(()=>document.getElementById('late-response')
          .style.setProperty('--lr-bright','.5'),2000);
  
  /* ───────────────────────────
     4. #case-section 숫자 카운트
  ───────────────────────────*/
  function animateCountCase(el,target){
    const dur=1900,start=performance.now();
    (function tick(now){
      const p=Math.min((now-start)/dur,1);
      el.firstChild.nodeValue=Math.floor(p*target).toLocaleString();
      if(p<1)requestAnimationFrame(tick);
    })(start);
  }
  document.addEventListener("DOMContentLoaded",()=>{
    const el=document.querySelector("#case-section .lr-status-number");
    const tgt=+el.dataset.target;let once=false;
    new IntersectionObserver(e=>{
      if(e[0].isIntersecting&&!once){once=true;animateCountCase(el,tgt);}
    },{threshold:.5}).observe(el);
  });
  setTimeout(()=>document.getElementById('case-section')
          .style.setProperty('--case-bright','.3'),3000);
  
  /* ───────────────────────────
     5. #final-section 숫자 카운트
  ───────────────────────────*/
  function animateCountFinal(el,target){
    const dur=1900,start=performance.now();
    (function frame(now){
      const p=Math.min((now-start)/dur,1);
      el.firstChild.nodeValue=Math.floor(p*target).toLocaleString();
      if(p<1)requestAnimationFrame(frame);
    })(start);
  }
  document.addEventListener("DOMContentLoaded",()=>{
    const sec=document.getElementById("final-section");
    const num=sec?.querySelector(".lr-status-number");
    if(!num)return;
    const tgt=+num.dataset.target;let once=false;
    new IntersectionObserver(e=>{
      if(e[0].isIntersecting&&!once){once=true;animateCountFinal(num,tgt);}
    },{threshold:.5}).observe(num);
  });
  setTimeout(()=>document.getElementById('final-section')
          .style.setProperty('--final-bright','.35'),2500);
  
  /* ───────────────────────────
     6. Visual-section 페이드-인
  ───────────────────────────*/
  document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("visual-section");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add("animate");
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(section);
  });
  
  /* ───────────────────────────
     7. Attorney Profile 스위치
  ───────────────────────────*/
  const LAWYERS={
    lee:{photo:"./img/law-lee.png",caption:"대표 변호사 이아무",name:"이아무",position:"대표변호사",
         phone:"전문적이고 민첩한 대응으로 최상의 결과를 약속합니다",
         edu:["법무법인 글로리 대표변호사","前 법무법인 로앤 서울사무소 변호사","前 법무법인 로앤 대전사무소 대표변호사"],
         career:["용산구 지방세심의위원","광명시청 계약심의위원","前) 광명시청·동작구청 고문변호사",
                 "前) 경기도 갈등조정위원","前) 국가배상심의위원회 심의위원장"]},
    kim:{photo:"./img/law-kim.png",caption:"김민희 파트너 변호사 ",name:"김민희",position:"파트너변호사",
         phone:"형사전문변호사",
         edu:["법무법인 글로리 변호사","前 법무법인 세계로","前 법무법인 상생","前 법률사무소 가연","前 법무법인 21세기종합법률사무소"],
         career:["대전지방법원 국선변호인","대전가정법원 국선보조인","제1지역군사법원 국선변호사","사망장병 유족 및 군범죄 피해자 국선변호사","한국에너지기술연구원 감사처분심의위원회 외부위원","유성경찰서 수사민원상담변호사","前 둔산경찰서 수사민원상담변호사","대한변호사협회인증 형사 전문변호사","대한변호사협회인증 손해배상 전문변호사"]}
  };
  Object.values(LAWYERS).forEach(v=>new Image().src=v.photo);
  const apSec   = document.getElementById('attorney-profile');
  const apInfo  = apSec.querySelector('.ap-info');
  const mainPhoto = apSec.querySelector('.main-photo');
  const cap   = apSec.querySelector('.ap-caption');
  const lname = apSec.querySelector('.ap-lname');
  const pos   = apSec.querySelector('.ap-position');
  const phone = apSec.querySelector('.ap-phone');
  const eduUl = apSec.querySelector('.ap-edu');
  const carUl = apSec.querySelector('.ap-career');
  const btns  = apSec.querySelectorAll('.ap-select button');
  
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.classList.contains('on'))return;
      btns.forEach(b=>b.classList.toggle('on',b===btn));
      const d=LAWYERS[btn.dataset.lawyer];
      apInfo.classList.add('switching');
      mainPhoto.style.opacity=0;
      mainPhoto.style.transform='scale(1.08)';
      mainPhoto.style.filter='blur(6px)';
      const tmp=new Image();
      tmp.onload=()=>{
        mainPhoto.src=tmp.src;
        requestAnimationFrame(()=>{
          mainPhoto.style.opacity=1;
          mainPhoto.style.transform='scale(1)';
          mainPhoto.style.filter='blur(0)';
        });
        cap.textContent=d.caption;
        lname.textContent=d.name; pos.textContent=d.position;
        phone.textContent=d.phone;
        phone.href='tel:'+d.phone.replace(/\s/g,'');
        eduUl.innerHTML=d.edu.map(v=>`<li>${v}</li>`).join('');
        carUl.innerHTML=d.career.map(v=>`<li>${v}</li>`).join('');
        setTimeout(()=>apInfo.classList.remove('switching'),500);
      };
      tmp.src=d.photo;
    });
  });
  
  /* ───────────────────────────
     8. #business-area 슬라이더
  ───────────────────────────*/
  (function(){
    const slider   = document.querySelector('#business-area .ba-slider');
    if(!slider) return;
    const cards    = Array.from(slider.children);
    const prevBtn  = document.querySelector('#business-area .ba-prev');
    const nextBtn  = document.querySelector('#business-area .ba-next');
    const modal    = document.querySelector('#business-area .ba-modal');
    const titleEl  = modal.querySelector('.ba-modal-title');
    const descEl   = modal.querySelector('.ba-modal-desc');
    const extraEl  = modal.querySelector('.ba-modal-extra');
    const closeBtn = modal.querySelector('.ba-modal-close');
    const progFill = document.querySelector('#business-area .ba-progress-fill');
    const modalContent = modal.querySelector('.ba-modal-content');
  
    let idx = 0;
    let startX = 0, curr = 0, prevTranslate = 0;
    let isDragging = false, animId = 0;
  
    function visibleCount(){
      const w = window.innerWidth;
      if (w < 600) return 1.5;
      if (w < 1024) return 2.3;
      return 4;
    }
    function cardWidth(){
      return cards[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
    }
    function clamp(n){
      const per = visibleCount(), max = cards.length - per;
      return Math.min(Math.max(n,0), max);
    }
    function setPos(x){ slider.style.transform = `translateX(${x}px)`; }
    function update(){
      idx = clamp(idx);
      prevTranslate = -idx * cardWidth();
      setPos(prevTranslate);
      cards.forEach((c,i)=> c.classList.toggle('active', i===idx));
      updateProgress();
    }
    function updateProgress(){
      const total = cards.length - visibleCount() + 1;
      const pct   = (idx/(total-1))*100;
      progFill.style.width = pct + '%';
    }
  
    prevBtn.addEventListener('click', ()=>{ idx--; update(); });
    nextBtn.addEventListener('click', ()=>{ idx++; update(); });
    window.addEventListener('resize', update);
  
    function animate(){ setPos(curr); animId = requestAnimationFrame(animate); }
    function onStart(x){
      startX = x; isDragging = false;
      curr = prevTranslate;
      animId = requestAnimationFrame(animate);
      slider.classList.add('dragging');
    }
    function onMove(x){
      const dx = x - startX;
      if (!isDragging && Math.abs(dx) > 5) isDragging = true;
      curr = prevTranslate + dx;
    }
    function onEnd(){
      cancelAnimationFrame(animId);
      slider.classList.remove('dragging');
      if (isDragging){
        const diff = curr - prevTranslate;
        if (diff < -cardWidth()/2) idx++;
        if (diff >  cardWidth()/2) idx--;
        update();
      }
      curr = prevTranslate = -idx * cardWidth();
    }
  
    slider.addEventListener('mousedown', e=> onStart(e.clientX));
    slider.addEventListener('mousemove', e=> onMove(e.clientX));
    slider.addEventListener('mouseup',   onEnd);
    slider.addEventListener('mouseleave',onEnd);
    slider.addEventListener('touchstart',e=> onStart(e.touches[0].clientX));
    slider.addEventListener('touchmove', e=> onMove(e.touches[0].clientX));
    slider.addEventListener('touchend',  onEnd);
  
    cards.forEach(card=>{
      card.addEventListener('click', ()=>{
        if (isDragging) return;
        titleEl.textContent = card.dataset.title;
        descEl.textContent  = card.dataset.desc;
        extraEl.innerHTML   = card.querySelector('.ba-card-extra').innerHTML;
        modal.setAttribute('aria-hidden','false');
        document.body.classList.remove('modal-open');
        modalContent.classList.remove('animate');
        void modalContent.offsetWidth;
        modalContent.classList.add('animate');
      });
    });
    closeBtn.addEventListener('click', ()=>{
      modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('modal-open');
      modalContent.classList.remove('animate');
    });
    modal.addEventListener('click', e=>{
      if (e.target===modal||e.target===modal.querySelector('.ba-backdrop')){
        modal.setAttribute('aria-hidden','true');
        document.body.classList.remove('modal-open');
        modalContent.classList.remove('animate');
      }
    });
  
    update();
  })();
  
  /* ───────────────────────────
     9. #business-area-2 슬라이더
  ───────────────────────────*/
  (function(){
    const slider   = document.querySelector('#business-area-2 .ba-slider');
    if(!slider) return;
    const cards    = Array.from(slider.children);
    const prevBtn  = document.querySelector('#business-area-2 .ba-prev');
    const nextBtn  = document.querySelector('#business-area-2 .ba-next');
    const modal    = document.querySelector('#business-area-2 .ba-modal');
    const titleEl  = modal.querySelector('.ba-modal-title');
    const descEl   = modal.querySelector('.ba-modal-desc');
    const extraEl  = modal.querySelector('.ba-modal-extra');
    const closeBtn = modal.querySelector('.ba-modal-close');
    const progFill = document.querySelector('#business-area-2 .ba-progress-fill');
    const modalContent = modal.querySelector('.ba-modal-content');
  
    let idx = 0;
    let startX = 0, curr = 0, prevTranslate = 0;
    let isDragging = false, animId = 0;
  
    function visibleCount(){
      const w = window.innerWidth;
      if (w < 600) return 1.5;
      if (w < 1024) return 2.3;
      return 4;
    }
    function cardWidth(){
      return cards[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
    }
    function clamp(n){
      const per = visibleCount(), max = cards.length - per;
      return Math.min(Math.max(n,0), max);
    }
    function setPos(x){ slider.style.transform = `translateX(${x}px)`; }
    function update(){
      idx = clamp(idx);
      prevTranslate = -idx * cardWidth();
      setPos(prevTranslate);
      cards.forEach((c,i)=> c.classList.toggle('active', i===idx));
      updateProgress();
    }
    function updateProgress(){
      const total = cards.length - visibleCount() + 1;
      const pct   = (idx/(total-1))*100;
      progFill.style.width = pct + '%';
    }
  
    prevBtn.addEventListener('click', ()=>{ idx--; update(); });
    nextBtn.addEventListener('click', ()=>{ idx++; update(); });
    window.addEventListener('resize', update);
  
    function animate(){ setPos(curr); animId = requestAnimationFrame(animate); }
    function onStart(x){
      startX = x; isDragging = false;
      curr = prevTranslate;
      animId = requestAnimationFrame(animate);
      slider.classList.add('dragging');
    }
    function onMove(x){
      const dx = x - startX;
      if (!isDragging && Math.abs(dx) > 5) isDragging = true;
      curr = prevTranslate + dx;
    }
    function onEnd(){
      cancelAnimationFrame(animId);
      slider.classList.remove('dragging');
      if (isDragging){
        const diff = curr - prevTranslate;
        if (diff < -cardWidth()/2) idx++;
        if (diff >  cardWidth()/2) idx--;
        update();
      }
      curr = prevTranslate = -idx * cardWidth();
    }
  
    slider.addEventListener('mousedown', e=> onStart(e.clientX));
    slider.addEventListener('mousemove', e=> onMove(e.clientX));
    slider.addEventListener('mouseup',   onEnd);
    slider.addEventListener('mouseleave',onEnd);
    slider.addEventListener('touchstart',e=> onStart(e.touches[0].clientX));
    slider.addEventListener('touchmove', e=> onMove(e.touches[0].clientX));
    slider.addEventListener('touchend',  onEnd);
  
    cards.forEach(card=>{
      card.addEventListener('click', ()=>{
        if (isDragging) return;
        titleEl.textContent = card.dataset.title;
        descEl.textContent  = card.dataset.desc;
        extraEl.innerHTML   = card.querySelector('.ba-card-extra').innerHTML;
        modal.setAttribute('aria-hidden','false');
        document.body.classList.remove('modal-open');
        modalContent.classList.remove('animate');
        void modalContent.offsetWidth;
        modalContent.classList.add('animate');
      });
    });
    closeBtn.addEventListener('click', ()=>{
      modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('modal-open');
      modalContent.classList.remove('animate');
    });
    modal.addEventListener('click', e=>{
      if (e.target===modal||e.target===modal.querySelector('.ba-backdrop')){
        modal.setAttribute('aria-hidden','true');
        document.body.classList.remove('modal-open');
        modalContent.classList.remove('animate');
      }
    });
  
    update();
  })();
  
  /* ───────────────────────────
     10. #glory-office 페이드 & 슬라이더
  ───────────────────────────*/
  (function(){
    // fade-in
    const obs = new IntersectionObserver((es)=>{
      es.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.2});
    document.querySelectorAll('#glory-office [data-fade]')
            .forEach(el=> obs.observe(el));
  
    // gallery slider
    const container = document.querySelector('#glory-office .go-slides');
    if(!container) return;
    const prev      = document.querySelector('#glory-office .go-prev');
    const next      = document.querySelector('#glory-office .go-next');
    const slides    = Array.from(container.children);
    let idx         = 0;
    function slideSize() {
      const w   = container.children[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(container).gap) || 0;
      return { step: w + gap, visible: window.innerWidth > 600 ? 3 : 1 };
    }
    function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }
    function moveTo(newIdx) {
      const { step, visible } = slideSize();
      const maxIdx = slides.length - visible;
      idx = clamp(newIdx, 0, maxIdx);
      container.style.transition = 'transform .5s ease';
      container.style.transform  = `translateX(-${idx * step}px)`;
    }
    prev.addEventListener('click', () => moveTo(idx - 1));
    next.addEventListener('click', () => moveTo(idx + 1));
    window.addEventListener('resize', () => moveTo(idx));
  
    let startX = 0, originTranslate = 0, isDown = false;
    container.style.touchAction = 'pan-y';
    container.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.clientX;
      originTranslate = new WebKitCSSMatrix(getComputedStyle(container).transform).m41;
      container.style.transition = 'none';
      container.setPointerCapture(e.pointerId);
    });
    container.addEventListener('pointermove', e => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      const { step, visible } = slideSize();
      const maxT = 0;
      const minT = -((slides.length - visible) * step);
      let tx = originTranslate + dx;
      tx = clamp(tx, minT, maxT);
      container.style.transform = `translateX(${tx}px)`;
    });
    function endDrag(e) {
      if (!isDown) return;
      isDown = false;
      const dxTotal = e.clientX - startX;
      const { step } = slideSize();
      const threshold = step / 4;
      if (dxTotal < -threshold) moveTo(idx + 1);
      else if (dxTotal > threshold) moveTo(idx - 1);
      else moveTo(idx);
      container.releasePointerCapture(e.pointerId);
    }
    container.addEventListener('pointerup',   endDrag);
    container.addEventListener('pointercancel', endDrag);
    container.addEventListener('lostpointercapture', endDrag);
    moveTo(0);
  })();


  // Progress Bar 생성
  const slides = Array.from(document.querySelectorAll('.swiper-container .swiper-slide'))
                      .filter(s => !s.classList.contains('swiper-slide-duplicate'));
  const bar = document.querySelector('.progress-container');
  const fills = [];

  slides.forEach((_, i) => {
    const seg = document.createElement('div');
    seg.className = 'progress-segment';
    const fill = document.createElement('span');
    fill.className = 'progress-fill';
    seg.appendChild(fill);
    bar.appendChild(seg);
    fills.push(fill);

    seg.addEventListener('click', () => swiper.slideToLoop(i, SPEED));
  });

  function updateProgress(idx) {
    fills.forEach((f, j) => {
      f.style.transition = 'none';
      f.style.width = j < idx ? '100%' : '0';
    });
    const active = fills[idx];
    void active.offsetWidth;
    active.style.transition = `width ${DELAY}ms linear`;
    active.style.width = '100%';
  }

  updateProgress(0);
  swiper.on('slideChange', () => updateProgress(swiper.realIndex));
  




  
