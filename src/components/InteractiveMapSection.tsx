import React, { useState } from 'react';
import { CoWorkingSpace, CheckInLog } from '../types';
import { 
  MapPin, 
  Users, 
  Sparkles, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Flame, 
  Radio, 
  Star, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Activity,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveMapSectionProps {
  spaces: CoWorkingSpace[];
  selectedSpaceId: string;
  onSelectSpace: (space: CoWorkingSpace) => void;
  checkInLogs: CheckInLog[];
  onOpenBookingForSpace: (space: CoWorkingSpace) => void;
}

export const InteractiveMapSection: React.FC<InteractiveMapSectionProps> = ({
  spaces,
  selectedSpaceId,
  onSelectSpace,
  checkInLogs,
  onOpenBookingForSpace,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapLayer, setMapLayer] = useState<'vector' | 'heatmap' | 'synergy'>('vector');
  const [hoveredSpaceId, setHoveredSpaceId] = useState<string | null>(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 1.6));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-[640px] bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-md group">
      
      {/* Map Control Bar Overlay Top Left */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-200/80 shadow-md">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
          <button
            onClick={() => setMapLayer('vector')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              mapLayer === 'vector'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>District Grid</span>
          </button>
          
          <button
            onClick={() => setMapLayer('heatmap')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              mapLayer === 'heatmap'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>Occupancy Density</span>
          </button>

          <button
            onClick={() => setMapLayer('synergy')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              mapLayer === 'synergy'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI Synergy Clusters</span>
          </button>
        </div>
      </div>

      {/* Zoom Controls Overlay Top Right */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-200/80 shadow-md">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          title="Reset Zoom"
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Vector City Map Canvas Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[#F8FAFC] bg-dot-pattern cursor-grab active:cursor-grabbing">
        
        <motion.div 
          className="relative w-full h-full min-h-[600px] flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          
          {/* Detailed Custom SVG Vector Map Background */}
          <svg className="absolute inset-0 w-full h-full text-slate-300" preserveAspectRatio="none">
            <defs>
              {/* Radar Grid Gradient */}
              <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.12" />
                <stop offset="70%" stopColor="#f1f5f9" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Water Bay Gradient */}
              <linearGradient id="bay-water" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Radar Background Glow Circle */}
            <circle cx="50%" cy="50%" r="42%" fill="url(#radar-glow)" />

            {/* Animated Radar Sweep Line */}
            <g className="animate-radar origin-center opacity-40">
              <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 50% 50% L 90% 50% A 40% 40% 0 0 0 78% 22% Z" fill="#06b6d4" fillOpacity="0.08" />
            </g>

            {/* Water Coastline & Bay Curve */}
            <path
              d="M 0,120 Q 350,180 600,100 T 1200,300 L 1200,0 L 0,0 Z"
              fill="url(#bay-water)"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="opacity-80"
            />

            {/* San Francisco District Grid Lines */}
            <path d="M 0,220 C 300,240 600,200 1200,450" fill="none" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
            <path d="M 150,0 C 200,300 450,500 800,900" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 500,0 L 500,900" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 8" />
            <path d="M 0,400 L 1200,400" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 8" />

            {/* District Boundary Polygons */}
            <polygon points="320,180 520,160 560,360 360,380" fill="#ec4899" fillOpacity="0.05" stroke="#ec4899" strokeWidth="1" strokeDasharray="4 4" />
            <polygon points="540,380 820,320 860,600 580,620" fill="#06b6d4" fillOpacity="0.05" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" />
            <polygon points="180,520 420,480 380,780 140,820" fill="#8b5cf6" fillOpacity="0.05" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4" />
            <polygon points="720,140 980,110 1020,340 760,380" fill="#10b981" fillOpacity="0.05" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />

            {/* District Labels */}
            <text x="380" y="220" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.5">FINANCIAL DISTRICT</text>
            <text x="620" y="440" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.5">SOMA TECH CORRIDOR</text>
            <text x="220" y="600" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.5">MISSION INNOVATION HUB</text>
            <text x="780" y="200" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.5">BAYFRONT HARBOR QUARTER</text>
          </svg>

          {/* Heatmap Overlay Layer */}
          {mapLayer === 'heatmap' && (
            <div className="absolute inset-0 pointer-events-none">
              {spaces.map((sp) => (
                <div
                  key={`heat-${sp.id}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse-ring"
                  style={{
                    left: `${sp.coords.x}%`,
                    top: `${sp.coords.y}%`,
                    width: `${sp.occupancyCurrent * 4}px`,
                    height: `${sp.occupancyCurrent * 4}px`,
                    background: `radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, rgba(139, 92, 246, 0.15) 60%, transparent 100%)`,
                  }}
                />
              ))}
            </div>
          )}

          {/* AI Synergy Layer Overlay */}
          {mapLayer === 'synergy' && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="38%" y1="32%" x2="58%" y2="48%" stroke="#ec4899" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
              <line x1="38%" y1="32%" x2="74%" y2="28%" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="58%" y1="48%" x2="28%" y2="68%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          )}

          {/* Interactive Co-Working Space Pins */}
          {spaces.map((space) => {
            const isSelected = selectedSpaceId === space.id;
            const isHovered = hoveredSpaceId === space.id;
            const occupancyPct = Math.round((space.occupancyCurrent / space.occupancyCapacity) * 100);
            const isHighCapacity = occupancyPct >= 80;

            return (
              <div
                key={space.id}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin transition-all duration-300"
                style={{ left: `${space.coords.x}%`, top: `${space.coords.y}%` }}
                onClick={() => onSelectSpace(space)}
                onMouseEnter={() => setHoveredSpaceId(space.id)}
                onMouseLeave={() => setHoveredSpaceId(null)}
              >
                {/* Outer Pulsing Ring for Selected Pin */}
                {isSelected && (
                  <span className="absolute -inset-4 rounded-full bg-pink-500/20 animate-ping pointer-events-none"></span>
                )}

                {/* Main Pin Marker Capsule */}
                <div
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 transform group-hover/pin:scale-110 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] border-white text-white shadow-lg ring-4 ring-purple-400/30 scale-105'
                      : 'bg-white border-slate-300 text-slate-800 hover:border-purple-500 hover:bg-slate-50 shadow-md'
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex items-center justify-center ${
                      isHighCapacity ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                  </div>

                  <span className="text-xs font-bold tracking-tight whitespace-nowrap">
                    {space.name}
                  </span>

                  {/* Occupancy Pill */}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isHighCapacity
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {occupancyPct}%
                  </span>
                </div>

                {/* Detailed Hover Card Popup on Pin Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -8, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 w-72 bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xl z-30 pointer-events-none text-slate-900"
                    >
                      {/* Space Cover Image */}
                      <div className="relative h-24 rounded-xl overflow-hidden mb-2.5">
                        <img
                          src={space.image}
                          alt={space.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-amber-600 border border-slate-200 flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          {space.rating}
                        </span>
                      </div>

                      {/* Space Info */}
                      <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1">
                        {space.name}
                      </h4>
                      <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-600" />
                        {space.district}
                      </p>

                      {/* Occupancy Progress Bar */}
                      <div className="space-y-1 mb-2.5">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                          <span>Live Occupancy</span>
                          <span className="font-bold text-purple-600">
                            {space.occupancyCurrent} / {space.occupancyCapacity} seats
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isHighCapacity
                                ? 'bg-amber-500'
                                : 'bg-gradient-to-r from-[#EC4899] to-[#06B6D4]'
                            }`}
                            style={{ width: `${occupancyPct}%` }}
                          />
                        </div>
                      </div>

                      {/* Top Active Departments */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {space.topDepartments.map((dept) => (
                          <span
                            key={dept}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {dept}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-purple-600 font-bold flex items-center justify-between pt-2 border-t border-slate-100">
                        <span>Click to view active pros</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Live Check-in Ticker Bar (Bottom Area) */}
      <div className="z-20 bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
          </span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Live Hub Stream
          </span>
        </div>

        {/* Scrolling Ticker Items */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
            {checkInLogs.map((log) => (
              <div
                key={log.id}
                className="inline-flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs"
              >
                <img
                  src={log.avatar}
                  alt={log.professionalName}
                  className="w-5 h-5 rounded-full object-cover border border-slate-200"
                />
                <span className="font-bold text-slate-900">{log.professionalName}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{log.jobTitle}</span>
                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-purple-50 text-purple-700 rounded border border-purple-200">
                  {log.spaceName}
                </span>
                <span className="text-[10px] text-slate-400">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 border-l border-slate-200 pl-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-time Access Verified</span>
        </div>
      </div>
    </div>
  );
};
