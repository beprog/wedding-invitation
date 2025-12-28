import React from 'react';
import Snowfall from 'react-snowfall';

const SnowEffect: React.FC = () => {
  return (
    <Snowfall
      // ❄️ 눈송이 색상 (반투명 화이트 추천)
      color="#ffffff"
      // ❄️ 눈송이 개수 (모바일 고려 100~150개 추천)
      snowflakeCount={150}
      // ❄️ 눈송이 크기 범위 [최소, 최대]
      radius={[0.5, 3.0]}
      // ❄️ 내리는 속도 범위 [최소, 최대]
      speed={[0.5, 2.5]}
      // ❄️ 바람의 영향 (가로 흔들림 정도)
      wind={[-0.5, 2.0]}
      // 스타일 설정 (화면 전체 고정)
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 9999, // 다른 요소보다 위에 표시
        pointerEvents: 'none', // 클릭 방해 방지
      }}
    />
  );
};

export default SnowEffect;