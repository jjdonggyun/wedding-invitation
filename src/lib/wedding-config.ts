/** 주요 정보는 이 파일에서 바꿀 수 있습니다. 빈 연락처·계좌는 화면에 가짜 정보로 표시되지 않습니다. */
export const weddingConfig = {
  groom: { ko: "정동균", ja: "チョン・ドンギュン", en: "DONGKYUN" },
  bride: { ko: "야마다 츠키나", ja: "ヤマダ・ツキナ", en: "TSUKINA" },
  weddingDate: "2026-12-06T13:00:00+09:00",
  venue: {
    ko: "스탠포드호텔 코리아",
    ja: "スタンフォードホテルコリア",
    addressKo: "정확한 주소를 입력해 주세요",
    addressJa: "詳しい住所は後日ご案内いたします",
  },
  mapLinks: {
    kakao: "",
    naver: "",
    tmap: "",
  },
  contacts: {
    groom: "",
    bride: "",
    groomFather: "",
    groomMother: "",
    brideFather: "",
    brideMother: "",
  },
  accounts: {
    groom: { bank: "", number: "", holder: "" },
    bride: { bank: "", number: "", holder: "" },
  },
} as const;
