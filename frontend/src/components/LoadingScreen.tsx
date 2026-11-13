'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if user has reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setLoading(false);
      return;
    }

    // Check if already shown in this session
    const hasLoaded = sessionStorage.getItem('kb_entered');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Sequence the cinematic reveal:
    // 0s: Logo fades in, circle animates, metallic light sweeps
    // 1.8s: Start smooth fade out
    // 2.3s: Complete unmount
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1800);

    const endTimer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('kb_entered', 'true');
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ease-out select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Golden Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,160,23,0.12)_0%,_rgba(5,5,5,0.95)_70%)] pointer-events-none" />

      {/* Subtle Golden Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#F5D77A] opacity-60 animate-ping" />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[#D4A017] opacity-40 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-[#F5D77A] opacity-50 animate-ping delay-300" />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#D4A017] opacity-40 animate-pulse delay-500" />
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {/* Thin Golden Circular Animation */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(212, 160, 23, 0.15)"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="289"
              strokeDashoffset="0"
              className="transition-all duration-1000 ease-in-out"
              style={{
                animation: 'circularStroke 1.8s ease-out forwards',
              }}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D77A" />
                <stop offset="50%" stopColor="#D4A017" />
                <stop offset="100%" stopColor="#8C641A" />
              </linearGradient>
            </defs>
          </svg>

          {/* Logo Container with Metallic Light Sweep */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden flex items-center justify-center shadow-gold-glow-lg border border-[#D4A017]/30 bg-[#08090C]">
            <Image
              src="/images/logo.png"
              alt="KICK BUNK Restaurant & Bar"
              width={176}
              height={176}
              className="object-contain p-2 scale-95"
              priority
            />

            {/* Traveling Metallic Light Ray */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#F5D77A]/35 to-transparent skew-x-[-25deg] animate-light-travel" />
            </div>
          </div>
        </div>

        {/* Brand Tagline */}
        <div className="mt-6 text-center space-y-1">
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#F5D77A] uppercase font-semibold">
            KICK BUNK
          </p>
          <p className="font-cormorant text-sm sm:text-base tracking-[0.2em] text-[#B8B1A5] uppercase italic">
            Restaurant & Bar • Bengaluru
          </p>
        </div>
      </div>

      {/* Subtle Skip Button */}
      <button
        onClick={() => {
          setLoading(false);
          sessionStorage.setItem('kb_entered', 'true');
        }}
        className="absolute bottom-8 text-xs font-mono tracking-widest text-[#B8B1A5]/60 hover:text-[#D4A017] transition-colors py-1 px-3 border border-transparent hover:border-[#D4A017]/20 rounded-full"
      >
        ENTER
      </button>

      <style jsx>{`
        @keyframes circularStroke {
          0% {
            stroke-dashoffset: 289;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};
