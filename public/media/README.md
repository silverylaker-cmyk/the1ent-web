# public/media

Grok Imagine으로 만든 에셋. 영상은 아래 파일명으로 넣기만 하면 빌드 시 자동으로 켜진다(`lib/content.ts` getMedia).

| 파일 | 용도 | 비고 |
| --- | --- | --- |
| `hero.jpg` | 홈 히어로 포스터(영상 없을 때 Ken Burns) | 있음 |
| `hero.mp4` | 홈 히어로 배경 루프 16:9 | Grok 게시물 6aacfe42-2ac6-4847-8462-6365fbc12241 에서 직접 다운로드 |
| `hero-mobile.mp4` | 모바일 히어로 9:16 | Grok 게시물 e2d6b385-ee6b-474f-ba8d-17422b933176 에서 직접 다운로드 |
| `band.mp4` | "다르게 하는 세 가지" 밴드 배경 | 선택 |
| `ribbon.jpg` | 밴드 배경 이미지 | 있음 |

넣기 전 압축 권장:
`ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4`
