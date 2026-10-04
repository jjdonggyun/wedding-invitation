# 동균 & 츠키나 모바일 청첩장

사진과 문구를 직접 바꿀 수 있는 Next.js 모바일 청첩장입니다. 한 페이지를 아래로 스크롤하며 읽는 형태이고, 한국어와 일본어를 지원합니다. 별도 데이터베이스나 서버 설정은 필요하지 않습니다.

## 먼저 실행하기

1. 이 폴더에서 터미널을 엽니다.
2. 처음 한 번 `npm install`을 실행합니다.
3. `npm run dev`를 실행하고 터미널에 표시되는 주소(보통 `http://localhost:3000`)를 엽니다.
4. 배포 전에는 `npm run build`를 실행해 오류가 없는지 확인합니다.

`npm run dev`와 `npm run build`를 시작할 때 `images` 폴더의 사진을 자동으로 확인합니다. 원본은 그대로 두고 실제 사용하는 사진만 웹 표시용 `public/images`에 복사합니다. 역할과 원본 크기를 기록한 `src/generated/images.ts`도 자동 생성됩니다. 원본에서 삭제하거나 `none-*`로 바꾼 사진의 웹 복사본은 함께 정리됩니다. **생성 파일을 직접 수정하지 마세요.**

## 자주 바꾸는 정보

파일 이름을 클릭해 편집한 뒤 저장하고, 브라우저를 새로고침하면 됩니다. 배포한 사이트에는 수정 사항을 다시 배포해야 반영됩니다.

| 바꿀 내용 | 열 파일 | 찾을 항목 |
| --- | --- | --- |
| 신랑·신부 이름 | `src/lib/wedding-config.ts` | `groom`, `bride`의 `ko`, `ja`, `en` |
| 결혼 날짜와 시간 | `src/lib/wedding-config.ts` | `weddingDate` |
| 예식장 이름과 주소 | `src/lib/wedding-config.ts` | `venue` |
| 한국어 인사말과 문구 | `src/lib/content.ts` | `ko: { ... }` 안의 문장 |
| 일본어 인사말과 문구 | `src/lib/content.ts` | `ja: { ... }` 안의 문장 |
| 사진의 화면 배치 | `images` | 아래 역할 기반 파일명 |
| 카카오톡·LINE 미리보기 사진 | `images/share.jpg` | `share.jpg` 교체 |

결혼 날짜는 `2026-12-06T12:00:00+09:00`처럼 **연-월-일T시:분:초+09:00** 형식으로 작성합니다. `+09:00`은 한국 시간입니다. 날짜 표시와 D-Day는 이 값에서 자동으로 계산됩니다. 일본어 이름은 현재 가타카나로 적었습니다. 정확한 한자 표기를 확인한 뒤 `ja` 항목을 바꾸면 됩니다.

### 1. 사진 추가하기

원본 사진을 프로젝트의 `images` 폴더에 역할 기반 파일명으로 넣습니다. `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`를 지원합니다.

| 파일명 | 사용 위치 |
| --- | --- |
| `hero.jpg` | 첫 화면 표지 |
| `story-intro.jpg` | 인사말 아래 사진 |
| `story-couple.jpg` | 신랑·신부 소개 사진 |
| `story-cinematic-01.jpg`, `02`… | 검은 배경 사진, 번호순·선택 사항 |
| `gallery-01.jpg`, `02`… | 갤러리, 번호순 |
| `gallery-03-featured.jpg` | 갤러리에서 화면 폭을 채우는 큰 사진 |
| `ending.jpg` | 마지막 엔딩 사진 |
| `share.jpg` | 카카오톡·LINE 링크 미리보기 전용 사진 |
| `none-01.jpg`, `02`… | 보관만 하고 화면·공유·배포에서는 제외 |

사진을 넣거나 교체한 뒤 개발 서버를 다시 시작하거나 `npm run build`를 다시 실행하세요. `images`의 원본 파일은 자동 과정에서 수정되거나 삭제되지 않습니다.

### 2. 사진 순서 바꾸기

표지·스토리·엔딩은 파일 역할이 고정되어 갤러리 사진을 추가하거나 삭제해도 서로 바뀌지 않습니다. 스토리 시네마틱과 갤러리는 파일명 번호순으로 정렬합니다. 번호가 중간에 비어 있어도 괜찮습니다.

### 3. Gallery 사진 교체하기

