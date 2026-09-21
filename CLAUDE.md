# 더원이비인후과 반월당점 홈페이지 리뉴얼

## 목표
기존 the1ent.com(CMS, 서브페이지 40개)을 정적 사이트로 리뉴얼. 홈 + 서브페이지 + 자가체크 도구.
출발점은 `design/prototype/the1ent-home-prototype.html`(토큰·사이드바 레이아웃). **2026-09 2차 리뉴얼부터 방향이 바뀌었다: 프로토타입을 그대로 옮기는 것이 아니라, 같은 토큰 위에서 모션이 풍부한 디자인과 서버 없는 신규 기능을 적극적으로 더한다.**

## 스택
- Next.js 15 (App Router) + Tailwind v4 + Framer Motion
- `output: 'export'` 정적 빌드 → `out/`
- 폰트: Noto Serif KR(헤드라인), Pretendard Variable(본문). 셀프호스팅(`public/fonts`). 원본(2.4MB)은 `design/fonts-full/`에 두고 `python scripts/subset-fonts.py`로 core(사이트에 실제 쓰인 글자, 글꼴당 ~90KB) + rest(KS X 1001 나머지) 두 조각과 `app/fonts.css`(unicode-range)를 만든다. 콘텐츠를 크게 바꾸면 다시 실행. fonts.css는 생성물이므로 직접 고치지 않는다
- 이미지: `next/image` unoptimized. 아이콘은 인라인 SVG 컴포넌트
- 패키지 매니저 pnpm

## 디자인 토큰 (프로토타입 :root 그대로)
```
cream #F7F6F2 / cream-2 #EFEDE7 / ink #1F1E1D / ink-2 #5C5A57 / line #DCD9D1
sky #BFDCEB / sky-deep #4A8CAD / sky-soft #E3EFF5     ← 귀·수면
sage #C9E0CF / sage-deep #5E9A72 / sage-soft #E9F2EB  ← 코
sidebar 64px → hover 220px / ease cubic-bezier(.22,1,.36,1)
```
로고 실제 hex 확보 시 `sky`·`sage`만 교체(채도 −40%, 명도 +20% 규칙 유지). 나머지 토큰은 고정.

## 레이아웃
- 데스크톱: 좌측 고정 사이드바(아이콘, hover/focus 시 라벨 확장), 하단 카카오 CTA
- 모바일(≤900px): 하단 탭바 6개 + 우하단 플로팅 카카오 버튼(scroll>300px)
- 최대 콘텐츠 폭 1240px, 섹션 패딩 96px / clamp(24px,6vw,96px)
- 다크모드 없음

## 페이지 (URL 고정)
```
/                        홈
/check                   증상 자가체크 (진료 3축으로 연결)
/check/sleep             수면무호흡 위험도 체크 (STOP-BANG)
/faq                     자주 묻는 질문 (검색·분류, FAQPage JSON-LD)
/care/nose               코 — 비염·축농증·비중격·비수술 치료
/care/ear                귀 — 이명·어지럼·중이염
/care/sleep              수면 — 코골이·수면무호흡·양압기
/surgery/ess             축농증 내시경 수술
/surgery/septoplasty     내시경 비중격 수술
/surgery/snoring         코골이 수술
/surgery/psg             수면다원검사
/doctors                 의료진 2인
/reservation             카카오 예약 안내 + 진료시간
/location                오시는 길 (카카오맵 임베드)
/notice                  공지 (markdown 파일 목록)
/fees                    비급여 항목 (법정 고지, 표)
```
서브페이지 공통 템플릿: 헤드라인(serif) → lead → 본문 섹션(아코디언 허용) → 하단 카카오 예약 CTA.
수술 4페이지는 진단→수술→회복 3단계 타임라인 컴포넌트 필수(프로토타입 `.steps`).

## 콘텐츠 데이터
모든 텍스트는 코드 밖 `content/`에 둔다. 컴포넌트에 문자열 하드코딩 금지.
```
content/site.json        상호·주소·전화·팩스·사업자번호·카카오 채널 URL·진료시간
content/doctors.json     의료진 2인 (name, role, photo, career[])
content/care/*.md        진료 3축 본문
content/surgery/*.md     수술·검사 4개 본문 (frontmatter: steps[])
content/notices/*.md     공지 (frontmatter: date, title)
content/fees.json        비급여 표
content/home.json        홈 섹션 카피 (hero·marquee·facts·journey·know·tools…)
content/ui.json          공통 UI 문구 (진료 상태, 검색, 글자 크기, 예약 도우미…)
content/check.json       증상 자가체크 문항
content/stopbang.json    STOP-BANG 문항·판정 구간
content/faq.json         FAQ
content/media.json       Grok 생성 에셋 경로 (영상은 public/media에 파일만 넣으면 자동 활성, public/media/README.md)
```
정적 파일 경로는 반드시 `lib/base.ts`의 `withBase()`를 거친다(GitHub Pages basePath).
플레이스홀더로 시작하고 값이 오면 교체:
- 카카오 채널 URL: `https://pf.kakao.com/CHANNEL_ID/chat`
- 2번째 원장 이름·약력, 목요일 진료시간, 의료진 사진, 로고 hex

