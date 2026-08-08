import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  UserCheck, 
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  VolumeX,
  HelpCircle,
  ThumbsUp,
  Send
} from 'lucide-react';
import { CoWorkingSpace, UserQA } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpace: CoWorkingSpace;
  onOpenBooking: () => void;
}

const INITIAL_MY_QAS: UserQA[] = [
  {
    id: 'my-qa-1',
    question: 'Hi Dr. Alex! Are you open to collaborating on cross-disciplinary AI & Fintech pipeline security?',
    askedBy: 'Marcus Vance',
    askedByTitle: 'Hub Community Manager',
    timestamp: '1 day ago',
    upvotes: 12,
    hasUpvoted: true,
    answer: {
      text: 'Yes, absolutely! I am hosting an open coffee table discussion at Apex Hub tomorrow at 10:00 AM.',
      timestamp: '18 hours ago',
      isVerifiedAnswer: true,
    },
  },
  {
    id: 'my-qa-2',
    question: 'How do you handle multi-agent orchestration latency when running models locally at the co-working hub?',
    askedBy: 'Sophia Patel',
    askedByTitle: 'Biotech Systems Analyst',
    timestamp: '2 days ago',
    upvotes: 8,
    hasUpvoted: false,
    answer: {
      text: 'We leverage local WebGPU quantizations combined with edge caching. Happy to demonstrate our setup during lunch break!',
      timestamp: '1 day ago',
      isVerifiedAnswer: true,
    },
  },
  {
    id: 'my-qa-3',
    question: 'What is your favorite quiet zone pod at Apex Innovation Hub for deep focus sessions?',
    askedBy: 'Liam O’Connor',
    askedByTitle: 'Robotics Lead',
    timestamp: '3 days ago',
    upvotes: 5,
    hasUpvoted: false,
    answer: undefined,
  },
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentSpace,
  onOpenBooking,
}) => {
  const [myStatus, setMyStatus] = useState<'available' | 'do_not_disturb'>('available');
  const [qaList, setQaList] = useState<UserQA[]>(INITIAL_MY_QAS);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleUpvote = (id: string) => {
    setQaList((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextVal = !q.hasUpvoted;
          return {
            ...q,
            hasUpvoted: nextVal,
            upvotes: nextVal ? q.upvotes + 1 : q.upvotes - 1,
          };
        }
        return q;
      })
    );
  };

  const handlePostMyAnswer = (id: string) => {
    const text = replyTextMap[id];
    if (!text || !text.trim()) return;

    setQaList((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            answer: {
              text: text.trim(),
              timestamp: 'Just now',
              isVerifiedAnswer: true,
            },
          };
        }
        return q;
      })
    );

    setReplyTextMap((prev) => ({ ...prev, [id]: '' }));
    setActiveReplyId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 animate-scaleUp text-slate-900">
        
        {/* Cover Header */}
        <div className="relative h-32 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] p-4 flex items-start justify-between">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-black uppercase tracking-wider text-purple-700 shadow-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Member Profile
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Details Content */}
        <div className="px-6 pb-6 -mt-12 relative z-10 space-y-5">
          
          {/* Avatar & Title */}
          <div className="flex items-end justify-between">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=280&q=80"
                alt="Dr. Alex Rivera"
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl border-2 border-purple-300"
              />
              <span 
                className={`absolute bottom-0 right-0 p-1.5 rounded-xl text-white font-black text-[10px] ring-2 ring-white shadow-md flex items-center gap-1 ${
                  myStatus === 'available' ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${myStatus === 'available' ? 'bg-emerald-300 animate-pulse' : 'bg-rose-300'}`} />
                {myStatus === 'available' ? 'AVAILABLE' : 'BUSY'}
              </span>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold">
                ID: #NX-8842
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Dr. Alex Rivera
            </h2>
            <p className="text-xs font-bold text-purple-700 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-purple-600" />
              Lead Cross-Disciplinary Architect
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              Synthetix AI × Vanguard Partnerships
            </p>
          </div>

          {/* Interactive Availability Status Controls */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Set Your Live Status:</span>
              <span className="text-[10px] text-slate-500 font-medium">Visible to other members</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMyStatus('available')}
                className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border ${
                  myStatus === 'available'
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${myStatus === 'available' ? 'bg-emerald-200 animate-pulse' : 'bg-emerald-500'}`} />
                <span>🟢 Available to Talk</span>
              </button>

              <button
                type="button"
                onClick={() => setMyStatus('do_not_disturb')}
                className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border ${
                  myStatus === 'do_not_disturb'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${myStatus === 'do_not_disturb' ? 'bg-rose-200' : 'bg-rose-500'}`} />
                <span>🔴 Do Not Disturb</span>
              </button>
            </div>
          </div>

          {/* Current Workspace Pass Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-slate-50 to-pink-50 border border-purple-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Current Active Pass
              </span>
              <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                Hot Desk H-04
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={currentSpace.image}
                alt={currentSpace.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {currentSpace.name}
                </h4>
                <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  {currentSpace.district}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              Today's Check-In Activities
            </span>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Checked In Today</strong>
                  <span className="text-slate-500">{currentSpace.name} (8:15 AM - 5:00 PM)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Synergy Sync Scheduled</strong>
                  <span className="text-slate-500">2:00 PM with Dr. Elena (AI Research)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Member Questions & Answers Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                Questions Asked to You ({qaList.length})
              </span>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Community Q&A
              </span>
            </div>

            <div className="space-y-3">
              {qaList.map((qa) => (
                <div
                  key={qa.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 transition-all shadow-2xs space-y-2.5 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                        <strong className="text-slate-900 font-bold">{qa.askedBy}</strong>
                        {qa.askedByTitle && <span>({qa.askedByTitle})</span>}
                        <span>• {qa.timestamp}</span>
                      </div>
                      <p className="font-bold text-slate-900 leading-snug">
                        {qa.question}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleUpvote(qa.id)}
                      className={`px-2 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 shrink-0 ${
                        qa.hasUpvoted
                          ? 'bg-purple-50 text-purple-700 border-purple-300'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      <ThumbsUp className={`w-3 h-3 ${qa.hasUpvoted ? 'fill-purple-600 text-purple-600' : ''}`} />
                      <span>{qa.upvotes}</span>
                    </button>
                  </div>

                  {/* Existing Answer */}
                  {qa.answer ? (
                    <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-bold text-purple-900 text-[11px]">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          Your Answer:
                        </span>
                        <span className="text-[10px] font-normal text-slate-400">{qa.answer.timestamp}</span>
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed pl-4">
                        {qa.answer.text}
                      </p>
                    </div>
                  ) : (
                    /* Unanswered Question Reply Input */
                    <div className="pt-1">
                      {activeReplyId === qa.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={replyTextMap[qa.id] || ''}
                            onChange={(e) =>
                              setReplyTextMap({ ...replyTextMap, [qa.id]: e.target.value })
                            }
                            placeholder="Type your answer to this question..."
                            className="w-full p-2.5 rounded-xl border border-purple-300 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveReplyId(null)}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handlePostMyAnswer(qa.id)}
                              className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-1 shadow-xs"
                            >
                              <Send className="w-3 h-3" />
                              <span>Post Answer</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveReplyId(qa.id)}
                          className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                            <span>This question needs your answer</span>
                          </span>
                          <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded font-black">
                            Reply Now
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Member Stats */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="block text-lg font-black text-slate-900">142h</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Co-Worked</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="block text-lg font-black text-purple-700">18</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Synergies</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="block text-lg font-black text-pink-600">6</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Hub Passes</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book New Workspace Pass</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
