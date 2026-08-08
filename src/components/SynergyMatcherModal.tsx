import React, { useState } from 'react';
import { CoWorkingSpace, Professional } from '../types';
import { X, Sparkles, BrainCircuit, Users, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SynergyMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaces: CoWorkingSpace[];
  professionals: Professional[];
  onSelectSpace: (space: CoWorkingSpace) => void;
  onSelectProfessional: (prof: Professional) => void;
}

export const SynergyMatcherModal: React.FC<SynergyMatcherModalProps> = ({
  isOpen,
  onClose,
  spaces,
  professionals,
  onSelectSpace,
  onSelectProfessional,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('ai_fintech');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter top matched professionals
  const topMatches = professionals.filter((p) => {
    if (selectedGoal === 'ai_fintech') return p.department === 'AI Research' || p.department === 'Fintech';
    if (selectedGoal === 'biotech_ai') return p.department === 'Biotech' || p.department === 'AI Research';
    if (selectedGoal === 'ux_robotics') return p.department === 'Product & UX' || p.department === 'Robotics';
    return true;
  });

  const topHub = spaces[0]; // Apex Innovation Hub for AI x Fintech

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-5 text-slate-900"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">
                AI Cross-Industry Matcher
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Find Optimal Co-Working Hub & Collab Partners
              </h3>
            </div>
          </div>

          {/* Goal Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">
              Select Your Cross-Department Objective:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedGoal('ai_fintech')}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                  selectedGoal === 'ai_fintech'
                    ? 'bg-purple-50 text-purple-800 border-purple-500 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>AI Research × Fintech M&A</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">High Density in Financial District</div>
              </button>

              <button
                onClick={() => setSelectedGoal('biotech_ai')}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                  selectedGoal === 'biotech_ai'
                    ? 'bg-purple-50 text-purple-800 border-purple-500 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>Biotech × AI Discovery</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">High Density in Mission Hub</div>
              </button>

              <button
                onClick={() => setSelectedGoal('ux_robotics')}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                  selectedGoal === 'ux_robotics'
                    ? 'bg-purple-50 text-purple-800 border-purple-500 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>Product UX × Robotics</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">High Density in SoMa Tech Corridor</div>
              </button>
            </div>
          </div>

          {/* Recommended Location Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 98% Optimal Synergy Location Match
              </span>
              <span className="text-slate-500">{topHub.district}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-extrabold text-slate-900">{topHub.name}</h4>
                <p className="text-xs text-slate-500">{topHub.address}</p>
              </div>
              <button
                onClick={() => {
                  onSelectSpace(topHub);
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white shadow-md flex items-center gap-1 hover:opacity-95"
              >
                Jump to Hub <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Top Active Matches */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">
              Top Checked-In Professionals for Synergy:
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {topMatches.map((prof) => {
                const isAvailable = prof.availabilityStatus === 'available';
                return (
                  <div
                    key={prof.id}
                    onClick={() => {
                      onSelectProfessional(prof);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-purple-300 cursor-pointer flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={prof.avatar}
                          alt={prof.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white ${
                            isAvailable ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{prof.name}</div>
                        <div className="text-[11px] text-slate-500">{prof.jobTitle} • {prof.company}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded border flex items-center gap-1 ${
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
