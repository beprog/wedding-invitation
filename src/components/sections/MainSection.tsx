'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';
import SnowEffect from './SnowEffect';

const watermarkId = weddingConfig.meta._jwk_watermark_id || 'JWK-NonCommercial';

const MainSection: React.FC = () => {
  // 1. 객체 형태로 Ref 정의 (메인과 히든을 명확히 구분)
  const audioRefs = useRef<{
    main: HTMLAudioElement | null;
    hidden: HTMLAudioElement | null;
  }>({
    main: null,
    hidden: null,
  });
  
  // 2. 각각의 재생 상태 관리
  const [isMainPlaying, setIsMainPlaying] = useState(false);
  const [isHiddenPlaying, setIsHiddenPlaying] = useState(false);

  // 초기 설정 (메인 오디오 자동 재생 시도)
  useEffect(() => {
    const { main, hidden } = audioRefs.current;

    // 공통 설정 적용
    [main, hidden].forEach((el) => {
      if (el) {
        el.loop = true;
        el.volume = 0.5;
      }
    });

    // 메인 오디오 자동 재생 시도
    const attemptAutoplay = async () => {
      if (main) {
        try {
          await main.play();
          setIsMainPlaying(true);
        } catch (error) {
          console.warn("⚠️ Autoplay blocked by browser");
        }
      }
    };

    attemptAutoplay();
  }, []);

  // 2. 메인 오디오 토글 핸들러
  const toggleMainPlay = () => {
    const { main, hidden } = audioRefs.current;
    if (!main || !hidden) return;

    if (isMainPlaying) {
      main.pause();
      setIsMainPlaying(false);
    } else {
      // 메인 켤 때 히든은 끔
      hidden.pause();
      setIsHiddenPlaying(false);
      main.play();
      setIsMainPlaying(true);
    }
  };

  // 3. 히든 오디오 토글 핸들러
  const toggleHiddenPlay = () => {
    const { main, hidden } = audioRefs.current;
    if (!main || !hidden) return;

    if (isHiddenPlaying) {
      hidden.pause();
      setIsHiddenPlaying(false);
    } else {
      // 히든 켤 때 메인은 끔
      main.pause();
      setIsMainPlaying(false);
      hidden.play();
      setIsHiddenPlaying(true);
    }
  };

  return (
   <MainSectionContainer className={`wedding-container jwk-${watermarkId.slice(0, 8)}-main`}>
     <SnowEffect />
      {}
      <BackgroundImage 
        src={weddingConfig.main.image}
        alt="main image"
        fill
        priority
        sizes="100vw"
        quality={90}
        style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
      />

      <Overlay />

      {/* 메인 플레이어 */}
    <MainPlayerWrapper>
      <audio
        // Callback Ref를 사용하여 객체의 main 키에 할당
        ref={(el) => { audioRefs.current.main = el; }} // 수정됨
        src={weddingConfig.main.backgroundMusic}
        onEnded={() => setIsMainPlaying(false)}
      />
      <Controls>
        <PlayButton onClick={toggleMainPlay} $isPlaying={isMainPlaying}>
          {isMainPlaying ? '■' : '♫'}
        </PlayButton>
      </Controls>
    </MainPlayerWrapper>

    {/* 히든 플레이어 */}
    <HiddenPlayerWrapper>
      <audio
        // Callback Ref를 사용하여 객체의 hidden 키에 할당
        ref={(el) => { audioRefs.current.hidden = el; }} // 수정됨
        src={weddingConfig.main.hiddenMusic}
        onEnded={() => setIsHiddenPlaying(false)}
      />
      <Controls>
        <HiddenPlayButton onClick={toggleHiddenPlay} $isPlaying={isHiddenPlaying}>
          {isHiddenPlaying ? '■' : '♫'}
        </HiddenPlayButton>
      </Controls>
    </HiddenPlayerWrapper>

    <MainContent>
      <MainTitle>{weddingConfig.main.title}</MainTitle>
      <DateText>{weddingConfig.main.date}</DateText>
      <VenueText>{weddingConfig.main.venue}</VenueText>
      {}
      <HiddenWatermark aria-hidden="true">
        {watermarkId}
      </HiddenWatermark>
    </MainContent>
      
    <ScrollIndicator>
      <i className="fas fa-chevron-down"></i>
    </ScrollIndicator>

  </MainSectionContainer>
  );
};

const MainSectionContainer = styled.section`
  position: relative;
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 3.5vh;
  text-align: center;
  color: white;
  overflow: hidden;
  background: #f8f6f2;

  @media (min-width: 768px) and (min-height: 780px) {
    aspect-ratio: 9 / 16;
    max-width: calc(100vh * 9 / 16);
    width: auto;
    margin: 0 auto;
    border-radius: 24px; /* 선택사항: 모서리 둥글게 */
    box-shadow: 0 0 32px rgba(0,0,0,0.08); /* 선택사항: 그림자 */
  }
`;

const BackgroundImage = styled(Image)`
  z-index: 0;
`;

/* 오디오 추가 시작 */
const MainPlayerWrapper = styled.div`
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  
  /* 유리창 효과 (Glassmorphism) */
  background: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(10px);
  
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: auto;
`;

