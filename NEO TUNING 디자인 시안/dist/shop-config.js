// 업체 교체 시 이 파일만 수정하세요. 빈 문자열 ""은 화면에서 숨겨집니다.
window.SHOP_CONFIG = {
  name: "NEO TUNING",
  introduction: "", // 실제 매장 소개. 줄바꿈은 \n으로 입력
  phone: "", // 예: 02-123-4567
  address: "",
  hours: "", // 예: 월–토 10:00–19:00\n일요일 휴무
  visitNote: "", // 주차·방문 예약 안내
  mapUrl: "", // 네이버/카카오 지도 등의 https:// 링크
  channels: [
    // { label: "카카오톡 상담", url: "https://pf.kakao.com/실제채널/chat" },
    // { label: "네이버 예약", url: "https://실제예약주소" },
  ],
  services: [
    { title: "컬러 랩핑", caption: "Colour", description: "전체 컬러 변경부터 부분 포인트까지.\n원하는 색과 마감을 함께 정합니다.", image: "assets/wrapping.jpg", alt: "그린 컬러 차량 참고 사진" },
    { title: "외장 튜닝", caption: "Contour", description: "휠의 디자인과 비율을 중심으로.\n차량 규격에 맞는 외관을 상담합니다.", image: "assets/wheels.jpg", alt: "포르쉐 휠 참고 사진" },
    { title: "맞춤 커스텀", caption: "Signature", description: "배기와 디테일, 작업 범위까지.\n원하는 방향을 구체적으로 정리합니다.", image: "assets/exhaust.jpg", alt: "배기 팁 참고 사진" },
  ],
};
