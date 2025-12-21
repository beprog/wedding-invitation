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
    title: "이준휘❤️류지연의 결혼식에 초대합니다",
    description: "결혼식 초대장",
    ogImage: "/images/jeju.jpg",
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },

  // 메인 화면
  main: {
    title: "Wedding Invitation",
    image: "/images/jeju.jpg",
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
    name: "루이비스컨벤션 대전 그레이스홀",
    address: "대전 유성구 테크노중앙로 161 스카이파크호텔 1층",
    tel: "042-933-2500",
    naverMapId: "루이비스컨벤션 대전", // 네이버 지도 검색용 장소명
    coordinates: {
      latitude: 36.4247,
      longitude: 127.3983,
    },
    placeId: "123456789", // 네이버 지도 장소 ID
    mapZoom: "17", // 지도 줌 레벨
    mapNaverCoordinates: "14141300,4507203,15,0,0,0,dh", // 네이버 지도 길찾기 URL용 좌표 파라미터 (구 형식)
    transportation: {
      bus: "신탄진역 705번 → 현대아울렛북문 하차 → 도보5분\n대전역&대전복합터미널 701번 → 대덕밸리용신교 하차 → 도보5분\n유성시외버스터미널 704번 → 롯데마트 대덕점 하차 → 도보15분",
      car: "서울기준: 경부고속도로 → 회덕IC 분기점 → 북대전IC\n        : 경부고속도로 → 신탄진IC\대구기준: 경부고속도로 → 회덕IC 분기점 → 북대전IC\n부산기준: 중앙고속도로 → 경부고속도로 → 회덕IC 분기점 → 북대전IC ",
    },
    parking: "호텔&컨벤션(지상), 현대아울렛 북문(지하&주차타워), 남문(지상,지하)\n* 2시간 무료주차: 출차시 주차요원에게 하객이라고 말씀해주세요.\n외부주차장(무료) → 대덕비즈센터 주차 후 셔틀버스 이용, 상시 운행\n* 외부주차장: 대덕 유성구 테크노4로 17 대덕비즈센터",
    // 신랑측 배차 안내
    // 신부측 배차 안내
  },

  // 갤러리
  gallery: {
    layout: "scroll" as GalleryLayout, // "scroll" 또는 "grid" 선택
    position: "bottom" as GalleryPosition, // "middle" (현재 위치) 또는 "bottom" (맨 하단) 선택
    images: [
      "/images/gallery/1.shoes.jpg",
      "/images/gallery/2.chocolate.jpg",
      "/images/gallery/3.flower.jpg",
      "/images/gallery/4.rounge.jpg",
      "/images/gallery/5.eggtart.jpg",
      "/images/gallery/6.portuhill.jpg",
    ],
  } as GalleryConfig,

  // 초대의 말씀
  invitation: {
    message: "서로 앞에\n책이 되는 순간이 있었어요.\n그 무엇과도 바꿀 수 없는 한 권인 책인 내가\n서로를 스치지 않고\n사랑으로 머물러\n마지막 페이지까지 읽어보려 합니다.\n\n준휘를 만나기까지\n지연된 결혼식에\n여러분을 초대합니다.",
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
      bank: "은행명",
      number: "123-456-789012",
      holder: "신랑이름",
    },
    bride: {
      bank: "은행명",
      number: "987-654-321098",
      holder: "신부이름",
    },
    groomFather: {
      bank: "은행명",
      number: "111-222-333444",
      holder: "신랑아버지",
    },
    groomMother: {
      bank: "은행명",
      number: "555-666-777888",
      holder: "신랑어머니",
    },
    brideFather: {
      bank: "은행명",
      number: "999-000-111222",
      holder: "신부아버지",
    },
    brideMother: {
      bank: "은행명",
      number: "333-444-555666",
      holder: "신부어머니",
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
