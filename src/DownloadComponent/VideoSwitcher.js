import React from 'react';

function YoutubeIcon({ className }) {
  return (
    <svg
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 461.001 461.001"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* Fondo rojo */}
      <path
        fill="#F61C0D"
        d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
          c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
          C461.001,110.259,418.135,67.393,365.257,67.393z"
      />
      {/* Triángulo blanco de play */}
      <path
        fill="#fff"
        d="M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
          c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
      />
    </svg>
  );
}

function VideoSwitcher({ videoEn, videoEs, currentVideo }) {
  const hasEnglish = !!videoEn;
  const hasSpanish = !!videoEs;

  const getVideoUrl = () => {
    return currentVideo === 'en' ? videoEn : videoEs;
  };

  return (
    <div className="w-full rounded-[15px] overflow-hidden bg-[#111] border border-neutral-700">
      {/* Video */}
      <div className="relative w-full pb-[56.25%] h-0 bg-black">
        <iframe
          src={getVideoUrl()}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full border-none rounded-t-[15px]"
        ></iframe>
      </div>
      {/* Puedes quitar el switcher de aquí si ya lo tienes como botón aparte */}
    </div>
  );
}

export default VideoSwitcher;
