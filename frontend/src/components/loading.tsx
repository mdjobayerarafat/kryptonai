"use client";
import React from 'react';

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <style dangerouslySetInnerHTML={{ __html: `
        .trace-bg {
          stroke: #404040;
          stroke-width: 1.8;
          fill: none;
        }

        .trace-flow {
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 40 400;
          stroke-dashoffset: 438;
          filter: drop-shadow(0 0 6px currentColor);
          animation: flow 3s cubic-bezier(0.5, 0, 0.9, 1) infinite;
        }

        .blue2 {
          stroke: #399fff;
          color: #399fff;
        }
        .blue {
          stroke: #399fff;
          color: #399fff;
        }

        @keyframes flow {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}} />
      
      <div className="w-full max-w-4xl p-4">
        <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="chipGradient" x1={0} y1={0} x2={0} y2={1}>
              <stop offset="0%" stopColor="#2d2d2d" />
              <stop offset="100%" stopColor="#0f0f0f" />
            </linearGradient>
            <linearGradient id="textGradient" x1={0} y1={0} x2={0} y2={1}>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a0a0a0" />
            </linearGradient>
            <linearGradient id="pinGradient" x1={1} y1={0} x2={0} y2={0}>
              <stop offset="0%" stopColor="#dddddd" />
              <stop offset="50%" stopColor="#999999" />
              <stop offset="100%" stopColor="#666666" />
            </linearGradient>
          </defs>
          <g id="traces">
            <path d="M100 100 H200 V210 H326" className="trace-bg" />
            <path d="M100 100 H200 V210 H326" className="trace-flow blue2" />
            <path d="M80 180 H180 V230 H326" className="trace-bg" />
            <path d="M80 180 H180 V230 H326" className="trace-flow blue" />
            <path d="M60 260 H150 V250 H326" className="trace-bg" />
            <path d="M60 260 H150 V250 H326" className="trace-flow blue2" />
            <path d="M100 350 H200 V270 H326" className="trace-bg" />
            <path d="M100 350 H200 V270 H326" className="trace-flow blue" />
            <path d="M700 90 H560 V210 H474" className="trace-bg" />
            <path d="M700 90 H560 V210 H474" className="trace-flow blue" />
            <path d="M740 160 H580 V230 H474" className="trace-bg" />
            <path d="M740 160 H580 V230 H474" className="trace-flow blue2" />
            <path d="M720 250 H590 V250 H474" className="trace-bg" />
            <path d="M720 250 H590 V250 H474" className="trace-flow blue" />
            <path d="M680 340 H570 V270 H474" className="trace-bg" />
            <path d="M680 340 H570 V270 H474" className="trace-flow blue2" />
          </g>
          <rect x={330} y={190} width={140} height={100} rx={20} ry={20} fill="url(#chipGradient)" stroke="#444" strokeWidth={3} filter="drop-shadow(0 0 6px rgba(0,0,0,0.8))" />
          <g>
            <rect x={322} y={205} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={322} y={225} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={322} y={245} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={322} y={265} width={8} height={10} fill="url(#pinGradient)" rx={2} />
          </g>
          <g>
            <rect x={470} y={205} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={470} y={225} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={470} y={245} width={8} height={10} fill="url(#pinGradient)" rx={2} />
            <rect x={470} y={265} width={8} height={10} fill="url(#pinGradient)" rx={2} />
          </g>
          <text x={400} y={240} fontFamily="Arial, sans-serif" fontSize={22} fill="url(#textGradient)" textAnchor="middle" alignmentBaseline="middle" fontWeight="bold">
            Initializing...
          </text>
          <circle cx={100} cy={100} r={5} fill="#606060" />
          <circle cx={80} cy={180} r={5} fill="#606060" />
          <circle cx={60} cy={260} r={5} fill="#606060" />
          <circle cx={100} cy={350} r={5} fill="#606060" />
          <circle cx={700} cy={90} r={5} fill="#606060" />
          <circle cx={740} cy={160} r={5} fill="#606060" />
          <circle cx={720} cy={250} r={5} fill="#606060" />
          <circle cx={680} cy={340} r={5} fill="#606060" />
        </svg>
      </div>
    </div>
  );
}

export default Loader;
