const footer = document.getElementById('footer_template');
footer.innerHTML = `
<section id="footer-section">
  <!-- 상단: 로고 + 네비 -->
  <div class="footer-top">
    <div class="footer-logo">
      <img src="https://glorylawfirm-crime.com/intro/img/f_logo.png" alt="법무법인 글로리 이혼가사센터 로고">
    </div>
   
  </div>

  <!-- 본문: 왼쪽 기관정보 + 오른쪽 링크리스트 -->
  <div class="footer-main">
    <div class="footer-info">
      <p>상호 : 법무법인 글로리  사업자등록번호 : 604-86-02992<br>대표변호사 : 이아무  대표번호 : <a href="tel:15440904">1544-0904</a><br>이메일 : <a href="mailto:glorylawfirm@daum.net">glorylawfirm@daum.net</a></p>
      <p>서울본사 : 서울특별시 강남구 테헤란로8길 13, 9층 (역삼동, WD빌딩) │ TEL : 02-6954-0378(송무) │ FAX : 02-6954-0878</p>
      <p>대전지점 : 대전광역시 서구 둔산중로 78번길 26, 민석타워 3층 301호 │ TEL : 042-721-0606(송무) │ FAX : 042-721-0707</p>

    </div>
    <div class="footer-links">
      <div class="footer-col">
        <h4>카테고리</h4>
        <ul>
          <li><a href="./case1.html">경찰 & 검찰 수사단계</a></li>
          <li><a href="./case2.html">법원단계</a></li>
          <li><a href="./location.html">오시는길</a></li>
          <li><a href="./consulting.html">긴급상담</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>커뮤니티</h4>
        <ul>
        <li><a href="https://glorylawfirm.kr/kor/main/">공식 홈페이지</a></li>  
        <li><a href="https://glorylawfirm.kr/kor/revive/">회생파산센터</a></li>
        <li><a href="https://glorylawfirm.kr/kor/divorce/">이혼/상속센터</a></li>
        <li><a href="https://blog.naver.com/glorylawfirm3">글로리 형사센터 블로그</a></li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 저작권 -->
  <div class="footer-copy">
    <small>Copyright © 2025 Law Firm Glory. All Rights Reserved.</small>
  </div>
</section>


	
`;

document.body.appendChild(footer.content);