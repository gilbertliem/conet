import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Star, 
  Zap, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Wifi, 
  Coffee, 
  Mic, 
  Armchair, 
  CheckCircle2,
  ChevronRight,
  Clock,
  TrendingUp
} from 'lucide-react';
import { CoWorkingSpace, Professional } from '../types';

interface WorkspaceInfoSectionProps {
  space: CoWorkingSpace;
  activeProfessionals: Professional[];
  onOpenBooking: () => void;
  onSelectProfessional: (prof: Professional) => void;
}

export const WorkspaceInfoSection: React.FC<WorkspaceInfoSectionProps> = ({
  space,
  activeProfessionals,
  onOpenBooking,
  onSelectProfessional,
}) => {
  const occupancyPct = Math.round((space.occupancyCurrent / space.occupancyCapacity) * 100);
  const availableSeats = space.occupancyCapacity - space.occupancyCurrent;

  return (
    <aside className="w-full lg:w-[380px] xl:w-[400px] shrink-0 flex flex-col bg-white border border-slate-200/90 shadow-md rounded-2xl overflow-hidden text-slate-900">
      
      {/* Workspace Image Cover Banner */}
      <div className="relative h-44 bg-slate-900 overflow-hidden">
        <img
          src={space.coverImage || space.image}
          alt={space.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-purple-700 shadow-xs flex items-center gap-1">
            <Building2 className="w-3 h-3 text-purple-600" />
            Selected Hub
          </span>

          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            {space.rating} ({space.reviewsCount})
          </span>
        </div>

        {/* Workspace Title & District on Banner */}
        <div className="absolute bottom-3 left-4 right-4 text-white space-y-0.5">
          <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-purple-500/80 backdrop-blur-md text-white">
            {space.district}
          </span>
          <h2 className="text-lg font-black tracking-tight text-white line-clamp-1">
            {space.name}
          </h2>
          <p className="text-[11px] text-slate-200 flex items-center gap-1 line-clamp-1">
            <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
            {space.address}
          </p>
        </div>
      </div>

      {/* Workspace Content & Details */}
      <div className="p-4 space-y-4 flex-1 flex flex-col justify-between overflow-y-auto">
        
        {/* Top Departments / Focus Topics */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Top Department Clusters
          </span>
          <div className="flex flex-wrap gap-1.5">
            {space.topDepartments.map((dept) => (
              <span
                key={dept}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200/80"
              >
                #{dept}
              </span>
            ))}
          </div>
        </div>

        {/* Checked-In Professionals List */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Checked-In Professionals ({space.occupancyCurrent})
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold">
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {activeProfessionals.filter(p => p.availabilityStatus === 'available').length} Open
              </span>
              <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {activeProfessionals.filter(p => p.availabilityStatus === 'do_not_disturb').length} Busy
              </span>
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {activeProfessionals.length > 0 ? (
              activeProfessionals.map((prof) => {
                const isAvailable = prof.availabilityStatus === 'available';
                return (
                  <div
                    key={prof.id}
                    onClick={() => onSelectProfessional(prof)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* Avatar with Availability Indicator Dot */}
                      <div className="relative shrink-0">
                        <img
                          src={prof.avatar}
                          alt={prof.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white ${
                            isAvailable
                              ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]'
                              : 'bg-rose-500'
                          }`}
                          title={isAvailable ? 'Available to Talk' : 'Do Not Disturb'}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700 truncate">
                            {prof.name}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {prof.jobTitle} • {prof.company}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill Badge */}
                    <div className="flex items-center gap-1.5 ml-2 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 ${
                          isAvailable
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                          }`}
                        />
                        {isAvailable ? 'Available' : 'Busy'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 shrink-0" />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 italic p-2 text-center bg-slate-50 rounded-xl">
                No active professionals checked in for this filter.
              </p>
            )}
          </div>
        </div>

        {/* Occupancy Analytics Card (Placed below Checked-In Professionals) */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50/90 via-slate-50 to-pink-50/70 border border-purple-200/80 space-y-3.5 shadow-2xs">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-purple-200/60">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>Occupancy Analytics</span>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300/60 shadow-2xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-Time
            </span>
          </div>

          {/* Current Occupancy Bar & Numbers */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                {space.occupancyCurrent} / {space.occupancyCapacity} Desks
              </span>
              <span className="text-[11px] font-extrabold text-purple-700 bg-white px-2 py-0.5 rounded-md border border-purple-200 shadow-2xs">
                {occupancyPct}% Full ({availableSeats} Free)
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  occupancyPct >= 85 
                    ? 'bg-amber-500' 
                    : 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4]'
                }`}
                style={{ width: `${occupancyPct}%` }}
              />
            </div>
          </div>

          {/* Hourly Traffic Distribution Mini Chart */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span>Hourly Traffic Pattern</span>
              <span className="text-amber-700 font-extrabold">Peak: {space.peakOccupancyHours}</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 items-end h-12 pt-1 bg-white/80 p-2 rounded-xl border border-purple-100">
              {[
                { time: '8 AM', height: '35%', label: '35%' },
                { time: '11 AM', height: '90%', label: '90%', peak: true },
                { time: '2 PM', height: '75%', label: '75%' },
                { time: '5 PM', height: '50%', label: '50%' },
                { time: '8 PM', height: '20%', label: '20%' },
              ].map((slot, i) => (
                <div key={i} className="flex flex-col items-center gap-1 h-full justify-end group relative">
                  <div 
                    className={`w-full rounded-t-sm transition-all ${
                      slot.peak 
                        ? 'bg-gradient-to-t from-[#8B5CF6] to-[#EC4899] shadow-xs' 
                        : 'bg-purple-200 group-hover:bg-purple-400'
                    }`} 
                    style={{ height: slot.height }}
                  />
                  <span className="text-[9px] font-semibold text-slate-500 leading-none">{slot.time}</span>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-20">
                    {slot.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Density Breakdown */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-500 block">Department Cluster Density</span>
            <div className="space-y-1 text-[11px]">
              {space.topDepartments.slice(0, 2).map((dept, idx) => {
                const pct = idx === 0 ? 55 : 35;
                return (
                  <div key={dept} className="flex items-center gap-2">
                    <span className="w-24 font-bold text-slate-700 truncate">{dept}</span>
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-purple-600"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-extrabold text-slate-800 text-[10px]">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Environmental Conditions */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1.5 border-t border-purple-200/60">
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Peak: <strong className="text-slate-800">{space.peakOccupancyHours}</strong>
            </span>
            <span className="font-bold text-slate-800 px-2 py-0.5 bg-white rounded border border-slate-200">
              🔊 {space.noiseLevel}
            </span>
          </div>
        </div>

        {/* Key Amenities Badges */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Included Amenities
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700 font-semibold">
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-200">
              <Wifi className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate">Wi-Fi 6E 2.5 Gbps</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-200">
              <Coffee className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">Artisanal Espresso</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={onOpenBooking}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Book Workspace Pass</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
