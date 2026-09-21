/** 주요 정보는 이 파일에서 바꿀 수 있습니다. 빈 연락처·계좌는 화면에 가짜 정보로 표시되지 않습니다. */
export const weddingConfig = {
  groom: { ko: "정동균", ja: "チョン・ドンギュン", en: "DONG GYUN" },
  bride: { ko: "야마다 츠키나", ja: "ヤマダ・ツキナ", en: "TSUKINA" },
  weddingDate: "2026-12-06T13:00:00+09:00",
  venue: {
    ko: "스탠포드호텔 코리아",
    ja: "スタンフォードホテルコリア",
    addressKo: "서울 마포구 월드컵북로58길 15",
    addressJa: "ソウル特別市 麻浦区 ワールドカップ北路58ギル 15",
    location: { latitude: 37.5823258, longitude: 126.8867101 },
  },
  mapLinks: {
    kakao: "https://map.kakao.com/link/search/%EC%8A%A4%ED%83%A0%ED%8F%AC%EB%93%9C%ED%98%B8%ED%85%94%20%EC%BD%94%EB%A6%AC%EC%95%84",
    naver: "https://map.naver.com/p/search/%EC%8A%A4%ED%83%A0%ED%8F%AC%EB%93%9C%ED%98%B8%ED%85%94%20%EC%BD%94%EB%A6%AC%EC%95%84",
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
    groom: { bank: "카카오뱅크", number: "3333080174253", holder: "정동균" },
    bride: { bank: "", number: "", holder: "" },
  },
} as const;
