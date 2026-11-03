import React, { useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  thumbnailMobUrl?: string;
}

function YouTubeFacade({ videoId, title, thumbnailUrl, thumbnailMobUrl }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 0 }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      onTouchEnd={() => setIsPlaying(true)}
      aria-label={`Play video: ${title}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'block',
        padding: 0,
        margin: 0,
        border: 'none',
        background: '#000',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <img
        src={thumbnailUrl}
        srcSet={thumbnailMobUrl ? `${thumbnailMobUrl} 480w, ${thumbnailUrl} 1280w` : undefined}
        sizes="(max-width: 768px) 100vw, 640px"
        alt={title}
        width={1280}
        height={720}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          transition: 'background-color 0.2s ease',
        }}
      >
        <svg
          height="48"
          viewBox="0 0 68 48"
          width="68"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
            transition: 'transform 0.2s ease',
          }}
        >
          <path
            className="yt-button-bg"
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
            fill="#ff0000"
          />
          <path d="M 45,24 27,14 27,34" fill="#ffffff" />
        </svg>
      </div>
    </button>
  );
}

export default function Vision() {
  return (
    <section id="vision" className="vision-section section-pad">
      <div className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: 60 }} data-aos="fade-up">
          <span className="section-label" style={{ justifyContent: 'center' }}>VEDVET Vision</span>
          <h2 className="section-title">Our Vision in Action</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            See how we are transforming animal healthcare and bringing our expertise to the world.
          </p>
        </div>
        <div className="vision-grid">
          <div className="vision-sub-videos">
            <div className="vision-sub-video" data-aos="fade-up" data-aos-delay="100">
              <YouTubeFacade
                videoId="gGXD6ZF59HE"
                title="YouTube video player"
                thumbnailUrl="/images/vision/vision-1.webp"
                thumbnailMobUrl="/images/vision/vision-1-mobile.webp"
              />
            </div>
            <div className="vision-sub-video" data-aos="fade-up" data-aos-delay="200">
              <YouTubeFacade
                videoId="Z2boed3qLLM"
                title="YouTube video player"
                thumbnailUrl="/images/vision/vision-2.webp"
                thumbnailMobUrl="/images/vision/vision-2-mobile.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
