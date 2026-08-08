import React, { useState } from 'react';
import { CoWorkingSpace, Professional } from '../types';
import { 
  MapPin, 
  Star, 
  Users, 
  Wifi, 
  Mic, 
  Monitor, 
  Coffee, 
  Armchair, 
  LayoutGrid, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Search, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Building2, 
  Cpu, 
  BarChart3, 
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

interface LocationDetailsSidebarProps {
  space: CoWorkingSpace;
  activeProfessionals: Professional[];
  onSelectProfessional: (prof: Professional) => void;
  onOpenBooking: () => void;
  searchFilter: string;
  onSearchFilterChange: (q: string) => void;
}

// Icon mapper for amenities
const getAmenityIcon = (iconName: string) => {
  switch (iconName) {
    case 'Wifi': return Wifi;
    case 'Mic': return Mic;
    case 'Monitor': return Monitor;
    case 'Coffee': return Coffee;
    case 'Armchair': return Armchair;
    case 'LayoutGrid': return LayoutGrid;
    default: return CheckCircle2;
  }
};

export const LocationDetailsSidebar: React.FC<LocationDetailsSidebarProps> = ({
  space,
  activeProfessionals,
  onSelectProfessional,
  onOpenBooking,
  searchFilter,
  onSearchFilterChange,
}) => {
  const [activeTab, setActiveTab] = useState<'pros' | 'analytics' | 'projects'>('pros');

  const filteredPros = activeProfessionals.filter((p) => {
    if (!searchFilter) return true;
    const query = searchFilter.toLowerCase();
    const matchBasic =
      p.name.toLowerCase().includes(query) ||
      p.jobTitle.toLowerCase().includes(query) ||
      p.company.toLowerCase().includes(query) ||
      p.department.toLowerCase().includes(query) ||
      (p.industryTag && p.industryTag.toLowerCase().includes(query)) ||
      p.skills.some((s) => s.toLowerCase().includes(query));

    const matchPortfolio = p.portfolio?.some(
      (proj) =>
        proj.title.toLowerCase().includes(query) ||
        proj.description.toLowerCase().includes(query) ||
        proj.category.toLowerCase().includes(query) ||
        proj.tags.some((t) => t.toLowerCase().includes(query))
    );

    const matchTimeline = p.timeline?.some(
      (t) =>
        t.role.toLowerCase().includes(query) ||
        t.summary.toLowerCase().includes(query) ||
        t.company.toLowerCase().includes(query)
    );

    return matchBasic || matchPortfolio || matchTimeline;
  });

  const occupancyPct = Math.round((space.occupancyCurrent / space.occupancyCapacity) * 100);

  return (
    <aside className="w-full lg:w-[420px] xl:w-[440px] shrink-0 h-full flex flex-col bg-white border-l border-slate-200/90 shadow-lg overflow-hidden rounded-2xl">
      
      {/* Header Banner */}
      <div className="relative h-44 shrink-0 overflow-hidden">
        <img
          src={space.coverImage || space.image}
          alt={space.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-amber-600 border border-slate-200 flex items-center gap-1.5 shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {space.rating} ({space.reviewsCount} reviews)
          </span>
        </div>

        {/* Space Title & Location */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-purple-500/20 text-purple-200 border border-purple-400/30 backdrop-blur-xs">
              {space.district}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {space.noiseLevel}
            </span>
          </div>

          <h2 className="text-xl font-bold text-white leading-tight drop-shadow-xs">
            {space.name}
          </h2>
          <p className="text-xs text-slate-200 flex items-center gap-1.5 mt-0.5 drop-shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            <span className="truncate">{space.address}</span>
          </p>
        </div>
      </div>

      {/* Live Occupancy Gauge & Amenities */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
        {/* Occupancy Status */}
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-slate-800">Current Occupancy</span>
            </div>
            <span className="font-extrabold text-slate-900">
              {space.occupancyCurrent} <span className="text-slate-500 font-normal">/ {space.occupancyCapacity} Seats</span> ({occupancyPct}%)
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                occupancyPct >= 80
                  ? 'bg-amber-500'
                  : 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4]'
              }`}
              style={{ width: `${occupancyPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span>Peak Hours: <strong className="text-slate-800">{space.peakOccupancyHours}</strong></span>
            <span className="text-emerald-600 font-bold">
              {space.occupancyCapacity - space.occupancyCurrent} Seats Available
            </span>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {space.amenities.map((amenity) => {
            const IconComponent = getAmenityIcon(amenity.iconName);
            return (
              <div
                key={amenity.id}
                title={amenity.description || amenity.label}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs whitespace-nowrap hover:border-slate-300 hover:text-slate-900 transition-colors"
              >
                <IconComponent className="w-3.5 h-3.5 text-purple-600" />
                <span>{amenity.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center border-b border-slate-200 bg-slate-50 p-1">
        <button
          onClick={() => setActiveTab('pros')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'pros'
              ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Active Pros ({filteredPros.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Occupancy</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'projects'
              ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Projects ({space.activeProjectsCount})</span>
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        
        {/* Tab 1: Active Professionals Directory & Quick Workspace Activity Overview */}
        {activeTab === 'pros' && (
          <div className="space-y-3">
            
            {/* Quick Workspace Activity Overview Summary Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 border border-purple-200">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                    Workspace Focus Overview
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  {space.noiseLevel}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                Currently <strong className="text-slate-900">{space.occupancyCurrent} members</strong> checked in across <strong className="text-purple-700">{space.topDepartments.join(', ')}</strong>.
              </p>

              {/* Focus Topics Breakdown */}
              <div className="space-y-1.5 pt-1.5 border-t border-slate-200 text-[11px]">
                <div className="flex items-start gap-1.5 text-slate-700">
                  <span className="text-pink-600 font-bold shrink-0">•</span>
                  <span><strong className="text-slate-900">AI & Systems:</strong> LLM latency reduction, multi-agent pipelines & GPU cluster orchestration.</span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-700">
                  <span className="text-purple-600 font-bold shrink-0">•</span>
                  <span><strong className="text-slate-900">Fintech & Deals:</strong> Cross-border settlement rails & automated SEC compliance auditing.</span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-700">
                  <span className="text-cyan-600 font-bold shrink-0">•</span>
                  <span><strong className="text-slate-900">Robotics & UX:</strong> Spatial teleoperation controls & hardware prototype testing.</span>
                </div>
              </div>

              {/* Top Represented Skills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {space.topDepartments.map((dept) => (
                  <span key={dept} className="px-2 py-0.5 text-[9px] font-bold rounded bg-purple-50 text-purple-700 border border-purple-200">
                    {dept}
                  </span>
                ))}
                <span className="px-2 py-0.5 text-[9px] font-medium rounded bg-white text-slate-600 border border-slate-200">
                  PyTorch
                </span>
                <span className="px-2 py-0.5 text-[9px] font-medium rounded bg-white text-slate-600 border border-slate-200">
                  Fintech M&A
                </span>
                <span className="px-2 py-0.5 text-[9px] font-medium rounded bg-white text-slate-600 border border-slate-200">
                  Spatial UI
                </span>
              </div>
            </div>
            
            {/* Search Input Filter for Professionals */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => onSearchFilterChange(e.target.value)}
                placeholder="Filter by name, project, company..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 shadow-2xs"
              />
            </div>

            {/* Scrollable Professionals List */}
            {filteredPros.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No active professionals match your filter criteria.
              </div>
            ) : (
              filteredPros.map((prof, index) => {
                const matchedProject = searchFilter ? prof.portfolio?.find((proj) =>
                  proj.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                  proj.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
                  proj.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
                ) : null;

                return (
                  <div
                    key={prof.id}
                    onClick={() => onSelectProfessional(prof)}
                    className={`group relative p-2.5 rounded-xl transition-all duration-200 cursor-pointer border ${
                      index === 0 
                        ? 'bg-purple-50/50 border-purple-200' 
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <img
                          src={prof.avatar}
                          alt={prof.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                            {prof.name}
                          </p>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {prof.checkedInTime}
                          </span>
                        </div>

                        <p className="text-[10px] text-slate-500 truncate">
                          {prof.jobTitle}
                        </p>

                        {/* Department & Skills */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 rounded font-medium">
                            {prof.company}
                          </span>
                          <span className="text-[8px] bg-purple-100 text-purple-700 px-1.5 rounded font-bold">
                            {prof.department}
                          </span>
                        </div>

                        {/* Matched Project Pill if filtering by project name */}
                        {matchedProject && (
                          <div className="mt-1.5 pt-1 border-t border-purple-100 flex items-center gap-1 text-[9px] text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded-md border border-purple-200 font-medium truncate">
                            <span className="font-extrabold text-[8px] uppercase tracking-wider text-purple-900 shrink-0">Project:</span>
                            <span className="truncate">{matchedProject.title}</span>
                          </div>
                        )}
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors shrink-0" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Occupancy & Collaboration Analytics Graph */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                    Occupancy Trends (24h)
                  </h4>
                  <p className="text-[10px] text-slate-500">Live capacity utilization</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  Peak: 12 PM
                </span>
              </div>

              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={space.analyticsHourly}>
                    <defs>
                      <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="hour" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px', color: '#0f172a' }}
                      labelStyle={{ color: '#64748b', fontWeight: 'bold' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="occupancyPct"
                      name="Occupancy %"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorOccupancy)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Active Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded border border-amber-200">
                Active Initiative
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Cross-Border AI Settlement Rails</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Joint initiative between Fintech M&A Leads and AI Researchers.
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-200">
                <span>4 Contributors Checked In</span>
                <button className="text-purple-600 font-bold flex items-center gap-1 hover:underline">
                  Join Discussion <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prominent Fixed Bottom Booking CTA Button */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <button
          onClick={onOpenBooking}
          className="w-full py-3.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] text-white rounded-xl font-bold shadow-md hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Space</span>
        </button>
      </div>
    </aside>
  );
};
