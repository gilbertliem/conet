import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Sparkles, 
  Search, 
  Layers, 
  MapPin, 
  TrendingUp,
  Cpu,
  BrainCircuit,
  SlidersHorizontal,
  ChevronDown,
  Filter,
  X,
  Check,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderNavbarProps {
  selectedDepartment: string;
  onSelectDepartment: (dept: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalHubsCount: number;
  activeProsCount: number;
  activeProjectsCount: number;
  onOpenUserProfile?: () => void;
  onOpenQA?: () => void;
}

const DEPARTMENTS = [
  { id: 'all', label: 'All Departments', icon: Layers, desc: 'Show all workspace hubs and active professionals' },
  { id: 'AI Research', label: 'AI & Machine Learning', icon: BrainCircuit, desc: 'Generative AI, LLMs, Neural Networks & Data Science' },
  { id: 'Fintech', label: 'Fintech & Capital', icon: TrendingUp, desc: 'Quantitative Trading, DeFi, Banking & Web3' },
  { id: 'Product & UX', label: 'Product & UX Strategy', icon: SlidersHorizontal, desc: 'Design Systems, User Research & Product Architecture' },
  { id: 'Biotech', label: 'Biotech & CleanTech', icon: Cpu, desc: 'Genomics, Climate Systems & Renewable Tech' },
  { id: 'Robotics', label: 'Robotics & Hardware', icon: Building2, desc: 'Embedded Systems, IoT & Autonomous Hardware' },
  { id: 'Legal Tech', label: 'Legal & M&A', icon: MapPin, desc: 'IP Protection, Cross-border Compliance & Venture Legal' },
];

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  selectedDepartment,
  onSelectDepartment,
  searchQuery,
  onSearchChange,
  totalHubsCount,
  activeProsCount,
  activeProjectsCount,
  onOpenUserProfile,
  onOpenQA,
}) => {
  const [isFilterCardOpen, setIsFilterCardOpen] = useState(false);

  const currentCategoryLabel = DEPARTMENTS.find(d => d.id === selectedDepartment)?.label || 'All Departments';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Top Main Bar */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo & Live Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white shadow-md shadow-purple-500/20">
            <BrainCircuit className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border-2 border-white"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                CO<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4]">NET</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200">
                District Hub
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              SF Innovation District • Cross-Industry Workspace
            </p>
          </div>
        </div>

        {/* Search Bar + Filter Icon Group */}
        <div className="relative flex items-center gap-2 flex-1 max-w-lg min-w-[280px]">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search projects, hubs or skills..."
              className="w-full pl-11 pr-8 py-2 bg-slate-100 border border-slate-200/80 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Icon Button (Placed directly to the right of search bar) */}
          <div className="relative">
            <button
              onClick={() => setIsFilterCardOpen(!isFilterCardOpen)}
              className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                selectedDepartment !== 'all' || isFilterCardOpen
                  ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white border-transparent shadow-md ring-2 ring-purple-300/50'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Filter Categories"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">
                {selectedDepartment !== 'all' ? currentCategoryLabel.split(' ')[0] : 'Categories'}
              </span>
              {selectedDepartment !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Dedicated Card showing all categories when Filter icon is clicked */}
            <AnimatePresence>
              {isFilterCardOpen && (
                <>
                  {/* Backdrop overlay */}
                  <div 
                    className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-2xs" 
                    onClick={() => setIsFilterCardOpen(false)}
                  />
                  
                  {/* Floating Categories Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    className="absolute top-full right-0 mt-3 z-50 w-80 sm:w-[480px] bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 space-y-4 text-slate-900"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-purple-100 text-purple-700 border border-purple-200">
                          <Filter className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">Department Categories</h3>
                          <p className="text-[11px] text-slate-500">Filter workspace hubs and professionals</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsFilterCardOpen(false)}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[360px] overflow-y-auto p-1">
                      {DEPARTMENTS.map((dept) => {
                        const Icon = dept.icon;
                        const isSelected = selectedDepartment === dept.id;
                        return (
                          <button
                            key={dept.id}
                            onClick={() => {
                              onSelectDepartment(dept.id);
                              setIsFilterCardOpen(false);
                            }}
                            className={`p-3 rounded-2xl border text-xs text-left transition-all flex items-start gap-3 group relative ${
                              isSelected
                                ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 border-purple-400 text-purple-950 font-bold shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                          >
                            <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isSelected ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 group-hover:text-purple-600'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold truncate text-slate-900">{dept.label}</div>
                              <p className="text-[10px] text-slate-500 font-normal line-clamp-1 mt-0.5">{dept.desc}</p>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Selected: <strong className="text-purple-700">{currentCategoryLabel}</strong>
                      </span>
                      {selectedDepartment !== 'all' && (
                        <button
                          onClick={() => {
                            onSelectDepartment('all');
                            setIsFilterCardOpen(false);
                          }}
                          className="text-xs font-bold text-slate-600 hover:text-purple-700 underline"
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Q&A Button (Placed between Categories and Hubs) */}
          <button
            onClick={onOpenQA}
            className="px-3.5 py-2 rounded-full border border-slate-200/90 bg-slate-100 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-800 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-2xs group"
            title="Open Workspace Community Q&A"
          >
            <HelpCircle className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
            <span>Q&A</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-700 font-extrabold border border-purple-200">
              FAQ
            </span>
          </button>
        </div>

        {/* Live Metrics & Profile */}
        <div className="flex items-center gap-3">
          {/* Live Platform Metrics Pills */}
          <div className="hidden xl:flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/80 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-fuchsia-600" />
              <span className="font-medium text-slate-500">Hubs:</span>
              <span className="font-bold text-slate-900">{totalHubsCount}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-violet-600" />
              <span className="font-medium text-slate-500">Pros:</span>
              <span className="font-bold text-slate-900">{activeProsCount}</span>
            </div>
          </div>

          {/* User Account Capsule */}
          <div 
            onClick={onOpenUserProfile}
            className="flex items-center gap-2.5 p-1 pl-2 rounded-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200 cursor-pointer transition-all active:scale-95"
            title="View User Profile"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="My Avatar"
                className="w-7 h-7 rounded-full object-cover border border-white"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="hidden sm:block text-left text-xs pr-1">
              <div className="font-bold text-slate-800 leading-tight">Alex Rivera</div>
              <div className="text-[10px] text-slate-500">Enterprise Member</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 pr-1" />
          </div>
        </div>

      </div>
    </header>
  );
};
