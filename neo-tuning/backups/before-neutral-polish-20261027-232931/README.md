# NEO TUNING

Lightweight Korean car tuning portfolio prototype. Static HTML, CSS, and JavaScript in `dist/`; no build dependencies. Run `npm run dev` for local preview on port 4173. The quote form is a local demonstration only: it does not send or store data.

## Images

Source links and photographer attribution are available in the website footer. Unsplash photos illustrate the brand concept. The Porsche wrap before/after pair is an external reference from Monarch Media Designs, explicitly labeled and linked; it is not a NEO TUNING job or customer testimonial. Reuse licensing for the Monarch photographs has not been verified; replace with licensed or client-owned photos before commercial release.

## Local handoff

The user requested local storage only and cancelled deployment. Open `NEO TUNING.html` directly in a browser. This standalone export embeds CSS, JavaScript, and all photos and makes no external requests. The source credit links open only when clicked. After editing the source, run `node export-local.mjs` to refresh it.

## Hosting (inactive)

A Site registration was created before the user cancelled deployment. No source was uploaded and no version was published. Do not deploy without a new user request. If hosting is requested later, reuse the project ID in `.openai/hosting.json`.

## 사진 중심 리디자인 — 2026-10-27

- 바탕은 차콜 `#252724`, 글자는 아이보리 `#f3f2eb`, 상담 버튼은 살구색 `#f19a72`로 정리했습니다. 흰색 구간과 장식 띠를 제거했습니다.
- 대표 사진, 큰 전후 사진, 높이가 다른 서비스 사진을 배치하고 사진 가까이에 설명과 상담 경로를 붙였습니다.
- 전후 참고 사진은 촬영 각도가 달라 겹치는 슬라이더를 사용하지 않습니다. 두 장을 나란히 표시하며 모바일에서는 세로로 이어집니다. 확대 창에서는 전후를 전환할 수 있습니다.
- 내보내기 코드가 Google Fonts 주소 안의 세미콜론에서 CSS를 잘라 색상 변수를 무효화하던 오류를 수정했습니다. 현재는 외부 폰트 없이 시스템 글꼴을 쓰고 CSS 전체를 그대로 포함합니다.
- 변경 전 소스는 `backups/before-photo-redesign/`에 보관했습니다.

### 확인한 내용

앱 내 브라우저에서 데스크톱 1440×1000, 태블릿 768×1024, 모바일 390×844 및 320×740 화면을 확인했습니다. 1920px 너비는 레이아웃 경계도 검사했습니다. 가로 넘침, 대표 차량 잘림, 어두운 배경의 검은 글씨가 관찰되지 않았습니다. 메뉴, 서비스 선택 연결, 사진 확대·전후 전환, 상담 내용 확인 창, 출처 창을 실제로 조작했습니다. 브라우저 경고·오류 로그는 없었습니다. 보관용 단일 HTML도 임시 로컬 주소에서 열어 내장 이미지, 색상 변수, 메뉴 동작을 확인했습니다.

실물 휴대전화와 Safari에서는 확인하지 않았습니다. 상담은 저장·전송되지 않는 데모입니다. 실제 업체의 연락처·접수 경로가 없으므로 임의의 전화번호나 메신저 주소는 만들지 않았습니다.

### 보완할 촬영 자료

현재 전후 사진은 각각 480×640px이므로 큰 모니터에서는 선명도가 부족합니다. 참고 사진마다 촬영 환경도 달라 동일 업체의 작업물처럼 완전히 통일할 수 없습니다.

1. 대표 차량: 동일 차량의 전면 3/4 가로 사진(긴 변 2500px 이상)과 세로 사진. 차량 전체를 프레임에 넣고 제목을 놓을 여백을 확보합니다.
2. 시공 전후: 같은 위치·거리·높이·조명·방향에서 촬영한 두 장. 전면 3/4와 후면 3/4를 각각 한 쌍씩 준비하면 비교하기 좋습니다.
3. 작업장: 실제 공간 전경, 작업 중인 손과 도구, 부품 장착 전후 디테일.
4. 작업 정보: 실제 차종·연식, 사용 부품 또는 필름의 제품명·색상, 작업 범위와 소요 시간. 확인된 내용만 표시합니다.

### 화면 캡처

`preview-desktop.png`, `preview-full-desktop.png`, `preview-services.png`, `preview-mobile.png`, `preview-full-mobile.png`에서 화면을 확인할 수 있습니다. 편집 후에는 `node export-local.mjs`로 보관 파일을 갱신합니다.
