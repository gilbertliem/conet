import React from 'react';
import { 
  UserCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Layers,
  Award,
  Zap,
  Briefcase
} from 'lucide-react';
import { CoWorkingSpace } from '../types';

interface UserProfileSectionProps {
  currentSpace: CoWorkingSpace;
  onNavigateToLocationDetails: () => void;
  onOpenSynergyMatcher: () => void;
  onOpenBooking: () => void;
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  currentSpace,
  onNavigateToLocationDetails,
  onOpenSynergyMatcher,
  onOpenBooking,
}) => {
  return (
    <aside className="w-full lg:w-[360px] xl:w-[380px] shrink-0 flex flex-col bg-white border border-slate-200/90 shadow-md rounded-2xl overflow-hidden text-slate-900">
      
      {/* Top Banner / Cover */}
      <div className="relative h-32 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] p-4 flex items-start justify-between">
        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-purple-700 shadow-xs flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Verified Member
        </span>

        <span className="px-2.5 py-1 rounded-full bg-slate-900/40 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
          ID: #NX-8842
        </span>
      </div>

      {/* Main Profile Info Area */}
      <div className="px-5 pb-5 -mt-12 relative z-10 space-y-4 flex-1 flex flex-col justify-between">
        
        {/* Avatar + Primary Details */}
        <div>
          <div className="flex items-end justify-between mb-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80"
                alt="Dr. Alex Rivera"
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-xl border-2 border-purple-300"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white" title="Active Check-in"></span>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Dr. Alex Rivera
            </h2>
            <p className="text-xs font-bold text-purple-700 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-purple-600" />
              Lead Cross-Disciplinary Architect
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Synthetix AI × Vanguard Partnerships
            </p>
          </div>
        </div>

        {/* Current Checked-In Location Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50/80 via-slate-50 to-pink-50/50 border border-purple-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Current Active Pass
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
              Hot Desk H-04
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <img
              src={currentSpace.image}
              alt={currentSpace.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {currentSpace.name}
              </h4>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                <MapPin className="w-3 h-3 text-purple-600 shrink-0" />
                {currentSpace.district}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Status Checkmarks List (Matching the hand-drawn layout) */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Today's Check-In Log & Activities
          </span>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Checked In Today</strong>
                <span className="text-[11px] text-slate-500">Apex Innovation Hub (8:15 AM - 5:00 PM)</span>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Synergy Sync Scheduled</strong>
                <span className="text-[11px] text-slate-500">2:00 PM with Dr. Elena (AI Research)</span>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Access Pass Active</strong>
                <span className="text-[11px] text-slate-500">Wi-Fi 6E (2.5 Gbps) & Soundproof Pods</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="block text-base font-black text-slate-900">142h</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase">Co-Worked</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="block text-base font-black text-purple-700">18</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase">Synergies</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="block text-base font-black text-pink-600">6</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase">Hub Passes</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <button
            onClick={onNavigateToLocationDetails}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>View {currentSpace.name} Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-600" />
            <span>Book Workspace Pass</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