갤러리 사진을 추가하려면 다음 번호의 `gallery-##.jpg`를 넣습니다. 파일명 끝에 `-featured`를 붙인 사진과 가로 사진은 화면 폭을 채우는 큰 지면으로 표시됩니다. 사진을 누르면 확대 화면이 열립니다. 추가 사진 개수에는 별도 제한이 없습니다.

### 4. 대표사진 바꾸기

표지는 `hero.jpg`, 카카오톡과 LINE 링크 미리보기는 `share.jpg`를 사용합니다. `share.jpg`가 없으면 `hero.jpg`를 대신 사용합니다. 사진과 영문 이름·날짜를 조합한 1200×630 이미지는 빌드 때 자동 생성되며, 원본 사진은 수정되지 않습니다.

카카오톡에 URL을 붙여넣으면 이 미리보기 이미지와 제목·날짜·장소가 표시되도록 Open Graph 태그를 설정했습니다. 이미 공유한 URL의 예전 모습이 보이면 [카카오디벨로퍼스 도구](https://developers.kakao.com/tool)의 **카카오톡 URL 메타정보 관리**에서 URL 정보를 확인하고 캐시를 새로고침하세요. 플랫폼 캐시 반영에는 시간이 걸릴 수 있습니다.

## 아직 비워 둔 정보

`src/lib/wedding-config.ts`에 다음 값을 입력하면 관련 기능이 활성화됩니다.

- `venue.addressKo`, `venue.addressJa`: 정확한 주소와 일본어 안내를 입력합니다. 현재 스탠포드호텔 코리아 주소가 한국어와 일본어로 입력되어 있습니다.
- `mapLinks.kakao`, `mapLinks.naver`, `mapLinks.tmap`: 확인한 지도 공유 URL을 입력합니다. URL이 없으면 지도 버튼은 보이지 않습니다.
- `contacts`: 실제 전화번호를 입력합니다. 번호가 하나라도 입력되면 연락처 영역과 해당 통화 링크가 나타납니다.
- `accounts.groom`, `accounts.bride`: 은행명 `bank`, 계좌번호 `number`, 예금주 `holder`를 모두 입력하면 마음 전하실 곳의 펼침 영역과 복사 버튼이 나타납니다. 비어 있는 동안에는 이 영역을 숨깁니다.

## 링크·카카오톡·LINE 공유

링크 복사, **카카오톡 공유**, **LINE 공유** 버튼을 사용할 수 있습니다. 현재 배포 주소에는 청첩장 전용 Kakao Developers 앱(`Donggyun`, 앱 ID `1584048`)을 연결했습니다. 카카오톡 공유 버튼은 대표 이미지와 **「모바일 청첩장」·「위치 보기」 두 버튼**이 있는 카카오 피드형 공유창을 엽니다. Kakao SDK를 사용할 수 없는 브라우저에서는 기기의 공유 메뉴 또는 링크 복사로 이어집니다. 카카오톡 채팅창에 URL을 직접 붙여넣으면 카카오가 일반 링크 미리보기를 만들기 때문에 URL이 노출되고 버튼은 표시되지 않습니다.

LINE 공유는 LINE 공식 공유창을 열어 공식 도메인의 청첩장 URL을 전송합니다. LINE이 `src/app/layout.tsx`의 Open Graph 제목·설명과 `src/app/opengraph-image.tsx`의 대표 이미지를 읽어 카드 미리보기를 만듭니다. LINE 일반 공유에서는 카카오 피드처럼 카드 안에 두 개의 맞춤 버튼을 넣을 수 없으며, 카드 또는 URL을 누르면 청첩장으로 이동합니다.

현재 Vercel Production 환경 변수 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`와 카카오 앱의 JavaScript SDK 도메인·제품 링크 웹 도메인이 설정되어 있습니다. 로컬 개발 화면에서도 카카오 공유를 시험하려면 다음 순서로 설정합니다.

1. Kakao Developers의 앱 `1584048`에서 JavaScript SDK 도메인에 로컬 주소를 추가합니다.
2. 프로젝트 루트에 `.env.local` 파일을 만들고 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=JavaScript키`를 적습니다. **어드민 키나 REST API 키를 사용하지 마세요.**
3. 개발 서버를 다시 시작합니다.

공유 문구와 버튼은 `src/components/ShareSection.tsx`, 공식 도메인은 `src/lib/wedding-config.ts`, 링크 미리보기 제목·설명은 `src/app/layout.tsx`에서 바꿉니다. 자체 도메인을 바꾸면 카카오 앱의 **JavaScript SDK 도메인**과 **제품 링크 관리 → 웹 도메인**에 새 주소를 모두 추가한 뒤 다시 배포하세요. 카카오 공유 버튼의 두 링크도 새 도메인에서 정상적으로 열리는지 확인하세요.

## 배경 음악(BGM) 바꾸기

현재 BGM은 `public/music/romantic-wedding-piano.mp3`이며, 설정은 `src/lib/music-config.ts`에서 관리합니다. 이전 오리지널 곡 `public/music/first-light.mp3`도 교체용으로 보존되어 있습니다. 음악은 기본 `MUSIC ON` 상태로 반복 재생을 시도하고, 왼쪽 아래 버튼으로 끄거나 다시 켤 수 있습니다.

다른 음악으로 바꾸려면 아래 중 한 가지 방법을 사용하세요.

1. 새 MP3 파일을 `public/music` 폴더에 넣습니다.
2. 다른 파일명을 유지하고 싶다면 `public/music`에 넣은 뒤 `src/lib/music-config.ts`의 `src`를 `/music/새파일명.mp3`로 바꿉니다. `volume`도 이 파일에서 조정할 수 있습니다.

스마트폰 브라우저가 소리 있는 자동 재생을 차단하면 첫 화면 터치나 키 입력 순간 재생을 다시 시도합니다. 브라우저 정책상 사용자의 첫 상호작용 전에는 소리가 나지 않을 수 있습니다. 현재 파일은 사용자가 제공한 음원이므로 원본 다운로드 페이지와 라이선스 기록을 함께 보관하세요. 상업 OST 등을 공개하려면 해당 음악과 음원 사용에 필요한 허락을 먼저 확인해야 합니다. 선택적으로 오리지널 곡을 다시 만들려면 `scripts/generate-bgm.py`를 사용할 수 있지만, 사이트 실행과 배포에는 Python이 필요하지 않습니다.

## Vercel에 배포하기

1. 이 프로젝트를 GitHub 저장소에 올립니다. **`images` 원본 폴더도 함께 올려야** 배포 과정에서 사진을 복사할 수 있습니다. `public/images`는 자동 생성 폴더라 Git에 올릴 필요가 없습니다.
2. Vercel에서 **Add New → Project**를 누르고 GitHub 저장소를 선택합니다.
3. Framework Preset이 `Next.js`로 잡혀 있는지 확인합니다. 빌드 명령은 기본값인 `npm run build`를 사용합니다.
4. 기본 Vercel 주소로 사용할 때는 사이트 URL을 따로 입력할 필요가 없습니다. 나중에 직접 도메인을 연결한 뒤 공유 미리보기의 주소까지 바꾸고 싶다면 Environment Variables에 `NEXT_PUBLIC_SITE_URL=https://실제도메인`을 추가하고 재배포합니다. 카카오 공유를 사용할 때는 위의 JavaScript 키도 추가합니다.
5. Deploy를 누릅니다. 사진이나 문구를 수정한 뒤 GitHub에 다시 올리면 새 배포가 생성됩니다.

페이지는 빌드 때 정적으로 생성되며, `next/image`가 화면 크기에 맞춘 이미지를 제공합니다. 첫 사진은 우선 로딩되고 아래 사진은 필요할 때 로딩됩니다. 검색엔진 노출을 막기 위해 `noindex`, `nofollow` 메타 태그와 HTTP 헤더를 설정했습니다. `robots.txt`는 검색엔진이 이 지시를 읽을 수 있도록 접근을 허용합니다. 링크를 아는 사람은 방문할 수 있으므로 URL 자체를 비밀번호처럼 다루지는 마세요.

장소 영역은 `지도 / 약도` 탭으로 구성되어 있습니다. 지도 탭은 `NEXT_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY`를 사용하는 카카오맵 JavaScript SDK로 표시하며, 카카오톡 공유용 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`와 분리되어 있습니다. 지도 키가 속한 카카오 앱의 JavaScript SDK 도메인에 배포 도메인을 등록하고 카카오맵 제품을 활성화해야 합니다. 첨부 약도는 `public/venue-guide.png`에 있으며, 지도 아래의 카카오맵·네이버지도 버튼 주소는 `src/lib/wedding-config.ts`의 `mapLinks`에서 관리합니다.
