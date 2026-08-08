import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  MessageSquare, 
  ThumbsUp, 
  Search, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2,
  Tag,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QAItem {
  id: string;
  question: string;
  author: string;
  authorTitle: string;
  category: 'Amenities & Wifi' | 'Booking & Chairs' | 'Networking & Syncs' | 'Parking & Access' | 'General';
  upvotes: number;
  hasUpvoted?: boolean;
  answer?: {
    text: string;
    responder: string;
    responderRole: string;
    timestamp: string;
    isOfficial?: boolean;
  };
  timestamp: string;
}

const INITIAL_QA_ITEMS: QAItem[] = [
  {
    id: 'qa-1',
    question: 'What is the Wi-Fi speed and ethernet connectivity in the Focus Pods at Apex Hub?',
    author: 'Elena Rostova',
    authorTitle: 'AI Research Lead',
    category: 'Amenities & Wifi',
    upvotes: 24,
    answer: {
      text: 'Apex Hub features dedicated 1Gbps symmetrical fiber optic connectivity. Focus Pods also offer direct RJ45 Cat6a gigabit ethernet ports under the desk for ultra-low latency model training.',
      responder: 'Marcus Vance',
      responderRole: 'Apex Hub Manager',
      timestamp: '2 hours ago',
      isOfficial: true,
    },
    timestamp: '5 hours ago',
  },
  {
    id: 'qa-2',
    question: 'Can I reserve specific ergonomic Herman Miller chairs in advance during peak hours?',
    author: 'David Chen',
    authorTitle: 'Fintech Systems Architect',
    category: 'Booking & Chairs',
    upvotes: 18,
    answer: {
      text: 'Yes! Using our new Sitting Position selector during workspace booking, you can choose exact desks and Herman Miller Embody chairs in row H or soundproof pods.',
      responder: 'Sarah Jenkins',
      responderRole: 'Community Director',
      timestamp: '1 day ago',
      isOfficial: true,
    },
    timestamp: '1 day ago',
  },
  {
    id: 'qa-3',
    question: 'Are there designated quiet hours or noise-canceling zones for cross-dept deep work?',
    author: 'Sophia Patel',
    authorTitle: 'Biotech Systems Analyst',
    category: 'Amenities & Wifi',
    upvotes: 15,
    answer: {
      text: 'Zone B in Catalyst Lab and Pods 1-4 in Apex Hub are designated 100% silent focus areas. Collaborative discussions are welcomed in the Central Lounge and Pod Syncs.',
      responder: 'Apex Operations Team',
      responderRole: 'Hub Support',
      timestamp: '2 days ago',
      isOfficial: true,
    },
    timestamp: '2 days ago',
  },
  {
    id: 'qa-4',
    question: 'Is parking included with the daily workspace pass, or is EV charging available?',
    author: 'Liam O’Connor',
    authorTitle: 'Robotics Hardware Lead',
    category: 'Parking & Access',
    upvotes: 12,
    answer: {
      text: 'Underground parking is free for all checked-in members. Level P2 includes 8 Tesla/Universal 50kW EV fast-charging stations accessible via your digital member pass.',
      responder: 'Facilities Desk',
      responderRole: 'Apex Facilities',
      timestamp: '3 days ago',
      isOfficial: true,
    },
    timestamp: '3 days ago',
  },
];

interface QAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QAModal: React.FC<QAModalProps> = ({ isOpen, onClose }) => {
  const [qaList, setQaList] = useState<QAItem[]>(INITIAL_QA_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCategory, setNewCategory] = useState<QAItem['category']>('General');
  const [isAsking, setIsAsking] = useState(false);

  if (!isOpen) return null;

  const categories = ['All', 'Amenities & Wifi', 'Booking & Chairs', 'Networking & Syncs', 'Parking & Access', 'General'];

