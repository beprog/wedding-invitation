import React from 'react';
import { weddingConfig } from '../config/wedding-config';
import Watermark from '../lib/watermark';
import { GlobalStyle } from '../styles/globalStyles';
import CacheManager from '../components/CacheManager';

const watermarkId = weddingConfig.meta._jwk_watermark_id || 'JWK-NonCommercial';
const metaDescription = '웨딩 청첩장 - 비상업적 용도';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {}
      <head>
        <link
          rel="preload"
          href="/fonts/PlayfairDisplay-Italic.ttf" 
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/MaruBuri-Regular.ttf" 
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {}
        <meta name="generator" content={`Wedding-Template-${watermarkId}`} />
        <meta name="description" content={metaDescription} />
      </head>
      <body>
        <audio src={weddingConfig.main.music} controls autoplay>
          브라우저가 오디오 태그를 지원하지 않습니다.
        </audio>
        <GlobalStyle />
        <CacheManager />
        {}
        <Watermark />
        {children}
      </body>
    </html>
  );
} 