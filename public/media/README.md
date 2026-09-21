# 미디어 슬롯

이 폴더에 파일을 넣으면 사이트의 해당 자리에 자동으로 표시됩니다 (빌드 시 감지).
파일이 없으면 SVG 일러스트가 대신 보입니다. 영상은 `.mp4`/`.webm`, 이미지는 `.jpg`/`.png`/`.webp`.
영상 포스터는 `<이름>-poster.jpg`.

| 파일 이름            | 위치                         | 권장 비율 |
| -------------------- | ---------------------------- | --------- |
| `hero`               | 홈 히어로 우측(영상 권장)    | 4:3       |
| `space-endoscopy`    | 홈 · 진료 공간 · 내시경실    | 4:3       |
| `space-psg`          | 홈 · 진료 공간 · 수면검사실  | 4:3       |
| `space-lobby`        | 홈 · 진료 공간 · 대기실      | 4:3       |
| `surgery-ess`        | 축농증 내시경 수술 설명 영상 | 16:9      |
| `surgery-septoplasty`| 비중격 수술 설명 영상        | 16:9      |
| `surgery-snoring`    | 코골이 수술 설명 영상        | 16:9      |
| `surgery-psg`        | 수면다원검사 설명 영상       | 16:9      |
| `doctor-1`, `doctor-2` | 의료진 사진                | 3:4       |

Grok 프롬프트 예시(톤 통일): "soft pastel clinic interior, cream and pale sky-blue palette,
natural light, minimal, no text, photoreal, 4:3".