const HiddenPlayerWrapper = styled.div`
  position: fixed;
  top: 12px;
  left: 12px;
  opacity: 0.03;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  
  /* 유리창 효과 (Glassmorphism) */
  background: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(10px);
  
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: auto;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlayButton = styled.button<{ $isPlaying: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #333; /* 어두운 배경 */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
`;

const HiddenPlayButton = styled.button<{ $isPlaying: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: none; /* 밝은한 포인트 */
  color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
`;

const Content = styled.main`
  padding: 2rem;
  overflow-y: auto;
`;

/* 오디오 추가 끝 */

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%);
  z-index: 1;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 2;
  margin-top: 0.5vh;
  @media (max-width: 600px) {
    margin-top: 0.5vh;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const MainTitle = styled.h1`
  font-family: 'PlayfairDisplay', 'Times New Roman', serif;
  font-style: italic;
  font-size: 3rem;
  min-height: 3rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  font-weight: 400;
  line-height: 1.2;
  
  /* 기본 크기에서 세로 길이가 짧을 때 */
  @media (min-width: 769px) and (max-height: 700px) {
    letter-spacing: 1.5px;
    margin-bottom: 0.8rem;
  }
  @media (min-width: 769px) and (max-height: 600px) {
    letter-spacing: 1px;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    min-height: 2.5rem;
  }
  
  /* 768px 이하에서 세로 길이가 짧을 때 */
  @media (max-width: 768px) and (max-height: 650px) {
    letter-spacing: 1px;
    margin-bottom: 0.8rem;
  }
  @media (max-width: 768px) and (max-height: 550px) {
    letter-spacing: 0.5px;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 450px) {
    font-size: 2rem;
    min-height: 2rem;
    letter-spacing: 1.5px;
  }
  
  /* 450px 이하에서 세로 길이가 짧을 때 */
  @media (max-width: 450px) and (max-height: 600px) {
    letter-spacing: 1px;
    margin-bottom: 0.8rem;
  }
  @media (max-width: 450px) and (max-height: 500px) {
    letter-spacing: 0.5px;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1.8rem;
    min-height: 1.8rem;
    letter-spacing: 1px;
  }
  
  /* 360px 이하에서 세로 길이가 짧을 때 */
  @media (max-width: 360px) and (max-height: 550px) {
    letter-spacing: 0.5px;
    margin-bottom: 0.8rem;
  }
  @media (max-width: 360px) and (max-height: 450px) {
    letter-spacing: 0.2px;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 295px) {
    font-size: 1.6rem;
    min-height: 1.6rem;
    letter-spacing: 0.5px;
  }
  
  /* 295px 이하에서 세로 길이가 짧을 때 */
  @media (max-width: 295px) and (max-height: 500px) {
    letter-spacing: 0.2px;
    margin-bottom: 0.8rem;
  }
  @media (max-width: 295px) and (max-height: 400px) {
    letter-spacing: 0px;
    margin-bottom: 0.6rem;
  }
`;

const DateText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  
  /* 기본 크기에서 세로 길이가 짧을 때 */
  @media (min-width: 769px) and (max-height: 700px) {
    margin-bottom: 0.4rem;
  }
  @media (min-width: 769px) and (max-height: 600px) {
    margin-bottom: 0.3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    min-height: 0.3rem;
  }
  
  /* 768px 이하에서 세로 길이가 짧을 때 */
  @media (max-width: 768px) and (max-height: 650px) {
    margin-bottom: 0.4rem;
  }
  @media (max-width: 768px) and (max-height: 550px) {
    margin-bottom: 0.3rem;
  }
  
  @media (max-width: 450px) {
    font-size: 1.1rem;
    margin-bottom: 0.15rem;
  }
  
  /* 450px 이하에서 세로 길이가 짧을 때 */
  @media (max-width: 450px) and (max-height: 600px) {
    margin-bottom: 0.1rem;
  }
  @media (max-width: 450px) and (max-height: 500px) {
    margin-bottom: 0.05rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1rem;
    margin-bottom: 0.1rem;
  }
  
  /* 360px 이하에서 세로 길이가 짧을 때 */
  @media (max-width: 360px) and (max-height: 550px) {
    margin-bottom: 0.05rem;
  }
  @media (max-width: 360px) and (max-height: 450px) {
    margin-bottom: 0.02rem;
  }
  
  @media (max-width: 295px) {
    font-size: 0.9rem;
    margin-bottom: 0.05rem;
  }
  
  /* 295px 이하에서 세로 길이가 짧을 때 */
  @media (max-width: 295px) and (max-height: 500px) {
    margin-bottom: 0.02rem;
  }
  @media (max-width: 295px) and (max-height: 400px) {
    margin-bottom: 0rem;
  }
`;

const VenueText = styled.p`
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  @media (max-width: 450px) {
    font-size: 0.9rem;
  }
  @media (max-width: 360px) {
    font-size: 0.85rem;
  }
  @media (max-width: 295px) {
    font-size: 0.75rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-20px);
    }
    60% {
      transform: translateX(-50%) translateY(-10px);
    }
  }
`;

const HiddenWatermark = styled.span`
  position: absolute;
  opacity: 0.01;
  font-size: 1px;
  color: rgba(255, 255, 255, 0.01);
  pointer-events: none;
  user-select: none;
  z-index: -9999;
  bottom: 0;
  right: 0;
`;

export default MainSection; 