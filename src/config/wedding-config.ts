const uniqueIdentifier = "JWK-WEDDING-TEMPLATE-V1";

// 갤러리 레이아웃 타입 정의
type GalleryLayout = "scroll" | "grid";
type GalleryPosition = "middle" | "bottom";

interface GalleryConfig {
  layout: GalleryLayout;
  position: GalleryPosition;
  images: string[];
}

export const weddingConfig = {
  // 메타 정보
  meta: {
    title: "이준휘❤️류지연 결혼합니다!",
    description: "모바일 청첩장",
    ogImage: "/images/jeju.jpg",
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },

  // 메인 화면
  main: {
    title: "Wedding Invitation",
    image: "/images/invitation-intro-20fps.webp",
    date: "2026년 1월 25일 일요일 10시 50분",
    venue: "루이비스컨벤션 대전 그레이스홀"
  },

  // 소개글
  intro: {
    title: "",
    text: "준휘를 만나기까지\n지연된 결혼식에\n여러분을 초대합니다."
  },

  // 결혼식 일정
  date: {
    year: 2026,
    month: 1,
    day: 25,
    hour: 10,
    minute: 50,
    displayDate: "2026.01.25. SUN AM 10:50",
  },

  // 장소 정보
  venue: {
    name: "루이비스컨벤션",
    address: "대전 유성구 테크노중앙로 161 스카이파크호텔 1층",
    tel: "042-933-2500",
    naverMapId: "루이비스컨벤션", // 네이버 지도 검색용 장소명
    coordinates: {
      latitude: 36.4247,
      longitude: 127.3983,
    },
    placeId: "1354062290", // 네이버 지도 장소 ID
    mapZoom: "15", // 지도 줌 레벨
    mapNaverCoordinates: "14181866.66,4359231.50,15,0,0,0,dh", // 네이버 지도 길찾기 URL용 좌표 파라미터 (구 형식)
    transportation: {
      bus: "대전역&대전복합터미널 701번 → 대덕밸리용신교 하차 → 도보5분\n신탄진역 705번 → 현대아울렛북문 하차 → 도보5분\n유성시외버스터미널 704번 → 롯데마트 대덕점 하차 → 도보15분",
      car: "서울기준: 경부고속도로 → 회덕IC 분기점 → 북대전IC\n        : 경부고속도로 → 신탄진IC\n대구기준: 경부고속도로 → 회덕IC 분기점 → 북대전IC\n부산기준: 중앙고속도로 → 경부고속도로 → 회덕IC 분기점 → 북대전IC ",
    },
    parking: "호텔&컨벤션(지상), 현대아울렛 북문(지하&주차타워), 남문(지상,지하)\n* 2시간 무료주차: 출차시 주차요원에게 하객이라고 말씀해주세요.\n\n외부주차장(무료) → 대덕비즈센터 주차 후 셔틀버스 이용, 상시 운행\n* 외부주차장: 대덕 유성구 테크노4로 17 대덕비즈센터",
    // 신랑측 배차 안내
    // 신부측 배차 안내
  },

  // 갤러리
  gallery: {
    layout: "scroll" as GalleryLayout, // "scroll" 또는 "grid" 선택
    position: "bottom" as GalleryPosition, // "middle" (현재 위치) 또는 "bottom" (맨 하단) 선택
    images: [
      "/images/gallery/1.forest_800px.jpg",
      "/images/gallery/2.kiss_800px.jpg",
      "/images/gallery/3.happy_800px.jpg",
      "/images/gallery/4.laughter_800px.jpg",
      "/images/gallery/5.dance_800px.jpg",
      "/images/gallery/6.fireworks_800px.jpg",
      "/images/gallery/7.portuhill_800px.jpg",
      "/images/gallery/8.suitdress.jpg",
    ],
  } as GalleryConfig,

  // 초대의 말씀
  invitation: {
    message: "서로 앞에\n책이 되는 순간이 있었어요.\n그 무엇과도 바꿀 수 없는 한 권인 책인 내가\n서로를 스치지 않고\n사랑으로 머물러\n마지막 페이지까지 읽어보려 합니다.\n\n준휘를 만나기까지\n지연된 결혼식에\n여러분을 초대합니다.\n\n",
    groom: {
      name: "준휘",
      label: "아들",
      father: "이진홍",
      mother: "서일선",
    },
    bride: {
      name: "지연",
      label: "딸",
      father: "故 류근문",
      mother: "조성숙",
    },
  },

  // 계좌번호
  account: {
    groom: {
      bank: "하나은행",
      number: "35391028771307",
      holder: "이준휘",
    },
    bride: {
      bank: "하나은행",
      number: "65491035951107",
      holder: "류지연",
    },
    groomFather: {
      bank: "부산은행",
      number: "064120510784",
      holder: "이진홍",
    },
    groomMother: {
      bank: "농협은행",
      number: "12106652261878",
      holder: "서일선",
    },
    brideMother: {
      bank: "하나은행",
      number: "64652929100107",
      holder: "조성숙",
    }
  },

  // RSVP 설정
  rsvp: {
    enabled: false, // RSVP 섹션 표시 여부
    showMealOption: false, // 식사 여부 입력 옵션 표시 여부
  },

  // 슬랙 알림 설정
  slack: {
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
    channel: "#wedding-response",
    compactMessage: true, // 슬랙 메시지를 간결하게 표시
  },
}; 
