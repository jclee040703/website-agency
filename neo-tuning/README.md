# NEO TUNING

Lightweight Korean car tuning portfolio prototype. Static HTML, CSS, and JavaScript in `dist/`; no build dependencies. Run `npm run dev` for local preview on port 4173. The quote form is a local demonstration only: it does not send or store data.

## Images

Source links and photographer attribution are available in the website footer. Unsplash photos illustrate the brand concept. The Porsche wrap before/after pair is an external reference from Monarch Media Designs, explicitly labeled and linked; it is not a NEO TUNING job or customer testimonial. Reuse licensing for the Monarch photographs has not been verified; replace with licensed or client-owned photos before commercial release.

## Local handoff

The user requested local storage only and cancelled deployment. Open `NEO TUNING.html` directly in a browser. This standalone export embeds CSS, JavaScript, and all photos and makes no external requests. The source credit links open only when clicked. After editing the source, run `node export-local.mjs` to refresh it.

## Hosting (inactive)

A Site registration was created before the user cancelled deployment. No source was uploaded and no version was published. Do not deploy without a new user request. If hosting is requested later, reuse the project ID in `.openai/hosting.json`.

## 현재 디자인: 중성 블랙 · 서비스 균형 조정 — 2026-10-27

프레임워크와 별도 빌드 과정 없이 `dist/index.html`, `dist/style.css`, `dist/app.js`를 직접 편집합니다. `NEO TUNING.html`은 `export-local.mjs`가 생성하는 보관용 결과물입니다. 사진 파일은 변경하지 않았으며 색상 필터도 적용하지 않았습니다.

- 순서: 첫 화면 → 랩핑·배기·휠 서비스 → 외부 참고 갤러리 → 체험용 상담 폼 → 푸터.
- 색상: 배경 `#111214`, 보조 영역 `#1A1C1F`, 글자 `#F2F2F2`, 보조 글자 `#A9AFB6`, 선 `#34383D`. 주요 버튼은 흰색 바탕과 검은 글자로 통일했습니다.
- 서비스는 PC 3열, 모바일 1열입니다. 동일한 3:2 프레임 안에서 랩핑은 차체 전면으로 표시 위치를 조정하고, 휠은 contain으로 타이어와 휠 전체를 보존합니다. 별도 배경 카드나 확대 애니메이션은 없습니다.
- 갤러리는 PC에서 설명 왼쪽, 사진 두 장 오른쪽입니다. 1440px 화면에서 사진은 각각 345×460px로 표시됩니다. 모바일에서도 나란히 비교하고 사진을 누르면 크게 볼 수 있습니다. 워터마크, 원본 비율, 외부 참고 안내를 유지합니다.
- 모바일 첫 화면은 제목·상담 버튼 영역과 주행 사진 영역을 분리해 글자가 차량을 가리지 않게 했습니다.
- 본문 16px, 출처와 참고 안내 13px 이상. 이 컴퓨터에 설치된 한글 지원 Noto Sans KR을 우선 사용하고, 없는 환경에서는 맑은 고딕 또는 Apple SD Gothic Neo로 대체합니다. 외부 폰트를 요청하지 않습니다.
- 내용 폭은 최대 1320px, 상담 구간은 최대 1160px, 폼은 최대 560px로 제한했습니다. 입력창과 선택 버튼의 간격·높이·포커스를 통일했습니다.

### 현재 버전 검증

앱 옆 패널 폭이 아니라 `window.innerWidth`를 기준으로 1440×1000 및 390×844 뷰포트를 설정해 실제 브라우저에서 확인했습니다. 스크롤바가 표시된 일반 페이지의 콘텐츠 폭은 각각 1425px, 375px입니다. 캡처 도구가 스크롤바를 숨긴 경우 캡처 폭은 뷰포트 폭과 같습니다.

가로 넘침·글자 겹침, 대표 차량과 서비스의 핵심 부위, 메뉴와 상담 이동, 원본 사진 확대·전후 전환·Escape 닫기, 서비스 자동 선택, 키보드 선택과 포커스 테두리, 상담 확인 창, 출처 창을 점검했습니다. 단일 HTML도 로컬 HTTP 주소에서 직접 열어 색상과 내장 이미지를 확인했습니다. 내보낸 CSS는 소스와 완전히 같고 JavaScript 및 8개 이미지 요소가 파일 안에 포함되어 있습니다. 실제 휴대전화, Safari, 다른 기기의 글꼴 대체 결과는 확인하지 않았습니다. 상담은 실제 접수·저장·전송을 하지 않는 체험용 기능입니다.

변경 전 파일은 `backups/before-neutral-polish-20261027-232931/`에 보관했습니다. 현재 화면 캡처는 `neutral-desktop-full.jpg`, `neutral-desktop-hero.jpg`, `neutral-desktop-services.jpg`, `neutral-desktop-gallery.jpg`, `neutral-mobile-hero.jpg`, `neutral-mobile-gallery.jpg`, `neutral-mobile-full.jpg`입니다. `preview-*.png`는 이전 버전의 캡처입니다.

### 이미지 원본과 남은 한계

| 파일 | 실제 해상도 | 원본 비율 |
| --- | --- | --- |
| hero-porsche.jpg | 2000×3000 | 2:3 |
| wrapping.jpg | 1000×1500 | 2:3 |
| exhaust.jpg | 1000×668 | 약 3:2 |
| wheels.jpg | 1000×750 | 4:3 |
| wrap-before.jpg / wrap-after.jpg | 각각 480×640 | 3:4 |

프로젝트 안에 대체 차량 사진은 없습니다. 랩핑 원본은 차체 앞부분만 찍힌 세로 사진이므로 차량 전체 측면과 랩핑 범위를 보여주지는 못합니다. 전후 사진은 낮은 해상도이고 촬영 각도가 서로 다릅니다. 전체 구도와 워터마크를 보존한 기록 사진으로 사용하며, 고급 광고 촬영이나 자사 실적으로 표현하지 않습니다.

추가로 필요한 자료: 같은 차량의 가로 3:2 전면·측면 랩핑 사진, 같은 위치·거리·높이·조명에서 찍은 고해상도 전후 한 쌍, 실제 작업장과 부품 디테일, 확인 가능한 차종·연식·부품/필름 제품 정보. 긴 변 2000px 이상의 원본이 있으면 선명도와 일관성을 높일 수 있습니다.

## 이전 사진 중심 리디자인 기록 — 2026-10-27

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