## 모션 (framer-motion으로 통일)
모션은 많이, 그러나 한 가지 언어로. 이징은 `components/motion/ease.ts`의 EASE, 프리미티브는 `components/motion/*`만 쓴다.
- 히어로: 배경 미디어 패럴랙스 + Ken Burns(영상 있으면 영상), 헤드라인 단어 마스크 리빌(SplitText), SVG 라인 드로잉 코→귀→수면, 자석 버튼(Magnetic), 스크롤 큐
- 섹션: Reveal(fade-up+blur), h2는 SplitText, 마키, 숫자 카운트업, 3D 틸트 카드, 스크롤 연동 방문 흐름(Journey), 패럴랙스 밴드
- 전역: 스크롤 진행 바, 커서 글로우(데스크톱), 페이지 전환 커튼(CSS), 사이드바 활성 pill(layoutId)
- 히어로의 스크롤 연동 값은 `useScroll()`의 창 scrollY(px)만 쓴다. target 측정 기반 progress에 본문 opacity를 묶지 말 것 — 측정이 어긋나 본문이 투명해진 버그가 있었고, 흐린 글자는 명암비 기준(4.5:1)도 깨뜨린다. Journey처럼 점·색·이동으로 상태를 표현한다
- framer-motion은 SVG의 opacity/pathLength를 *속성*으로 넣는다 → CSS에서 같은 속성의 초기값을 주면 덮인다
- 첫 화면(히어로·서브히어로·첫 섹션) 텍스트는 framer가 아니라 CSS 애니메이션(`.rise`, SplitText `onView={false}`)으로 넣는다 — JS 하이드레이션 전에는 `initial` opacity 0인 요소가 보이지 않아 LCP가 1초 이상 밀린다. 가장 큰 글은 투명도 없이 이동만.
- `prefers-reduced-motion`: MotionConfig reducedMotion="user" + CSS 애니메이션 전부 off. 새 CSS 애니메이션을 추가하면 enhance.css 맨 아래 목록에도 추가
- 모바일은 데스크톱보다 가볍게(커서 글로우·틸트·자석 효과 없음)

## 기능 (전부 서버 없이 동작)
실시간 진료 상태 배지(lib/hours.ts, 한국시간) · Cmd+K 검색 · 글자 크기 3단계 · 증상 자가체크 · STOP-BANG · 예약 메시지 만들기(클립보드) · 비급여/FAQ 검색·필터 · 서브페이지 목차 · 주소 복사/지도 링크
- 증상 등 건강 관련 입력은 URL에 싣지 않는다 → `lib/prefill.ts`(sessionStorage)
- 자가체크류에는 "진단이 아닌 참고용" 고지를 반드시 둔다

## 하지 말 것
- 카카오 노란색 사용 금지(라인 아이콘만)
- 기존 사이트의 커뮤니티·상담게시판·후기 페이지 재현 금지
- 의료광고 오인 소지: 가짜 의료진·환자 사진, 실제 병원처럼 보이는 AI 실내 사진, 전후 사진, 근거 없는 수치 금지. AI 에셋은 추상·일러스트만. facts 숫자는 content에서 확인 가능한 사실만
- all-caps 라벨, 다크모드

## 품질 기준
- Lighthouse 모바일 성능·접근성 90+ (2026-09-22 로컬 gzip 서버 측정: 접근성 전 페이지 100 · 성능 서브페이지 87–92, 홈 82–83으로 홈은 목표 미달. 실행마다 ±3 정도 흔들린다. 홈의 남은 비용은 모션 컴포넌트 하이드레이션 TBT와 히어로 이미지)
- 글자색으로 `--sky-deep`/`--sage-deep`를 쓰지 말 것(명암비 3.4:1). 글자는 `--sky-ink`/`--sage-ink`
- 키보드 포커스 링 보임, 사이드바 Tab 순회 가능
- 375px / 768px / 1440px 스크린샷 확인

## 배포
- 1차: GitHub Pages (silverylaker-cmyk 계정, 레포 `the1ent-web`)
- 2차: the1ent.com DNS 전환 (별도 결정)
- 기존 URL 중 검색 유입 있는 것은 `public/_redirects` 또는 meta refresh로 매핑 (목록은 나중에 추가)

## 작업 순서
1. 프로젝트 스캐폴딩 + 토큰·폰트·레이아웃(사이드바·탭바·FAB)
2. 홈을 프로토타입과 픽셀 단위로 맞춤 — 스크린샷 비교
3. 서브페이지 공통 템플릿 + `content/` 로더
4. 13페이지 생성(플레이스홀더 콘텐츠)
5. 정적 빌드·Lighthouse·GitHub Pages 배포
각 단계 끝날 때마다 스크린샷 3개(375/768/1440)와 함께 보고.
