import React, { useState, useEffect } from 'react';
import { Professional, PortfolioItem, UserQA } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Sparkles, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  CheckCircle2, 
  Building2, 
  Award, 
  ChevronRight,
  MessageSquare,
  Clock,
  UserCheck,
  HelpCircle,
  ThumbsUp,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfessionalProfileModalProps {
  professional: Professional | null;
  onClose: () => void;
  onScheduleAppointment: (prof: Professional) => void;
}

const getInitialQAsForProfessional = (prof: Professional): UserQA[] => {
  if (prof.questionsAndAnswers && prof.questionsAndAnswers.length > 0) {
    return prof.questionsAndAnswers;
  }

  return [
    {
      id: `qa-1-${prof.id}`,
      question: `What is your recommended strategy for cross-departmental alignment in ${prof.department}?`,
      askedBy: 'Marcus Vance',
      askedByTitle: 'Hub Community Manager',
      timestamp: '2 days ago',
      upvotes: 14,
      answer: {
        text: `I recommend establishing weekly 15-minute async updates and setting up shared project milestones. Focusing on high-impact KPIs makes alignment natural!`,
        timestamp: '1 day ago',
        isVerifiedAnswer: true,
      },
    },
    {
      id: `qa-2-${prof.id}`,
      question: `Are you available for 1-on-1 mentorship or quick technical consults while checked in at ${prof.checkedInSpaceName}?`,
      askedBy: 'Sophia Patel',
      askedByTitle: 'Biotech Systems Analyst',
      timestamp: 'Yesterday',
      upvotes: 9,
      answer: {
        text: `Yes! I am checked in until 5:00 PM today. Feel free to stop by Pod Row H or schedule a 15-min appointment via the profile button!`,
        timestamp: 'Yesterday',
        isVerifiedAnswer: true,
      },
    },
    {
      id: `qa-3-${prof.id}`,
      question: `Which core frameworks or architectures do you use most for ${prof.skills[0] || 'your portfolio projects'}?`,
      askedBy: 'Liam O’Connor',
      askedByTitle: 'Robotics Lead',
      timestamp: '3 days ago',
      upvotes: 19,
      answer: {
        text: `We use open-source modular components combined with distributed cloud services. Happy to discuss our architectural setup over coffee!`,
        timestamp: '2 days ago',
        isVerifiedAnswer: true,
      },
    },
  ];
};

