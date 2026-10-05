/** 주요 정보는 이 파일에서 바꿀 수 있습니다. 빈 연락처·계좌는 화면에 가짜 정보로 표시되지 않습니다. */
export const weddingConfig = {
  siteUrl: "https://donggyun-tsuki.wedding/",
  shareImageRevision: "20261004-role-images",
  groom: { ko: "정동균", ja: "チョン・ドンギュン", en: "DONGGYUN" },
  bride: { ko: "야마다 츠키나", ja: "ヤマダ ツキナ", en: "TSUKINA" },
  family: {
    groomParents: { ko: "정준모 · 구남희", ja: "チョン・ジュンモ　ク・ナムヒ" },
    brideParents: { ko: "야마다 리에", ja: "ヤマダ リエ" },
    groomRelation: { ko: "장남", ja: "長男" },
    brideRelation: { ko: "장녀", ja: "長女" },
  },
  weddingDate: "2026-12-06T12:00:00+09:00",
  venue: {
    ko: "스탠포드호텔서울",
    ja: "スタンフォードホテルソウル",
    hallKo: "2층 그랜드볼룸홀",
    hallJa: "2階 グランドボールルーム",
    addressKo: "서울 마포구 월드컵북로58길 15",
    addressJa: "ソウル特別市 麻浦区 ワールドカップ北路58キル 15",
    phone: "02-6016-0001",
    location: { latitude: 37.5823258, longitude: 126.8867101 },
  },
  mapLinks: {
    kakao: "https://map.kakao.com/link/map/%EC%8A%A4%ED%83%A0%ED%8F%AC%EB%93%9C%ED%98%B8%ED%85%94%EC%84%9C%EC%9A%B8,37.5823258,126.8867101",
    naver: "https://map.naver.com/p/search/%EC%8A%A4%ED%83%A0%ED%8F%AC%EB%93%9C%ED%98%B8%ED%85%94%EC%84%9C%EC%9A%B8",
    tmap: `tmap://route?goalname=${encodeURIComponent("스탠포드호텔서울")}&goalx=126.8867101&goaly=37.5823258`,
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
    groom: { bank: "신한은행", bankJa: "新韓銀行", number: "110-487-107195", holder: "정동균", holderJa: "チョン・ドンギュン" },
    bride: { bank: "", bankJa: "", number: "", holder: "", holderJa: "" },
  },
} as const;
