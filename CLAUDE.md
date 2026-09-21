# 더원이비인후과 반월당점 홈페이지 리뉴얼

## 목표
기존 the1ent.com(CMS, 서브페이지 40개)을 정적 사이트로 리뉴얼. 홈 + 서브 12페이지.
디자인·모션 기준은 `design/prototype/the1ent-home-prototype.html` — 이 파일의 토큰·레이아웃·모션을 그대로 컴포넌트화한다. 새 디자인을 만들지 말 것.

## 스택
- Next.js 15 (App Router) + Tailwind v4 + Framer Motion
- `output: 'export'` 정적 빌드 → `out/`
- 폰트: Noto Serif KR(헤드라인), Pretendard Variable(본문). 셀프호스팅(`public/fonts`)
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
/                        홈 (프로토타입 그대로)
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
```
플레이스홀더로 시작하고 값이 오면 교체:
- 카카오 채널 URL: `https://pf.kakao.com/CHANNEL_ID/chat`
- 2번째 원장 이름·약력, 목요일 진료시간, 의료진 사진, 로고 hex

## 모션 규칙 (프로토타입과 동일)
- 히어로: 1회 오케스트레이션 — SVG 라인 드로잉 코→귀→수면파형(각 900ms, 700ms 간격) → 파스텔 원 scale-in → 라벨 fade. 그 뒤 헤드라인 2줄 stagger 140ms
- 배경 블롭 2개 drift 22s/26s alternate
- 스크롤 리빌: IntersectionObserver threshold .18, fade-up 16px, 700ms, 그룹 내 stagger 80ms
- 수술 타임라인: 뷰 진입 시 점 3개 순차 채움(250ms 간격)
- 진료 카드 hover: 배경 크림→해당 파스텔 300ms
- `prefers-reduced-motion`이면 전부 즉시 표시
- 이 외 모션 추가 금지

## 하지 말 것
- 카카오 노란색 사용 금지(라인 아이콘만)
- 카드마다 그림자, 그라디언트 장식, 숫자 카운트업, all-caps 라벨 금지
- 기존 사이트의 커뮤니티·상담게시판·후기 페이지 재현 금지

## 품질 기준
- Lighthouse 모바일 성능·접근성 90+
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