export const ProfessionalProfileModal: React.FC<ProfessionalProfileModalProps> = ({
  professional,
  onClose,
  onScheduleAppointment,
}) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioItem | null>(null);
  const [qaList, setQaList] = useState<UserQA[]>([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);

  useEffect(() => {
    if (professional) {
      setQaList(getInitialQAsForProfessional(professional));
    }
  }, [professional?.id]);

  if (!professional) return null;

  const handleUpvoteQA = (qaId: string) => {
    setQaList((prev) =>
      prev.map((q) => {
        if (q.id === qaId) {
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

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !professional) return;

    const newQA: UserQA = {
      id: `qa-user-${Date.now()}`,
      question: newQuestionText.trim(),
      askedBy: 'Dr. Alex Rivera',
      askedByTitle: 'Enterprise Member',
      timestamp: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
    };

    setQaList([newQA, ...qaList]);
    setNewQuestionText('');
    setIsAskingQuestion(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-900"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Cover Banner */}
          <div className="relative h-48 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            
            {/* Checked In Space Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-slate-800 border border-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Currently at <strong className="text-purple-700">{professional.checkedInSpaceName}</strong></span>
            </div>
          </div>

          {/* Profile Overview Header Card */}
          <div className="px-6 sm:px-8 -mt-16 pb-6 border-b border-slate-200 relative z-10 bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              
              {/* Avatar + Basic Details */}
              <div className="flex items-end gap-4">
                <div className="relative">
                  <img
                    src={professional.avatar}
                    alt={professional.name}
                    className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white shadow-xl border-2 border-purple-300"
                  />
                  {/* Availability status ring indicator */}
                  <span 
                    className={`absolute bottom-0 right-0 p-1.5 rounded-xl text-white font-black text-[10px] ring-2 ring-white shadow-md flex items-center gap-1 ${
                      professional.availabilityStatus === 'available'
                        ? 'bg-emerald-600'
                        : 'bg-rose-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${professional.availabilityStatus === 'available' ? 'bg-emerald-300 animate-pulse' : 'bg-rose-300'}`} />
                    {professional.availabilityStatus === 'available' ? 'AVAILABLE' : 'BUSY'}
                  </span>
                </div>

                <div className="mb-1">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {professional.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                      {professional.department}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-700">
                    {professional.jobTitle}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="font-semibold text-purple-700 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {professional.company}
                    </span>
                    <span>•</span>
                    <span className="text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {professional.age} yrs ({professional.birthDateInfo})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => onScheduleAppointment(professional)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#06B6D4] hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Appointment</span>
                </button>

                <a
                  href={`mailto:${professional.contactEmail}`}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center justify-center"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Bio & Department Badge */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {/* Availability status tag */}
                <span
                  className={`px-3 py-1 text-xs font-black rounded-lg border flex items-center gap-1.5 shadow-2xs ${
                    professional.availabilityStatus === 'available'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-rose-50 text-rose-800 border-rose-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      professional.availabilityStatus === 'available'
                        ? 'bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]'
                        : 'bg-rose-500'
                    }`}
                  />
                  {professional.availabilityStatus === 'available'
                    ? '🟢 Available to Talk'
                    : '🔴 Do Not Disturb (Focus Mode)'}
                </span>

                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                  {professional.department}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  {professional.industryTag}
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                  {professional.statusBadge}
                </span>
              </div>

              {professional.availabilityNote && (
                <p className="text-xs font-medium text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 mb-2 italic flex items-center gap-1.5">
                  <span className="font-bold not-italic text-slate-700">Status note:</span> {professional.availabilityNote}
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {professional.bio}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {professional.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Body: Timeline & Portfolio Grid */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[50vh] overflow-y-auto bg-slate-50">
            
            {/* Section 1: Chronological Work Experience Timeline */}
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                Chronological Career Timeline
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {professional.timeline.map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Timeline Node Ring */}
                    <span className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-purple-600 group-hover:scale-125 transition-transform"></span>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {item.role}
                        </h4>
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {item.period}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-2">
                        <span>{item.company}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500">{item.location}</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-2">
                        {item.summary}
                      </p>

                      <ul className="space-y-1">
                        {item.highlights.map((hl, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Portfolio & Case Study Cards */}
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Featured Portfolio & Case Studies
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {professional.portfolio.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCaseStudy(item)}
                    className="group rounded-2xl bg-white border border-slate-200 hover:border-purple-300 overflow-hidden cursor-pointer transition-all duration-300 shadow-2xs"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                      
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[10px] font-bold rounded bg-white/90 text-amber-700 border border-slate-200 shadow-2xs">
                        {item.impactMetric}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600 border border-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: User Q&A & Member Interactions */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-200">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  Q&A ({qaList.length})
                </h3>

                <button
                  type="button"
                  onClick={() => setIsAskingQuestion(!isAskingQuestion)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-300 transition-all flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isAskingQuestion ? 'Cancel Question' : `Ask ${professional.name.split(' ')[0]} a Question`}</span>
                </button>
              </div>

              {/* Ask Question Form */}
              <AnimatePresence>
                {isAskingQuestion && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handlePostQuestion}
                    className="mb-4 p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-3"
                  >
                    <label className="text-xs font-bold text-purple-900 block">
                      Ask {professional.name} a public question:
                    </label>
                    <textarea
                      rows={3}
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder={`e.g. Hi ${professional.name.split(' ')[0]}, what tools or best practices do you recommend for ${professional.department}?`}
                      className="w-full bg-white border border-purple-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs font-medium"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAskingQuestion(false)}
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
                        <span>Submit Question</span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Q&A Items Cards */}
              <div className="space-y-3">
                {qaList.map((qa) => (
                  <div
                    key={qa.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 transition-all shadow-2xs space-y-3"
                  >
                    {/* Question Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                          <span className="font-bold text-slate-800">{qa.askedBy}</span>
                          {qa.askedByTitle && <span className="text-slate-400">({qa.askedByTitle})</span>}
                          <span>• {qa.timestamp}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {qa.question}
                        </h4>
                      </div>

                      {/* Upvote */}
                      <button
                        type="button"
                        onClick={() => handleUpvoteQA(qa.id)}
                        className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                          qa.hasUpvoted
                            ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-2xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${qa.hasUpvoted ? 'fill-purple-600 text-purple-600' : ''}`} />
                        <span>{qa.upvotes}</span>
                      </button>
                    </div>

                    {/* Answer Block */}
                    {qa.answer ? (
                      <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200/80 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-purple-900 font-bold">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Answer from {professional.name}</span>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-300">
                              Verified Answer
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal">{qa.answer.timestamp}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium pl-5 pt-1">
                          {qa.answer.text}
                        </p>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
                        <span className="font-medium italic">Awaiting {professional.name}'s answer...</span>
                        <button
                          type="button"
                          onClick={() => {
                            const ans = prompt(`Write an answer on behalf of ${professional.name}:`);
                            if (ans) {
                              setQaList((prev) =>
                                prev.map((q) =>
                                  q.id === qa.id
                                    ? {
                                        ...q,
                                        answer: {
                                          text: ans,
                                          timestamp: 'Just now',
                                          isVerifiedAnswer: true,
                                        },
                                      }
                                    : q
                                )
                              );
                            }
                          }}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold"
                        >
                          Answer Question
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Cross-Department Match ID: #{professional.id}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Close Profile
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
