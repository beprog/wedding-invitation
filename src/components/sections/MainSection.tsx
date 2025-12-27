'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';

const watermarkId = weddingConfig.meta._jwk_watermark_id || 'JWK-NonCommercial';

const MainSection: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // 1. 초기 자동 재생 시도 및 볼륨 설정
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      console.log("🎵 Audio Loaded: Volume set to 50%");

      audioRef.current.play().catch(() => console.log("Autoplay blocked by browser"));
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log("▶️ Autoplay Success: Music started");
        })
        .catch(() => {
          console.warn("⚠️ Autoplay Blocked: Interaction required");
        });
    }
  }, []);

  // 2. 재생/일시정지 핸들러
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        console.log("⏸ Audio Paused");
      } else {
        audioRef.current.play();
        console.log("▶️ Audio Playing");
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MainSectionContainer className={`wedding-container jwk-${watermarkId.slice(0, 8)}-main`}>
      {}
      <BackgroundImage 
        src={weddingConfig.main.image}
        alt="웨딩 배경 이미지"
        fill
        priority
        sizes="100vw"
        quality={90}
        style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
      />

      <Overlay />

      <PlayerWrapper>
        <audio
          ref={audioRef}
          src={weddingConfig.main.music}
          onEnded={() => {
            setIsPlaying(false);
            console.log("🏁 Playback Finished");
          }}
        />
        <Controls>
          <PlayButton onClick={togglePlay} $isPlaying={isPlaying}>
            {isPlaying ? '■' : '▶'}
          </PlayButton>
        </Controls>
      </PlayerWrapper>

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

/* 추가 시작 */
const PlayerWrapper = styled.div`
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  
  /* 유리창 효과 (Glassmorphism) */
  background: rgba(255, 255, 255, 0.2); 
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
  background: #555; /* 다크한 포인트 */
  color: white;
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

/* 추가 끝 */

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