  const handleUpvote = (id: string) => {
    setQaList(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextUpvoted = !item.hasUpvoted;
          return {
            ...item,
            hasUpvoted: nextUpvoted,
            upvotes: nextUpvoted ? item.upvotes + 1 : item.upvotes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQA: QAItem = {
      id: `qa-${Date.now()}`,
      question: newQuestionText.trim(),
      author: 'Dr. Alex Rivera',
      authorTitle: 'Enterprise Member',
      category: newCategory,
      upvotes: 1,
      hasUpvoted: true,
      timestamp: 'Just now',
    };

    setQaList([newQA, ...qaList]);
    setNewQuestionText('');
    setIsAsking(false);
  };

  const filteredQA = qaList.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.answer?.text.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-900 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/10 text-purple-300 border border-white/20 shadow-inner">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Workspace Member Q&A</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Hub Community
                  </span>
                </div>
                <p className="text-xs text-slate-300">Ask questions, discover hub tips & get answers from hub managers</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Toolbar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
            <div className="flex flex-wrap items-center gap-2 justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hub questions or answers..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 shadow-2xs font-medium"
                />
              </div>

              {/* Ask Question Toggle Button */}
              <button
                onClick={() => setIsAsking(!isAsking)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-xs hover:opacity-95 transition-all flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAsking ? 'Cancel' : 'Ask a Question'}</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap border ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white border-purple-700 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            
            {/* Ask Question Form Section */}
            <AnimatePresence>
              {isAsking && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddQuestion}
                  className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Post a Question to the Workspace Hub Community
                    </span>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as QAItem['category'])}
                      className="text-xs bg-white border border-purple-200 rounded-lg p-1.5 font-bold text-slate-800 outline-none"
                    >
                      <option value="Amenities & Wifi">Amenities & Wifi</option>
                      <option value="Booking & Chairs">Booking & Chairs</option>
                      <option value="Networking & Syncs">Networking & Syncs</option>
                      <option value="Parking & Access">Parking & Access</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <textarea
                    rows={3}
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="e.g. What are the quietest hours for recording podcasts in the Apex media suite?"
                    className="w-full bg-white border border-purple-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs font-medium"
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAsking(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-purple-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newQuestionText.trim()}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Question</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* QA Items List */}
            {filteredQA.length > 0 ? (
              <div className="space-y-3.5">
                {filteredQA.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 transition-all shadow-2xs space-y-3"
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200">
                            {item.category}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">• {item.timestamp}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.question}
                        </h3>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <span>Asked by <strong className="text-slate-700">{item.author}</strong> ({item.authorTitle})</span>
                        </div>
                      </div>

                      {/* Upvote Button */}
                      <button
                        onClick={() => handleUpvote(item.id)}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center min-w-[48px] shrink-0 ${
                          item.hasUpvoted
                            ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-2xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${item.hasUpvoted ? 'fill-purple-600 text-purple-600' : ''}`} />
                        <span className="mt-0.5 text-[11px]">{item.upvotes}</span>
                      </button>
                    </div>

                    {/* Answer Block if available */}
                    {item.answer ? (
                      <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-slate-600 font-bold">
                          <div className="flex items-center gap-1.5 text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{item.answer.responder}</span>
                            <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                              {item.answer.responderRole}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal">{item.answer.timestamp}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed pl-5 font-medium">
                          {item.answer.text}
                        </p>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
                        <span className="font-medium italic">Awaiting community or hub manager response...</span>
                        <button
                          onClick={() => {
                            const ans = prompt('Write an answer to this member question:');
                            if (ans) {
                              setQaList(prev => prev.map(q => q.id === item.id ? {
                                ...q,
                                answer: {
                                  text: ans,
                                  responder: 'Dr. Alex Rivera',
                                  responderRole: 'Verified Member',
                                  timestamp: 'Just now',
                                  isOfficial: false
                                }
                              } : q));
                            }
                          }}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold"
                        >
                          Answer Now
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 space-y-2">
                <HelpCircle className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-xs font-bold">No Q&As found for this filter or query.</p>
                <p className="text-[11px]">Be the first to ask a question to the hub community!</p>
              </div>
            )}

          </div>

          {/* Footer Info */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              Verified member & manager Q&A portal
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all text-xs"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
